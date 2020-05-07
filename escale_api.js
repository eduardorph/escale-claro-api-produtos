jQuery(function($) {

	console.log("v18");

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


	if (sessionStorage.getItem('escale_valores_api') === null) {
		$("#escale-api-modal-ctas").removeClass('hide');
	}


	$(document).on('click', '#escale-api-modal-ctas-fechar', function(event) {
		$("#escale-api-modal-ctas").addClass('hide');
	});


	$(document).on('click', '[data-api-modal], .abrir_modal_api_form', function(event) {
		$("#escale-api-modal-ctas").removeClass('hide');
	});


	$('#escale_api_form_cep').mask('00000-000');


	$('form#escale_api_form').on('submit', function(e){
	    e.preventDefault();
	    var formulario = $(this),

	    url = formulario.attr('action'),
	    type = formulario.attr('method');

	    var cep = $('#escale_api_form_cep').val();
	    var numero = $('#escale_api_form_numero').val();

	    var submitbtn = $("#escale-api-form-btn-submit");
	    var submitbtn_value = $("#escale-api-form-btn-submit").val();

	    console.log("Clicado");

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
		        submitbtn.val(submitbtn.attr('data-wait'));
		        $("#escale-form-mensagem").removeClass('erro');
		    },
	    	success: function(response){
	        	sessionStorage.removeItem('escale_valores_api');
	        	sessionStorage.removeItem('escale_valores_api_cep');
	        	sessionStorage.removeItem('escale_valores_api_numero');
	        	sessionStorage.setItem('escale_valores_api', response);
	        	sessionStorage.setItem('escale_valores_api_cep', cep);
	        	sessionStorage.setItem('escale_valores_api_numero', numero);
	        	console.log("Finalizado");

	        	planos();
	        	planosControle();
	        	planosPos();

	        	$("#escale-api-modal-ctas").addClass('hide');
	     	}, 
	     	error: function(data){
	        	// $("#escale-form-mensagem").text('Formulário não pôde ser enviado!').addClass('erro');
	        	console.log(data);
	     	},
	     	complete: function(){
	        	submitbtn.val(submitbtn_value);
	     	}
	    });
		return false;
	});


	function planosControle(){
		var data = sessionStorage.getItem('escale_valores_api');
		var cep = sessionStorage.getItem('escale_valores_api_cep');
		var numero = sessionStorage.getItem('escale_valores_api_numero');

		var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'Oferta_combomulti_escale';
		var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

		if (data !== null) {
			console.log("tem data");

			var data_parsed = JSON.parse(data);
			var controles = data_parsed.produtos.celular.controles;

			var cards = $(".escale_api_cards_controle").children().children();

			if (cards.length != 0) {

				var total_cards = cards.length;

				var c = 0;
				$.each(controles, function(index, value) {

					if(c === total_cards) {
				        return false;
				    }

					var card = $(cards[c]);

					var nome_plano = value.nome.split(" ");
					var franquia = nome_plano[1].replace(/[^0-9]/g, '');
					var nomeFranquia = nome_plano[1].replace(/[^aA-zZ]/g, '');

					var preco1 = value.preco.toString().slice(0, -2);
					var preco2 = value.preco.toString().slice(-2);

					var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero+"&celularId="+value.id+"&origem=claro";

					card.find(".escale-api-card-franquia-numero").text(franquia);
					card.find(".escale-api-card-franquia-texto").text(nomeFranquia);

					card.find(".escale-api-card-valor").text(preco1);
					card.find(".escale-api-card-centavos").text(","+preco2);

					card.find(".escale-api-card-botao").attr('href', link);

					c++;
				});
			}
		}
	}


	function planosPos(){
		var data = sessionStorage.getItem('escale_valores_api');
		var cep = sessionStorage.getItem('escale_valores_api_cep');
		var numero = sessionStorage.getItem('escale_valores_api_numero');

		var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'Oferta_combomulti_escale';
		var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

		if (data !== null) {

			var data_parsed = JSON.parse(data);
			var celulares = data_parsed.produtos.celular.celulares;

			var cards = $(".escale_api_cards_pos").children().children();

			if (cards.length != 0) {

				var total_cards = cards.length;

				var c = 0;
				$.each(celulares, function(index, value) {

					if(c === total_cards) {
				        return false;
				    }

				    if(index !== 0 && index !== 1 && index !== celulares.length -1){
				    	return true;
				    }

					var card = $(cards[c]);

					var nome_plano = value.nome;
					var franquia = nome_plano.replace(/[^0-9]/g, '');
					var nomeFranquia = nome_plano.replace(/[^aA-zZ]/g, '');

					var preco1 = value.preco.toString().slice(0, -2);
					var preco2 = value.preco.toString().slice(-2);

					var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero+"&celularId="+value.id+"&origem=claro";

					card.find(".escale-api-card-franquia-numero").text(franquia);
					card.find(".escale-api-card-franquia-texto").text(nomeFranquia);

					card.find(".escale-api-card-valor").text(preco1);
					card.find(".escale-api-card-centavos").text(","+preco2);

					card.find(".escale-api-card-botao").attr('href', link);


					c++;
				});
			}
		}
	}

	function planos(){
		var data = sessionStorage.getItem('escale_valores_api');
		var cep = sessionStorage.getItem('escale_valores_api_cep');
		var numero = sessionStorage.getItem('escale_valores_api_numero');

		var utm_source = _GETURL("utm_source") ? _GETURL("utm_source") : 'Oferta_combomulti_escale';
		var utm_campaign = _GETURL("utm_campaign") ? _GETURL("utm_campaign") : 'clique';

		if (data !== null) {

			var data_parsed = JSON.parse(data);
			var celulares = data_parsed.produtos.celular.celulares;
			var controles = data_parsed.produtos.celular.controles;


			var cards = $(".escale_api_cards_planos").children().children();

			if (cards.length != 0) {

				var c = 1;

				// CONTROLES

				$.each(controles, function(index, value) {

					if(c === 3) {
				        return false;
				    }

				    if(index !== 0 && index !== 1 && index !== controles.length -1){
				    	return true;
				    }


					var card = $(cards[c]);

					var nome_plano = value.nome.split(" ");
					var franquia = nome_plano[1].replace(/[^0-9]/g, '');
					var nomeFranquia = nome_plano[1].replace(/[^aA-zZ]/g, '');

					var preco1 = value.preco.toString().slice(0, -2);
					var preco2 = value.preco.toString().slice(-2);

					var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero+"&celularId="+value.id+"&origem=claro";

					card.find(".escale-api-card-franquia-numero").text(franquia);
					card.find(".escale-api-card-franquia-texto").text(nomeFranquia);

					card.find(".escale-api-card-valor").text(preco1);
					card.find(".escale-api-card-centavos").text(","+preco2);

					card.find(".escale-api-card-botao").attr('href', link);


					c++;
				});


				// PÓS PAGO

					var key = 1;
					var card = $(cards[3]);

					var nome_plano = celulares[key].nome;
					var franquia = nome_plano.replace(/[^0-9]/g, '');
					var nomeFranquia = nome_plano.replace(/[^aA-zZ]/g, '');

					var preco1 = celulares[key].preco.toString().slice(0, -2);
					var preco2 = celulares[key].preco.toString().slice(-2);

					var link = "https://planos.claro.com.br/checkout/?affiliateId=jKqRuzgfO&affiliateUserId=Re92UE2&utm_medium=aa&utm_source="+utm_source+"&utm_campaing="+utm_campaign+"&cep="+cep.replace(/[^0-9]/g, '')+"&number="+numero+"&celularId="+celulares[key].id+"&origem=claro";

					card.find(".escale-api-card-franquia-numero").text(franquia);
					card.find(".escale-api-card-franquia-texto").text(nomeFranquia);

					card.find(".escale-api-card-valor").text(preco1);
					card.find(".escale-api-card-centavos").text(","+preco2);

					card.find(".escale-api-card-botao").attr('href', link);


			}
		}
	}

	planos();

	planosPos();

	planosControle();


});