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


	function tabela_tv(){

		var tabela = $(".table-single-component").find(".table.table-bordered.display-desktop");

		if(tabela.length > 0){
		
			var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'EscaleSEOCLAROTV';
			var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

			var cep = sessionStorage.getItem('cliente_cep');
			var numero = sessionStorage.getItem('cliente_numero');

			var link_slug = "";


			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);
			var tvs = data_parsed.produtos.tv;

			var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&origem=claro&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero;
			

			var thead = tabela.find("thead");
			var theadTr = thead.find("tr");
			var theadTrThTitulo = theadTr.find("th").first().text();


			var tbody = tabela.find("tbody");
			var tbodyTr = tbody.find("tr");
			var tbodyTd = tbodyTr.find("td").remove();
			tbodyTr[2].remove();
			tbodyTr[3].remove();




			var thead_tr = '<tr><th scope="col">'+theadTrThTitulo+'</th>';
			
			var tbody_td_0 = '';
			var tbody_td_1 = '';
			var tbody_td_2 = '';
			var tbody_td_3 = '';


			for (var i = 0; i < tvs.length; i++) {

				thead_tr += '<th scope="col">'+tvs[i].nome+'</th>';


				tbody_td_0 += '<td><span class="text-default">+ de '+tvs[i].qtd_canais+' canais</span></td> ';

				tbody_td_1 += '<td><span class="image-desk"><div class="image-desk-flex">';
				for (var d = 0; d < tvs[i].canais_principais.length; d++) {
					tbody_td_1 += '<img style="width: 50px; margin: 2px 5px;" class="lazy" src="'+tvs[i].canais_principais[d]+'" />';
				}
				tbody_td_1 += '</div></span></td>';

				tbody_td_2 += '<td><span class="text-default">R$ '+virgula_precos(tvs[i].preco_por)[0]+','+virgula_precos(tvs[i].preco_por)[1]+'</span></td>';
				
				// tbody_td_3 += '<td><div class="text-default combo-disclaimer">No combo por</div><div class="price">'+virgula_precos(tvs[i].preco_combo)[0]+','+virgula_precos(tvs[i].preco_combo)[1]+'</div><a href="'+link+'&tvId='+tvs[i].id+'" target="" class="btn small"> Solicitar agora</a><br><div class="link promo"><a href="https://netcombomulti.net/net-tv/'+link_slug+'">Ver detalhes e promoções</a></div></td>';
				tbody_td_3 += '<td><div class="text-default combo-disclaimer">No combo por</div><div class="price">'+virgula_precos(tvs[i].preco_combo)[0]+','+virgula_precos(tvs[i].preco_combo)[1]+'</div><a href="'+link+'&tvId='+tvs[i].id+'" target="" class="btn small"> Solicitar agora</a></div></td>';
			}


			thead.empty();
			thead.append(thead_tr);

			// tbody.append(tbody_tr);
			tbodyTr.eq( 0 ).append(tbody_td_0);
			tbodyTr.eq( 1 ).append(tbody_td_1);
			tbodyTr.eq( 4 ).append(tbody_td_2);
			tbodyTr.eq( 5 ).append(tbody_td_3);
		}
	}


	function tabela_internet(){

		var tabela = $(".table-single-internet-component").find(".table.table-bordered.display-desktop");

		if(tabela.length > 0){
		
			var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'EscaleSEOCLAROTV';
			var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

			var cep = sessionStorage.getItem('cliente_cep');
			var numero = sessionStorage.getItem('cliente_numero');

			var link_slug = "";


			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);
			var internets = data_parsed.produtos.internet;

			var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&origem=claro&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero;
			

			var thead = tabela.find("thead");
			var theadTr = thead.find("tr");
			var theadTrThTitulo = theadTr.find("th").first().text();


			var tbody = tabela.find("tbody");
			var tbodyTr = tbody.find("tr");
			var tbodyTd = tbodyTr.find("td").remove();




			var thead_tr = '<tr><th scope="col">'+theadTrThTitulo+'</th>';
			
			var tbody_td_0 = '';
			var tbody_td_1 = '';
			var tbody_td_2 = '';
			var tbody_td_3 = '';
			var tbody_td_4 = '';


			for (var i = 0; i < internets.length; i++) {

				thead_tr += '<th scope="col">'+internets[i].nome+'</th>';


				tbody_td_0 += '<td><span class="text-default">'+internets[i].velocidade_download+'</span></td> ';
				tbody_td_1 += '<td><span class="text-default">'+internets[i].velocidade_upload+'</span></td> ';
				tbody_td_2 += '<td><span class="text-default">'+internets[i].tem_wifi+'</span></td> ';
				tbody_td_3 += '<td><span class="text-default">R$ '+virgula_precos(internets[i].preco_por)[0]+','+virgula_precos(internets[i].preco_por)[1]+'</span></td>';
				
				tbody_td_4 += '<td><div class="text-default combo-disclaimer">No combo por</div><div class="price">'+virgula_precos(internets[i].preco_combo)[0]+','+virgula_precos(internets[i].preco_combo)[1]+'</div><a href="'+link+'&internetId='+internets[i].id+'" target="" class="btn small"> Solicitar agora</a></div></td>';
			}


			thead.empty();
			thead.append(thead_tr);

			// tbody.append(tbody_tr);
			tbodyTr.eq( 0 ).append(tbody_td_0);
			tbodyTr.eq( 1 ).append(tbody_td_1);
			tbodyTr.eq( 2 ).append(tbody_td_2);
			tbodyTr.eq( 3 ).append(tbody_td_3);
			tbodyTr.eq( 4 ).append(tbody_td_4);
		}
	}


	function tabela_combos_tv_internet(){

		var table_multi = $(".table_multi");

		if(table_multi.length > 0){

			var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'EscaleSEOCLAROTV';
			var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

			var cep = sessionStorage.getItem('cliente_cep');
			var numero = sessionStorage.getItem('cliente_numero');


			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);
			var tvs = data_parsed.produtos.tv;
			

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

	        	tabela_tv();
	        	tabela_internet();
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
		tabela_tv();
		tabela_internet();
		tabela_combos_tv_internet();
	}

});