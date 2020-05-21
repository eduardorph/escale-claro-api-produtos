<?php
function escale_api_produtos() {
	echo "<h1>Coonfiguração geral do plugin Escale API Produtos</h1>";


if ( !current_user_can( 'manage_options' ) )  {
 		wp_die( __( 'You do not have sufficient permissions to access this page.', 'escale_api_produtos' ) );
 	}
 	?>

 		<br />
 		<form method="post" action="options.php">
 	<?php
 			settings_fields( 'escale_api_produtos_plugin_options' );
 			
 			do_settings_sections( 'escale_api_produtos' );
 		?>
 		<br />
 			<input name="Submit" type="submit" value="<?php esc_attr_e('Save Changes'); ?>" />
		</form>
	
	<?php
}



function escale_api_produtos_section_api() {
    echo "Informe os valores para todas as páginas";
}


function escale_api_produtos_tvs() { ?>
	<label for="escale_cta_plugin_options_page_tel">Informe o nome dos pacotes de TV separados por vírgula</label><br>
    <input type="text" id="escale_cta_plugin_options_page_tel" name="escale_api_produtos_plugin_options_tv" placeholder="EX: Fácil HD, TOP 4K" value="<?php echo get_option( 'escale_api_produtos_plugin_options_tv' ); ?>">
<?php
}

function escale_api_produtos_internets() { ?>
	<label for="escale_cta_plugin_options_page_tel">Informe o nome dos pacotes de INTERNET separados por vírgula</label><br>
    <input type="text" id="escale_cta_plugin_options_page_tel" name="escale_api_produtos_plugin_options_internet" placeholder="EX: 10 MEGA, 120 MEGA" value="<?php echo get_option( 'escale_api_produtos_plugin_options_internet' ); ?>">
<?php
}

function escale_api_produtos_combos() { ?>
	<label for="escale_cta_plugin_options_page_tel">Informe o nome dos pacotes de INTERNET separados por vírgula para a tabela de COMBOS: </label><small>Max: 3</small><br>
    <input type="text" id="escale_cta_plugin_options_page_tel" name="escale_api_produtos_plugin_options_combos" placeholder="EX: 10 MEGA, 120 MEGA" value="<?php echo get_option( 'escale_api_produtos_plugin_options_combos' ); ?>">
<?php
}