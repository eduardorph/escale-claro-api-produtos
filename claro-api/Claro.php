<?php
add_action('wp_ajax_escale_claro_api', 'escale_claro_api');
add_action('wp_ajax_nopriv_escale_claro_api', 'escale_claro_api');
function escale_claro_api(){

	$zipCode = isset($_POST['cep']) ? $_POST['cep'] : false;
	$number = isset($_POST['numero']) ? $_POST['numero'] : false;
	$company = isset($_POST['company']) ? $_POST['company'] : "net";
	$offshoot = isset($_POST['offshoot']) ? $_POST['offshoot'] : "residencial";

	if ( empty($zipCode) ) {
		echo "CEP Necessário";
		die();
	}

	if ( empty($number) ) {
		echo "Número Necessário";	
		die();
	}


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

	// echo $url."?".http_build_query( $params );

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


	// foreach ($tvs as $tv) {
	// 	if ($tv["exibir"] == 1 || $tv["exibir"] == true) {
	// 		$novo_json["produtos"]["tv"][$tv["ordem"]] = $tv;
	// 	}
	// }


	// foreach ($internets as $internet) {
	// 	if ($internet["exibir"] == 1 || $internet["exibir"] == true) {
	// 		$novo_json["produtos"]["internet"][$internet["ordem"]] = $internet;
	// 	}
	// }


	// foreach ($fones as $fone) {
	// 	if ($fone["exibir"] == 1 || $fone["exibir"] == true) {
	// 		$novo_json["produtos"]["fone"][$fone["ordem"]] = $fone;
	// 	}
	// }


	foreach ($celulares as $celular) {
		if ($celular["exibir"] == 1 || $celular["exibir"] == true) {

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