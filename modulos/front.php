<?php
function abrir_api_produtos_modal_cep(){ 
	?>

	<div id="escale-api-produtos-modal-ctas" class="escale-api-produtos-modal hide">
	    <div class="escale-api-produtos-modal-wrapper">
	        <div class="escale-api-produtos-modal-header">
	            <a id="escale-api-produtos-modal-ctas-fechar" class="escale-api-produtos-modal-fechar">
	                <div class="escale-api-produtos-modal-fechar-texto">X</div>
	            </a>
	        </div>
	        <div class="escale-api-produtos-modal-box">
	            <span class="escale-api-produtos-modal-box-escolha-titulo">Informe seu CEP:</span>

	            <form id="escale_api_produtos_form" name="escale_api_produtos_form" method="post" action="" class="escale-api-produtos-form" enctype="multipart/form-data">
				    <div class="escale-api-produtos-form-div">
				        <input type="tel" class="escale-api-produtos-form-input" name="escale_api_produtos_form_cep" placeholder="CEP" id="escale_api_produtos_form_cep" required="">
				    </div>
				    <div class="escale-api-produtos-form-div">
				        <input type="tel" class="escale-api-produtos-form-input" name="escale_api_produtos_form_numero" placeholder="Número da Residência" id="escale_api_produtos_form_numero" required="">
				    </div>
				    
				    <div class="escale-api-produtos-form-div">
				    	<input type="hidden" name="escale_api_produtos_card_link" id="escale_api_produtos_card_link">
				    	<input type="submit" value="COMPRAR PLANO" data-wait="Aguarde..." id="escale-api-produtos-form-btn-submit" class="escale-api-produtos-form-btn">
				   	</div>
				</form>

	        </div>
	    </div>
	</div>

	<?php
}
add_action('wp_footer', 'abrir_api_produtos_modal_cep');