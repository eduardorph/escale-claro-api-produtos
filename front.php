<?php
function abrir_api_modal_cep(){ 
	?>

	<div id="escale-api-modal-ctas" class="escale-api-modal hide">
	    <div class="escale-api-modal-wrapper">
	        <div class="escale-api-modal-header">
	            <a id="escale-api-modal-ctas-fechar" class="escale-api-modal-fechar">
	                <div class="escale-api-modal-fechar-texto">X</div>
	            </a>
	        </div>
	        <div class="escale-api-modal-box">
	            <span class="escale-api-modal-box-escolha-titulo">Informe seu CEP:</span>

	            <form id="escale_api_form" name="escale_api_form" method="post" action="" class="escale-api-form" enctype="multipart/form-data">
				    <div class="escale-api-form-div">
				        <input type="tel" class="escale-api-form-input" name="escale_api_form_cep" placeholder="CEP" id="escale_api_form_cep" required="">
				    </div>
				    <div class="escale-api-form-div">
				        <input type="tel" class="escale-api-form-input" name="escale_api_form_numero" placeholder="Número da Residência" id="escale_api_form_numero" required="">
				    </div>
				    
				    <div class="escale-api-form-div">
				    	<input type="submit" value="Buscar Ofertas" data-wait="Aguarde..." id="escale-api-form-btn-submit" class="escale-api-form-btn">
				   	</div>
				</form>

	        </div>
	    </div>
	</div>

	<?php
}
add_action('wp_footer', 'abrir_api_modal_cep');