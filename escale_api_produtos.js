jQuery(function($) {

	console.log("v3");

	//FUNÇÃO PARA PEGAR PARAMETROS NA URL
	function _GETURL(variavel)
	{
		var url   = window.location.search.replace("?", "");
		var itens = url.split("&");
		for(n in itens)
		{
			if( itens[n].match(variavel) )
			{
				return decodeURIComponent(itens[n].replace(variavel+"=", ""));
			}
		}
		return null;
	}

	function virgula_precos(preco){
		var preco1 = preco.toString().slice(0, -2);
		var preco2 = preco.toString().slice(-2);

		return [preco1, preco2];
	}


	function tabela_combos_tv_internet(){
		var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'Oferta_combomulti_escale';
		var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

		var cep = sessionStorage.getItem('cliente_cep');
		var numero = sessionStorage.getItem('cliente_numero');


		var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
		var data_parsed = JSON.parse(escale_valores_api_produtos);
		var tvs = data_parsed.produtos.tv;
		

		var table_multi = $(".table_multi");

		var table_multi_side = table_multi.find('.table_multi_side');
		const table_multi_title = table_multi_side.find(".table_multi_title");

		var table_multi_prices_wrapper = table_multi.find('.table_multi_prices').find('.table_multi_prices_wrapper');
		const table_multi_titles = table_multi_prices_wrapper.find(".table_multi_titles");
		const table_multi_pricing = table_multi_prices_wrapper.find(".table_multi_pricing").first();


		var tv_coluna = '';
		var internet_titles = '';
		var table_multi_pricing_vals = '';


		var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&origem=claro&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero;

		for (var i = 0; i < tvs.length; i++) {

			tv_coluna += '<div class="table_multi_content_plan"><div class="table_multi_content_title" data-table-plan'+i+'="<b>'+tvs[i].nome+'</b> + de '+tvs[i].qtd_canais+' canais"><span class="table_multi_item_value" data-table-item-value=""><b>'+tvs[i].nome+'</b> + de '+tvs[i].qtd_canais+' canais</span></div></div>';


			table_multi_pricing_vals += '<div class="table_multi_pricing">';

			for (var d = 0; d < tvs[i].combo.length; d++) {

				if(i == 0){
					internet_titles += '<div class="table_multi_title_item" data-table-plan0="Com <b>'+tvs[i].combo[d].internet_nome+'</b>"><span class="table_multi_item_value" data-table-item-value="">Com <b>'+tvs[i].combo[d].internet_nome+'</b></span></div>';
				}

				table_multi_pricing_vals += '<a href="'+link+'&tvId='+tvs[i].combo[d].tvId+'&internetId='+tvs[i].combo[d].internetId+'" class="table_multi_content"><div class="table_multi_content_pricing" data-table-plan0="<b>R$'+virgula_precos(tvs[i].combo[d].valor)[0]+','+virgula_precos(tvs[i].combo[d].valor)[1]+'</b>"><span class="table_multi_item_value" data-table-item-value=""><b>R$'+virgula_precos(tvs[i].combo[d].valor)[0]+','+virgula_precos(tvs[i].combo[d].valor)[1]+'</b></span></div></a>';
			}

			table_multi_pricing_vals += '</div>';
		}

		table_multi_side.empty();
		table_multi_side.append(table_multi_title);
		table_multi_side.append(tv_coluna); // APPEND ATRAVÉS DO ARRAY


		table_multi_prices_wrapper.empty();
		table_multi_titles.empty();

		table_multi_prices_wrapper.append(table_multi_titles);
		table_multi_titles.append(internet_titles);
		table_multi_prices_wrapper.append(table_multi_pricing_vals);
	}


	function get_api(cep, numero){
		$.ajax({
	        url: ajax_object.ajax_url,
	        type:"POST",
	        dataType:'text',
	        data: {
	         	action:'escale_claro_api',
	         	cep:cep,
	         	numero:numero
	    	},
	    	beforeSend: function() {
		    },
	    	success: function(response){
	        	sessionStorage.removeItem('escale_valores_api_produtos');
	        	sessionStorage.setItem('escale_valores_api_produtos', response);
	        	sessionStorage.removeItem('cliente_cep');
	        	sessionStorage.setItem('cliente_cep', cep);
	        	sessionStorage.removeItem('cliente_numero');
	        	sessionStorage.setItem('cliente_numero', numero);

	        	tabela_combos_tv_internet();
	     	}, 
	     	error: function(data){
	        	console.log(data);
	     	},
	     	complete: function(){
	     	}
	    });
		return false;
	}




	if(sessionStorage.getItem('escale_valores_api_produtos') == null){
		console.log("A");
		get_api(20950091, 859);
	}else{
		console.log("B");
		tabela_combos_tv_internet();
	}

});