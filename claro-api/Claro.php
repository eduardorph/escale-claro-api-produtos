<?php
add_action('wp_ajax_escale_claro_api', 'escale_claro_api');
add_action('wp_ajax_nopriv_escale_claro_api', 'escale_claro_api');

function escale_claro_api(){

	$zipCode = isset($_POST['cep']) ? $_POST['cep'] : "04565-905";
	$number = isset($_POST['numero']) ? $_POST['numero'] : 1;
	$company = isset($_POST['company']) ? $_POST['company'] : "net";
	$offshoot = isset($_POST['offshoot']) ? $_POST['offshoot'] : "residencial";


	$curl = new Curl;

	$headers = array(
		'Content-Type: application/json'
	);


	$url = "https://api.amxrest.net/v2/parse";

	$params = array(
		'zipCode' => preg_replace('/\D/', '', $zipCode),
		'number' => $number,
		'company' => $company,
		'offshoot' => $offshoot,
		'channel' => "desktop"
	);


	$resposta = $curl->httpGet($url."?".http_build_query( $params ), $headers);

	$json = json_decode($resposta, true);

	$cidade = $json["city"];
	$uf = $json["uf"];
	$produtos = $json["produtos"];

	$novo_json = array();

	$produtos_array = array();

	$tvs = $produtos["tv"];
	$internets = $produtos["internet"];
	$fones = $produtos["fone"];
	$celulares = $produtos["celular"];


	$ofertas = $json["ofertas"];
	$selecoes = $json["selecoes"];
	$canais = $json["canais"];


	$array_internet_combos = array(
		"35 MEGA",
		"120 MEGA",
		"240 MEGA",
	);


	// TVS
	foreach ($tvs as $tv) {
		if ($tv["exibir"] == 1 || $tv["exibir"] == true) {

			$tv["preco_por"] = $tv["preco"];
			$tv["preco_de"] = $tv["preco"];
			$tv["preco_combo"] = 0;

			if( isset($tv["ofertaId"]) ){
				$tv["preco_por"] = $ofertas[$tv["ofertaId"]]["pfdd"]["periodo"][0]["preco"];
			}

			$tv["qtd_canais"] = count($tv["canaisIds"]);

			$tv["canais_principais"] = array();

			for ($i=0; $i < count($tv["canaisPrincipaisIds"]); $i++) { 
				$tv["canais_principais"][] = $canais["lista"][$tv["canaisPrincipaisIds"][$i]]["imagem"];
			}

			$busca_no_array_tv = busca_no_array($selecoes, $tv["id"].'_');

			if( count($busca_no_array_tv) > 0 ){
				$tv["preco_combo"] = array_values($busca_no_array_tv)[0]["tv"]["preco"];
			}

			unset($tv["canaisPrincipaisIds"]);
			unset($tv["canaisIds"]);
			unset($tv["preco"]);
			unset($tv["precoDe"]);

			$novo_json["produtos"]["tv"][$tv["ordem"]] = $tv;
		}
	}

	ksort($novo_json["produtos"]["tv"]);

	foreach ($novo_json["produtos"]["tv"] as $tvs){
		$produtos_array["produtos"]["tv"][] = $tvs;
	}



	// INTERNETES
	foreach ($internets as $internet) {
		if ( ($internet["exibir"] == 1 || $internet["exibir"] == true) && substr(trim(strtolower($internet["nome"])), -4) == "mega") {

			$internet["preco_por"] = $internet["preco"];
			$internet["preco_de"] = $internet["preco"];
			$internet["preco_combo"] = 0;
			$tv["tem_wifi"] = "Não";

			if( isset($internet["ofertaId"]) ){
				$internet["preco_por"] = $ofertas[$internet["ofertaId"]]["pfdd"]["periodo"][0]["preco"];
			}


			if (isset($internet["recursosIds"])) {
				for ($i=0; $i < count($internet["recursosIds"]); $i++) {
					if ($internet["recursosIds"][$i] == 90 || $internet["recursosIds"][$i] == 513) {
						$internet["tem_wifi"] = "Sim";
					}
				}
			}

			$internet["velocidade_download"] = isset($internet["recursos_descritivos"][17]) ? $internet["recursos_descritivos"][17] : "---";

			$internet["velocidade_upload"] = isset($internet["recursos_descritivos"][18]) ? $internet["recursos_descritivos"][18] : "---";


			$busca_no_array_internet = busca_no_array($selecoes, '_'.$internet["id"].'_');

			if( count($busca_no_array_internet) > 0 ){
				$internet["preco_combo"] = array_values($busca_no_array_internet)[0]["internet"]["preco"];
			}

			unset($internet["preco"]);
			unset($internet["precoDe"]);

			$novo_json["produtos"]["internet"][preg_replace('/\D/', '', $internet["nome"])] = $internet;
		}
	}


	ksort($novo_json["produtos"]["internet"]);

	foreach ($novo_json["produtos"]["internet"] as $internets){
		$produtos_array["produtos"]["internet"][] = $internets;
	}


	// COMBOS TV
	foreach ($produtos_array["produtos"]["tv"] as $key => $tv) {
		$tvid = $tv["id"];

		$c = 0;


		foreach ($produtos_array["produtos"]["internet"] as $internet) {

			if (in_array(strtoupper($internet["nome"]), $array_internet_combos)) {

				$internetid = $internet["id"];

				$id_selecao = $tvid."_".$internetid."_0";

				$busca_no_array = busca_no_array($selecoes, $id_selecao);

				if( count($busca_no_array) > 0 ){
					$preco_tv = isset($selecoes[$id_selecao]["tv"]["ofertaId"]) ? $ofertas[$selecoes[$id_selecao]["tv"]["ofertaId"]]["pfdd"]["periodo"][0]["preco"] : $selecoes[$id_selecao]["tv"]["preco"];
					$preco_internet = isset($selecoes[$id_selecao]["internet"]["ofertaId"]) ? $ofertas[$selecoes[$id_selecao]["internet"]["ofertaId"]]["pfdd"]["periodo"][0]["preco"] : $selecoes[$id_selecao]["internet"]["preco"];

					$produtos_array["produtos"]["tv"][$key]["combo"][$c]["internetId"] = $internetid;
					$produtos_array["produtos"]["tv"][$key]["combo"][$c]["internet_nome"] = $internet["nome"];
					$produtos_array["produtos"]["tv"][$key]["combo"][$c]["tv_nome"] = $tv["nome"];
					$produtos_array["produtos"]["tv"][$key]["combo"][$c]["tvId"] = $tvid;
					$produtos_array["produtos"]["tv"][$key]["combo"][$c]["valor"] = $preco_tv + $preco_internet;

					$c++;
				}
				
			}
		}
	}




	// TELEFONES
	foreach ($fones as $fone) {
		if ($fone["exibir"] == 1 || $fone["exibir"] == true) {

			$fone["preco_oferta"] = $fone["preco"];

			if( isset($fone["ofertaId"]) ){
				$fone["preco_oferta"] = $ofertas[$fone["ofertaId"]]["pfdd"]["periodo"][0]["preco"];
			}

			$novo_json["produtos"]["fone"][$fone["ordem"]] = $fone;
		}
	}

	ksort($novo_json["produtos"]["fone"]);

	foreach ($novo_json["produtos"]["fone"] as $fones){
		$produtos_array["produtos"]["fone"][] = $fones;
	}


	// CELULARES {PÓS | CONTROLE}
	foreach ($celulares as $celular) {
		if ($celular["exibir"] == 1 || $celular["exibir"] == true) {

			$celular["preco_oferta"] = $celular["preco"];

			if( isset($celular["ofertaId"]) ){
				$celular["preco_oferta"] = $ofertas[$celular["ofertaId"]]["pfdd"]["periodo"][0]["preco"];
			}

			if (strpos($celular["nome"], 'Controle') !== false) {
			    $novo_json["produtos"]["celular"]["controles"][$celular["ordem"]] = $celular;
			}else{
				$novo_json["produtos"]["celular"]["celulares"][$celular["ordem"]] = $celular;
			}
		}
	}

	ksort($novo_json["produtos"]["celular"]["controles"]);

	foreach ($novo_json["produtos"]["celular"]["controles"] as $controles){
		$produtos_array["produtos"]["celular"]["controles"][] = $controles;
	}

	ksort($novo_json["produtos"]["celular"]["celulares"]);

	foreach ($novo_json["produtos"]["celular"]["celulares"] as $celulares){
		$produtos_array["produtos"]["celular"]["celulares"][] = $celulares;
	}



	echo json_encode($produtos_array);

	die();
}


function busca_no_array($array, $id_produto){
	$filtered = array();

	foreach($array as $key => $val) {
	    if(false !== strpos($key, $id_produto)) {
	        $filtered[$key] = $val;
	        break;
	    }
	}

	return $filtered;
}