jQuery(function($) {

	var $ = jQuery;

	console.log("v12");

	// Adiciona uma classe extra no form do CEP
	jQuery(".CheckAvailability-form").addClass('form_cep_api').removeAttr('data-check-availability-form');


	function link_ecommerce(){
		var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'EscaleSEOCLAROTV';
		var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

		var cep = sessionStorage.getItem('cliente_cep');
		var numero = sessionStorage.getItem('cliente_numero');

		var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&origem=claro&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero;

		return link;
	}

	//FUNÇÃO PARA PEGAR PARAMETROS NA URL
	function _GETURL(variavel){
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

	function pega_valores_selecao(tel_div, internet_div, tv_div, cel_div){

		var novo_botao = jQuery("#novo_botao_comprar");
		var url_params = '';

		var tel_combo_div = tel_div.find("[data-type='combo']");
		var internet_combo_div = internet_div.find("[data-type='combo']");
		var tv_combo_div = tv_div.find("[data-type='combo']");
		var cel_combo_div = cel_div.find("[data-type='combo']");

		var telefone = jQuery("#simulator_data_telefone").text();
		var internet = jQuery("#simulator_data_internet").text();
		var tv = jQuery("#simulator_data_tv").text();
		var celular = jQuery("#simulator_data_celular").text();
		var soma_produtos_wrap = jQuery("#soma_produtos_wrap").text();

		var text_total_nocombo = jQuery("#text-total-nocombo");
		var text_total_combo = jQuery("#text-total-combo");

		console.log("telefone: "+telefone);
		console.log("internet: "+internet);
		console.log("tv: "+tv);
		console.log("celular: "+celular);


		if (parseInt(telefone) > 0) {
			url_params += '&foneId='+telefone;
		}

		if (parseInt(internet) > 0) {
			url_params += '&internetId='+internet;
		}

		if (parseInt(tv) > 0) {
			url_params += '&tvId='+tv;
		}

		if (parseInt(celular) > 0) {
			url_params += '&celularId='+celular;
		}



		if(parseInt(soma_produtos_wrap) > 2){
			

			telid = parseInt(telefone) !== 0 ? telefone : '0';
			intid = parseInt(internet) !== 0 ? internet+'_' : '0_';
			tvid = parseInt(tv) !== 0 ? tv+'_' : '0_';
			celid = parseInt(celular) !== 0 ? '_'+celular : '';

			var combo = tvid+intid+telid+celid;

			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			var resultado = data_parsed.selecoes[combo];

			console.log(combo);

			// 167_228_143_2261
			// 167_228_143_1921

			var tel_preco = "000";
			var net_preco = "000";
			var tv_preco = "000";
			var cel_preco = "000";

			if(resultado.foneId > 0){
				var tel_preco = resultado.fone.hasOwnProperty('ofertaId') ? data_parsed.ofertas[resultado.fone.ofertaId].pfdd.periodo[0].preco : resultado.fone.preco;
			}

			if(resultado.internetId > 0){
				var net_preco = resultado.internet.hasOwnProperty('ofertaId') ? data_parsed.ofertas[resultado.internet.ofertaId].pfdd.periodo[0].preco : resultado.internet.preco;
				
			}

			if(resultado.tvId > 0){
				var tv_preco = resultado.tv.hasOwnProperty('ofertaId') ? data_parsed.ofertas[resultado.tv.ofertaId].pfdd.periodo[0].preco : resultado.tv.preco;
				
			}

			if(resultado.celularId > 0){
				var cel_preco = resultado.celular.hasOwnProperty('ofertaId') ? data_parsed.ofertas[resultado.celular.ofertaId].pfdd.periodo[0].preco : resultado.celular.preco;
				
			}

			tel_combo_div.find("p").remove();
			tel_combo_div.find("div.price").remove();
			tel_combo_div.append('<div class="price"><span class="label"><b>NO COMBO</b></span><div class="value">R$<span class="tens">'+virgula_precos(tel_preco)[0]+'</span><span class="cents">,'+virgula_precos(tel_preco)[1]+'</span><small class="period">/mês*</small></div></div>');

			internet_combo_div.find("p").remove();
			internet_combo_div.find("div.price").remove();
			internet_combo_div.append('<div class="price"><span class="label"><b>NO COMBO</b></span><div class="value">R$<span class="tens">'+virgula_precos(net_preco)[0]+'</span><span class="cents">,'+virgula_precos(net_preco)[1]+'</span><small class="period">/mês*</small></div></div>');

			tv_combo_div.find("p").remove();
			tv_combo_div.find("div.price").remove();
			tv_combo_div.append('<div class="price"><span class="label"><b>NO COMBO</b></span><div class="value">R$<span class="tens">'+virgula_precos(tv_preco)[0]+'</span><span class="cents">,'+virgula_precos(tv_preco)[1]+'</span><small class="period">/mês*</small></div></div>');

			if(cel_preco != "000"){
				cel_combo_div.find("p").remove();
				cel_combo_div.find("div.price").remove();
				cel_combo_div.append('<div class="price"><span class="label"><b>NO COMBO</b></span><div class="value">R$<span class="tens">'+virgula_precos(cel_preco)[0]+'</span><span class="cents">,'+virgula_precos(cel_preco)[1]+'</span><small class="period">/mês*</small></div></div>');
			}else{
				cel_combo_div.empty();
				cel_combo_div.append('<p>Esta combinação ainda não formou um combo.</p>');
			}

			text_total_nocombo.addClass('hidden');
			text_total_combo.removeClass('hidden');
		}else{
			console.log('falso');
			tel_combo_div.empty();
			tel_combo_div.append('<p>Esta combinação ainda não formou um combo.</p>');

			internet_combo_div.empty();
			internet_combo_div.append('<p>Esta combinação ainda não formou um combo.</p>');

			tv_combo_div.empty();
			tv_combo_div.append('<p>Esta combinação ainda não formou um combo.</p>');

			cel_combo_div.empty();
			cel_combo_div.append('<p>Esta combinação ainda não formou um combo.</p>');

			text_total_nocombo.removeClass('hidden');
			text_total_combo.addClass('hidden');

			// p: Esta combinação ainda não formou um combo.
		}

		var nova_soma = parseInt(soma_produtos_wrap) + parseInt(jQuery("#simulator_data_celular").attr('data-controle'));

		novo_botao.attr('href', novo_botao.attr('data-base-link')+url_params);

		console.log('teste url');
		console.log(url_params);

		if (nova_soma > 0) {
			novo_botao.removeAttr('disabled');
			novo_botao.removeClass('disabled');
		}else{
			novo_botao.attr('disabled', true);
			novo_botao.addClass('disabled');
		}



		var tel_individual = tel_div.find(".individual").find('span.price').find('span').attr("data-preco-individual");
		var net_individual = internet_div.find(".individual").find('span.price').find('span').attr("data-preco-individual");
		var tv_individual = tv_div.find(".individual").find('span.price').find('span').attr("data-preco-individual");
		var cel_individual = cel_div.find(".individual").find('span.price').find('span').attr("data-preco-individual");

		var total_individual = parseInt(tel_individual) + parseInt(net_individual) + parseInt(tv_individual) + parseInt(cel_individual);

		jQuery("#individual-total").text("R$ "+virgula_precos(total_individual)[0]+','+virgula_precos(total_individual)[1]);

		var total_do_combo = parseInt(tel_preco) + parseInt(net_preco) + parseInt(tv_preco) + parseInt(cel_preco);

		text_total_combo.find("#combo-total").text("R$ "+virgula_precos(total_do_combo)[0]+','+virgula_precos(total_do_combo)[1]);
	}


	function tabela_tv(link){

		var tabela = $(".table-single-component").find(".table.table-bordered.display-desktop");
		var tabela_mobile = $(".table-single-component").find("div.display-mobile").find('.wrapper');
		// var tabela_mobile = jQuery(".table-single-component").find("div.display-mobile").find('.wrapper');


		if(tabela.length > 0){

			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			if( data_parsed.produtos.hasOwnProperty('tv_tabela') ){

				var tvs = data_parsed.produtos.tv_tabela;
			

				var link_slug = "";


				/* MOBILE */

				var tabTvLinks = tabela_mobile.find(".tabTvLinks");
				var tabTvLinks_itens = tabTvLinks.children('li');
				var tabs_tv = tabela_mobile.find('.tabs-tv');
				var content_tvs = tabs_tv.find(".content");

				/* FIM MOBILE */
							

				var thead = tabela.find("thead");
				var theadTr = thead.find("tr");
				var theadTrThTitulo = theadTr.find("th").first().text();


				var tbody = tabela.find("tbody");
				var tbodyTr = tbody.find("tr");
				var tbodyTd = tbodyTr.find("td").remove();




				var thead_tr = '<tr><th scope="col">'+theadTrThTitulo+'</th>';
				
				var tbody_td_0 = '';
				var tbody_td_1 = '';
				var tbody_td_canais_hd = '';
				var tbody_td_ondemand = '';
				var tbody_td_2 = '';
				var tbody_td_3 = '';


				var mobile_item = '';
				var mobile_channels = '';


				if(tabTvLinks.children('li').length > tvs.length){
					var total_tvs = tabTvLinks.children('li').length - tvs.length;

					for (var i = 1; i <= total_tvs; i++) {
						tabTvLinks_itens.last().remove();
						content_tvs.last().remove();
					}

				}

				for (var i = 0; i < tvs.length; i++) {

					thead_tr += '<th scope="col">'+tvs[i].nome+'</th>';


					tbody_td_0 += '<td><span class="text-default">+ de '+tvs[i].qtd_canais+' canais</span></td> ';

					tbody_td_1 += '<td><span class="image-desk"><div class="image-desk-flex">';
					for (var d = 0; d < tvs[i].canais_principais.length; d++) {
						tbody_td_1 += '<img style="width: 50px; margin: 2px 5px;" class="lazy" src="'+tvs[i].canais_principais[d]+'" />';
					}
					tbody_td_1 += '</div></span></td>';


					tbody_td_canais_hd += '<td><span class="text-default">Com '+parseInt(tvs[i].qtd_canais_hd)+' canais HD</span></td>';


					tbody_td_ondemand += '<td><span class="text-default">'+tvs[i].ondemand+'</span></td>';
					

					tbody_td_2 += '<td><span class="text-default">R$ '+virgula_precos(tvs[i].preco_por)[0]+','+virgula_precos(tvs[i].preco_por)[1]+'</span></td>';
					
					tbody_td_3 += '<td><div class="text-default combo-disclaimer">No combo por</div><div class="price">'+virgula_precos(tvs[i].preco_combo)[0]+','+virgula_precos(tvs[i].preco_combo)[1]+'</div><a href="'+link+'&tvId='+tvs[i].id+'" target="" class="btn small"> Solicitar agora</a></div></td>';



					/* mobile */
						if(tabTvLinks_itens.length -1 >= i){
							tabTvLinks_itens.eq( i ).text(tvs[i].nome);
						}else{
							mobile_item += '<li class="item">'+tvs[i].nome+'</li>';
						}


						if(content_tvs.length -1 >= i){
							// content_tvs.eq(i).css('background', 'red');

							content_tvs.eq(i).find("ul.products").empty().append('<li class="product text-default">Mais de '+tvs[i].qtd_canais+' canais</li> <li class="product text-default">NOW Online e TV</li>');

							mobile_channels += '<div class="image-desk-flex">';
							for (var d = 0; d < tvs[i].canais_principais.length; d++) {
								mobile_channels += '<img style="width: 50px; margin: 2px 5px;" class="lazy" src="'+tvs[i].canais_principais[d]+'" />';
							}
							mobile_channels += '</div>';
							content_tvs.eq(i).find(".popular-channels .channel-image").empty().append(mobile_channels);

							content_tvs.eq(i).find(".block-price .item.individual").find("span.text-default").html('R$ '+virgula_precos(tvs[i].preco_por)[0]+','+virgula_precos(tvs[i].preco_por)[1]+' por mês')
							content_tvs.eq(i).find(".block-price .item.pack").find("div").last().html('R$ '+virgula_precos(tvs[i].preco_combo)[0]+','+virgula_precos(tvs[i].preco_combo)[1]+' por mês')

							content_tvs.eq(i).find(".subscribe .item.button-block").find("a").attr('href', link+'&tvId='+tvs[i].id);

							content_tvs.eq(i).find(".subscribe .item.link.small").empty();

						}
					/* fim mobile */
				}


				thead.empty();
				thead.append(thead_tr);

				// tbody.append(tbody_tr);
				tbodyTr.eq( 0 ).append(tbody_td_0);
				tbodyTr.eq( 1 ).append(tbody_td_1);
				tbodyTr.eq( 2 ).append(tbody_td_canais_hd);
				tbodyTr.eq( 3 ).append(tbody_td_ondemand);
				tbodyTr.eq( 4 ).append(tbody_td_2);
				tbodyTr.eq( 5 ).append(tbody_td_3);


				tabTvLinks.append(mobile_item);	
			}
		}
	}


	function tabela_internet(link){

		var tabela = $(".table-single-internet-component").find(".table.table-bordered.display-desktop");
		var tabela_mobile = $(".table-single-internet-component").find("div.display-mobile").find('.wrapper');

		if(tabela.length > 0){

			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			if( data_parsed.produtos.hasOwnProperty('internet_tabela') ){
		
				var link_slug = "";

				var internets = data_parsed.produtos.internet_tabela;



				/* MOBILE */

				var tabLinks = tabela_mobile.find(".tabLinks");
				var tabLinks_itens = tabLinks.children('li');
				var tabs_tv = tabela_mobile.find('.tabs.inline');
				var content_internets = tabs_tv.find(".content");

				/* FIM MOBILE */
				

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


				var mobile_item = '';


				if(tabLinks.children('li').length > internets.length){
					var total_internets = tabLinks.children('li').length - internets.length;

					for (var i = 1; i <= total_internets; i++) {
						tabLinks_itens.last().remove();
						content_internets.last().remove();
					}
				}


				for (var i = 0; i < internets.length; i++) {

					thead_tr += '<th scope="col">'+internets[i].nome+'</th>';


					tbody_td_0 += '<td><span class="text-default">'+internets[i].velocidade_download+'</span></td> ';
					tbody_td_1 += '<td><span class="text-default">'+internets[i].velocidade_upload+'</span></td> ';
					tbody_td_2 += '<td><span class="text-default">'+internets[i].tem_wifi+'</span></td> ';
					tbody_td_3 += '<td><span class="text-default">R$ '+virgula_precos(internets[i].preco_por)[0]+','+virgula_precos(internets[i].preco_por)[1]+'</span></td>';
					
					tbody_td_4 += '<td><div class="text-default combo-disclaimer">No combo por</div><div class="price">'+virgula_precos(internets[i].preco_combo)[0]+','+virgula_precos(internets[i].preco_combo)[1]+'</div><a href="'+link+'&internetId='+internets[i].id+'" target="" class="btn small"> Solicitar agora</a></div></td>';


					/* mobile */
						if(tabLinks_itens.length -1 >= i){
							tabLinks_itens.eq( i ).text(internets[i].nome);
						}else{
							mobile_item += '<li class="item">'+internets[i].nome+'</li>';
						}


						if(content_internets.length -1 >= i){
							content_internets.eq(i).find("ul.products").empty().append('<li class="product text-default">'+internets[i].velocidade_download+' de download</li> <li class="product text-default">'+internets[i].velocidade_upload+' de upload</li> <li class="product text-default">Wi-fi: '+internets[i].tem_wifi+'</li>');

							content_internets.eq(i).find(".block-price .item.individual").find("div").last().html('R$ '+virgula_precos(internets[i].preco_por)[0]+','+virgula_precos(internets[i].preco_por)[1]+' /mês')
							content_internets.eq(i).find(".block-price .item.pack").find("div").last().html('R$ '+virgula_precos(internets[i].preco_combo)[0]+','+virgula_precos(internets[i].preco_combo)[1]+' /mês')

							content_internets.eq(i).find(".subscribe .item.button-block").find("a").attr('href', link+'&internetId='+internets[i].id);

							content_internets.eq(i).find(".subscribe .item.link.small").empty();

						}
					/* fim mobile */
				}


				thead.empty();
				thead.append(thead_tr);

				// tbody.append(tbody_tr);
				tbodyTr.eq( 0 ).append(tbody_td_0);
				tbodyTr.eq( 1 ).append(tbody_td_1);
				tbodyTr.eq( 2 ).append(tbody_td_2);
				tbodyTr.eq( 3 ).append(tbody_td_3);
				tbodyTr.eq( 4 ).append(tbody_td_4);

				tabLinks.append(mobile_item);
			}
		}
	}


	function tabela_combos_tv_internet(link){

		var table_multi = $(".table_multi");

		if(table_multi.length > 0){

			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			if( data_parsed.produtos.hasOwnProperty('tv') ){

				var tvs = data_parsed.produtos.tv;

				var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'EscaleSEOCLAROTV';
				var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';
				

				var table_multi_side = table_multi.find('.table_multi_side');
				const table_multi_title = table_multi_side.find(".table_multi_title");

				var table_multi_prices_wrapper = table_multi.find('.table_multi_prices').find('.table_multi_prices_wrapper');
				const table_multi_titles = table_multi_prices_wrapper.find(".table_multi_titles");
				const table_multi_pricing = table_multi_prices_wrapper.find(".table_multi_pricing").first();


				var tv_coluna = '';
				var internet_titles = '';
				var table_multi_pricing_vals = '';

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
	}


	function simulador(link){

		const simulador_componnent = jQuery("[data-component-name='simulator']");

		if(simulador_componnent.length > 0){

			simulador_componnent.append('<div style="display:none;" id="simulator_data"><ul><li id="simulator_data_telefone"></li><li id="simulator_data_internet"></li><li id="simulator_data_tv"></li><li id="simulator_data_celular"></li></ul></div>');

			var simulator_data_telefone = jQuery("#simulator_data_telefone");
			var simulator_data_internet = jQuery("#simulator_data_internet");
			var simulator_data_tv = jQuery("#simulator_data_tv");
			var simulator_data_celular = jQuery("#simulator_data_celular");
			var soma_produtos_wrap = jQuery("#soma_produtos_wrap");

			var telefone = simulador_componnent.find("#cardsList").find(".cardsList-item").eq(0);
			var internet = simulador_componnent.find("#cardsList").find(".cardsList-item").eq(1);
			var tv = simulador_componnent.find("#cardsList").find(".cardsList-item").eq(2);
			var celular = simulador_componnent.find("#cardsList").find(".cardsList-item").eq(3);

			var telefone_select = telefone.find("select");
			var internet_select = internet.find("select");
			var tv_select = tv.find("select");
			var celular_select = celular.find("select");

			var botao = simulador_componnent.find("button.btn");
			var botao_parent = botao.parent("div.action");
			botao_parent.empty();
			botao_parent.append('<a href="#" disabled id="novo_botao_comprar" data-base-link="'+link+'" class="btn disabled">GOSTEI, QUERO ASSINAR</a>');

			var novo_botao = jQuery("#novo_botao_comprar");


			telefone.find(".individual").find('span.price').find('span').attr('data-preco-individual', "000");

			internet.find(".individual").find('span.price').find('span').attr('data-preco-individual', "000");

			tv.find(".individual").find('span.price').find('span').attr('data-preco-individual', "000");

			celular.find(".individual").find('span.price').find('span').attr('data-preco-individual', "000");



			telefone_select.find("option").not(':first').remove();
			internet_select.find("option").not(':first').remove();
			tv_select.find("option").not(':first').remove();
			celular_select.find("option").not(':first').remove();


			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			var options_telefone = '';
			var options_internet = '';
			var options_tv = '';
			var options_celular = '';

			for (var i = 0; i < data_parsed.produtos.fone.length; i++) {
				options_telefone += '<option value="'+data_parsed.produtos.fone[i].id+'-'+data_parsed.produtos.fone[i].preco_por+'-'+data_parsed.produtos.fone[i].preco_combo+'">'+data_parsed.produtos.fone[i].nome+'</option>';
			}

			for (var i = 0; i < data_parsed.produtos.internet.length; i++) {
				options_internet += '<option value="'+data_parsed.produtos.internet[i].id+'-'+data_parsed.produtos.internet[i].preco_por+'-'+data_parsed.produtos.internet[i].preco_combo+'">'+data_parsed.produtos.internet[i].nome+'</option>';

			}

			for (var i = 0; i < data_parsed.produtos.tv.length; i++) {
				options_tv += '<option value="'+data_parsed.produtos.tv[i].id+'-'+data_parsed.produtos.tv[i].preco_por+'-'+data_parsed.produtos.tv[i].preco_combo+'">'+data_parsed.produtos.tv[i].nome+'</option>';

			}

			for (var i = 0; i < data_parsed.produtos.celular.length; i++) {
				options_celular += '<option value="'+data_parsed.produtos.celular[i].id+'-'+data_parsed.produtos.celular[i].preco_por+'-'+data_parsed.produtos.celular[i].preco_combo+'">'+data_parsed.produtos.celular[i].nome+'</option>';
			}

			telefone_select.append(options_telefone);
			internet_select.append(options_internet);
			tv_select.append(options_tv);
			celular_select.append(options_celular);


			telefone_select.change(function(event) {
				var soma_produtos = parseInt(soma_produtos_wrap.text());
				var valor_opt = $(this).val();
				var simulator_data_telefone_controle = parseInt(simulator_data_telefone.attr('data-controle'));

				var prod_id = false;

				if (valor_opt != "") {

					var tel_val = valor_opt.split("-");
					var tel_valor = tel_val[0];
					var tel_preco = tel_val[1];
					var tel_preco_combo = tel_val[2];


					simulator_data_telefone.text(tel_valor);
					if (parseInt(simulator_data_telefone_controle) < 1) {
						soma_produtos = soma_produtos + 1;
						simulator_data_telefone.attr('data-controle', 1);
					}

					soma_produtos_wrap.text(soma_produtos);

					var preco_individual = virgula_precos(tel_preco)[0]+','+virgula_precos(tel_preco)[1];

					telefone.find(".individual").find('span.price').find('span').text(preco_individual);
					telefone.find(".individual").find('span.price').find('span').attr('data-preco-individual', tel_preco);

					prod_id = tel_valor;
					

				}else{
					simulator_data_telefone.text("0");
					if (parseInt(simulator_data_telefone_controle) > 0) {
						if(parseInt(soma_produtos) > 0){
							soma_produtos = soma_produtos - 1;
						}
						simulator_data_telefone.attr('data-controle', 0);
					}

					soma_produtos_wrap.text(soma_produtos);

					telefone.find(".individual").find('span.price').find('span').attr('data-preco-individual', "0000");
				}


				

				pega_valores_selecao(telefone, internet, tv, celular);
			});



			internet_select.change(function(event) {
				var soma_produtos = parseInt(soma_produtos_wrap.text());
				var valor_opt = $(this).val();
				var simulator_data_internet_controle = parseInt(simulator_data_internet.attr('data-controle'));

				if (valor_opt != "") {

					var net_val = valor_opt.split("-");
					var net_valor = net_val[0];
					var net_preco = net_val[1];
					var net_preco_combo = net_val[2];


					simulator_data_internet.text(net_valor);
					if (parseInt(simulator_data_internet_controle) < 1) {
						soma_produtos = soma_produtos + 1;
						simulator_data_internet.attr('data-controle', 1);
					}

					soma_produtos_wrap.text(soma_produtos);

					var preco_individual = virgula_precos(net_preco)[0]+','+virgula_precos(net_preco)[1];

					internet.find(".individual").find('span.price').find('span').text(preco_individual);
					internet.find(".individual").find('span.price').find('span').attr('data-preco-individual', net_preco);

					

				}else{
					simulator_data_internet.text("0");
					if (parseInt(simulator_data_internet_controle) > 0) {
						if(parseInt(soma_produtos) > 0){
							soma_produtos = soma_produtos - 1;
						}
						simulator_data_internet.attr('data-controle', 0);

						internet.find(".individual").find('span.price').find('span').attr('data-preco-individual', "0000");

					}

					soma_produtos_wrap.text(soma_produtos);
				}

				pega_valores_selecao(telefone, internet, tv, celular);
			});



			tv_select.change(function(event) {
				var soma_produtos = parseInt(soma_produtos_wrap.text());
				var valor_opt = $(this).val();
				var simulator_data_tv_controle = parseInt(simulator_data_tv.attr('data-controle'));

				if (valor_opt != "") {

					var tv_val = valor_opt.split("-");
					var tv_valor = tv_val[0];
					var tv_preco = tv_val[1];
					var tv_preco_combo = tv_val[2];


					simulator_data_tv.text(tv_valor);
					if (parseInt(simulator_data_tv_controle) < 1) {
						soma_produtos = soma_produtos + 1;
						simulator_data_tv.attr('data-controle', 1);
					}

					soma_produtos_wrap.text(soma_produtos);

					var preco_individual = virgula_precos(tv_preco)[0]+','+virgula_precos(tv_preco)[1];

					tv.find(".individual").find('span.price').find('span').text(preco_individual);
					tv.find(".individual").find('span.price').find('span').attr('data-preco-individual', tv_preco);
				

				}else{
					simulator_data_tv.text("0");
					if (parseInt(simulator_data_tv_controle) > 0) {
						if(parseInt(soma_produtos) > 0){
							soma_produtos = soma_produtos - 1;
						}
						simulator_data_tv.attr('data-controle', 0);

						tv.find(".individual").find('span.price').find('span').attr('data-preco-individual', "0000");
					}

					soma_produtos_wrap.text(soma_produtos);
				}

				pega_valores_selecao(telefone, internet, tv, celular);
			});


			celular_select.change(function(event) {
				// var soma_produtos = parseInt(soma_produtos_wrap.text());
				var valor_opt = $(this).val();
				var simulator_data_celular_controle = parseInt(simulator_data_celular.attr('data-controle'));

				if (valor_opt != "") {

					var celular_val = valor_opt.split("-");
					var celular_valor = celular_val[0];
					var celular_preco = celular_val[1];
					var celular_preco_combo = celular_val[2];


					simulator_data_celular.text(celular_valor);
					if (parseInt(simulator_data_celular_controle) < 1) {
						// soma_produtos = soma_produtos + 1;
						simulator_data_celular.attr('data-controle', 1);
					}

					// soma_produtos_wrap.text(soma_produtos);

					var preco_individual = virgula_precos(celular_preco)[0]+','+virgula_precos(celular_preco)[1];

					celular.find(".individual").find('span.price').find('span').text(preco_individual);
					celular.find(".individual").find('span.price').find('span').attr('data-preco-individual', celular_preco);

				

				}else{
					simulator_data_celular.text("0");
					if (parseInt(simulator_data_celular_controle) > 0) {
						// if(parseInt(soma_produtos) > 0){
						// 	soma_produtos = soma_produtos - 1;
						// }
						simulator_data_celular.attr('data-controle', 0);

						celular.find(".individual").find('span.price').find('span').attr('data-preco-individual', "0000");
					}

					// soma_produtos_wrap.text(soma_produtos);
				}

				pega_valores_selecao(telefone, internet, tv, celular);
			});
		}
	}


	function card_product_combo(link){
		var parent_cards = jQuery("[data-component-name='card-product-combo']");

		if(parent_cards.length > 0){

			// active branding

			var product_Combo = parent_cards.find(".ProductCombo");
			var card = product_Combo.find(".card").first(); // pego o primeiro card
			// faço o que preciso no card
			var card_list = card.find(".card-content-list");
			var card_list_li = card_list.find("li").first();
			card_list.empty();
			// guardo o card modificado
			var card = product_Combo.find(".card").first();
			product_Combo.empty(); // apago o card que ficou

			console.log(card);

			var escale_valores_api_produtos = sessionStorage.getItem('escale_valores_api_produtos');
			var data_parsed = JSON.parse(escale_valores_api_produtos);

			if( data_parsed.hasOwnProperty('combinacoes') ){
				console.log("A");
				var list = "";
				var url_params = '';
				var c = 0;
				var i = 0;


				if (data_parsed.combinacoes.length > 0) {
					console.log("B");
					var combinacoes = data_parsed.combinacoes;

					for (var u = 0; u < combinacoes.length; u++) {
						var comb = combinacoes[u];

						 product_Combo.append('<div class="flex-col-3 card"></div>');
						 product_Combo.find(".card").eq( c ).html(card.html());

						 if(comb.destaque === "true"){
						 	product_Combo.find(".card").eq( c ).addClass('active branding');
						 }


						 product_Combo.find(".card").eq( c ).find(".card-content-channels").css('display', 'none');
						 product_Combo.find(".card").eq( c ).find(".card-title").text(comb.nome_combinacao);


						 // internet
						 if( comb.hasOwnProperty('internet') ){
						 	console.log(i);
						 	list += '<li class="card-content-list-item"><span class="card-content-list-item-text">'+comb.internet.nome+' de internet</span></li>';
						 	url_params += '&internetId='+comb.internet.internetId;
						 	i = i + 1;
						 }

						 // fone
						 if( comb.hasOwnProperty('fone') ){
						 	console.log(i);
						 	list += '<li class="card-content-list-item"><span class="card-content-list-item-text">Telefone '+comb.fone.nome+'</span></li>';
						 	url_params += '&foneId='+comb.fone.foneId;
						 	i = i + 1;
						 }


						 // celular
						 if( comb.hasOwnProperty('celular') ){
						 	console.log(i);
						 	list += '<li class="card-content-list-item"><span class="card-content-list-item-text">Móvel '+comb.celular.nome+'</span></li>';
						 	url_params += '&celularId='+comb.celular.celularId;
						 	i = i + 1;
						 }

						 // tv
						 if( comb.hasOwnProperty('tv') ){
						 	console.log(i);					 	
						 	list += '<li class="card-content-list-item"><span class="card-content-list-item-text">'+comb.tv.nome+'<small style="display:block">(mais de '+comb.tv.qtd_canais+' canais)</small></span></li>';

						 	if( comb.tv.hasOwnProperty('canais_principais') ){
						 		var channels = '<div class="image-desk-flex">';
						 		for (var d = 0; d < comb.tv.canais_principais.length; d++) {
						 			channels += '<img style="width: 50px; margin: 2px 5px;" class="lazy" src="'+comb.tv.canais_principais[d]+'" />';
						 		}
						 		channels += '</div>';

						 		product_Combo.find(".card").eq( c ).find(".card-content-channels").css('display', 'block');
						 		product_Combo.find(".card").eq( c ).find(".card-content-channels").find(".col-12-sm").empty();
						 		product_Combo.find(".card").eq( c ).find(".card-content-channels").find(".col-12-sm").append(channels);
						 	}	

						 	url_params += '&tvId='+comb.tv.tvId;
						 }

						 product_Combo.find(".card").eq( c ).find(".card-content-list").append(list);


						 var preco_combo = virgula_precos(comb.preco_combo)[0]+','+virgula_precos(comb.preco_combo)[1];

						 product_Combo.find(".card").eq( c ).find(".card-footer-pricing span.card-footer-pricing-price").text("R$"+preco_combo);

						 var btn_link = product_Combo.find(".card").eq( c ).find("a.btn");
						 btn_link.attr('href', link+url_params);

						 c = c + 1;
					};
				}

			}

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
	    		// console.log(response);
	        	sessionStorage.removeItem('escale_valores_api_produtos');
	        	sessionStorage.setItem('escale_valores_api_produtos', response);
	        	sessionStorage.removeItem('cliente_cep');
	        	sessionStorage.setItem('cliente_cep', cep);
	        	sessionStorage.removeItem('cliente_numero');
	        	sessionStorage.setItem('cliente_numero', numero);

	        	var link = link_ecommerce();

	        	tabela_tv(link);
	        	tabela_internet(link);
	        	tabela_combos_tv_internet(link);
	        	simulador(link);
	        	card_product_combo(link);
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
		var link = link_ecommerce();
    	tabela_tv(link);
    	tabela_internet(link);
    	tabela_combos_tv_internet(link);
    	simulador(link);
    	card_product_combo(link);
	}


	$(".CheckAvailability-form.form_cep_api").submit(function(event) {
		event.preventDefault();
		var cep = jQuery(".CheckAvailability-form.form_cep_api").find("input").first().val();

		console.log(cep);

		// get_api(cep.replace(/[^0-9]/g, ''), 859);

		return false;
	});


});