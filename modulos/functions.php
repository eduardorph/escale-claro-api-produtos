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
	<label>Informe os pacotes de TV disponíveis</label><br>
    <?php
		$args = array (
			'post_type'              => array( 'escale_produtos_pt' ),
			'post_status'            => array( 'publish' ),
			'meta_key'   		     => 'escale_api_tipo',
    		'meta_value' 			 => 'TV',
			'nopaging'               => true,
			'order'                  => 'ASC',
			'orderby'                => 'title',
		);

		$tvs = get_posts($args);
		$c = 0;

		$escale_api_produtos_plugin_options_tv = get_option( 'escale_api_produtos_plugin_options_tv' ) !== null && get_option( 'escale_api_produtos_plugin_options_tv' ) !== '' ? get_option( 'escale_api_produtos_plugin_options_tv' ) : array();

		// print_r($escale_api_produtos_plugin_options_tv);


		foreach($tvs as $tv){
			if ( in_array(sanitize_title($tv->post_title), $escale_api_produtos_plugin_options_tv) ) {
				echo '<label style="margin-right: 10px;"><input type="checkbox" checked name="escale_api_produtos_plugin_options_tv[]" value="'.sanitize_title($tv->post_title).'">'.$tv->post_title.'</label>';
			}else{
				echo '<label style="margin-right: 10px;"><input type="checkbox" name="escale_api_produtos_plugin_options_tv[]" value="'.sanitize_title($tv->post_title).'">'.$tv->post_title.'</label>';
			}

			if($c % 3){
				echo "<br>";
			}

			$c++;
		}
    ?>
<?php
}


function escale_api_produtos_internets() { ?>
	<label>Informe os pacotes de Internet disponíveis</label><br>
    <?php
		$args = array (
			'post_type'              => array( 'escale_produtos_pt' ),
			'post_status'            => array( 'publish' ),
			'meta_key'   		     => 'escale_api_tipo',
    		'meta_value' 			 => 'INTERNET',
			'nopaging'               => true,
			'order'                  => 'ASC',
			'orderby'                => 'title',
		);

		$internetes = get_posts($args);
		$c = 0;

		$escale_api_produtos_plugin_options_internet = get_option( 'escale_api_produtos_plugin_options_internet' ) !== null && get_option( 'escale_api_produtos_plugin_options_internet' ) !== '' ? get_option( 'escale_api_produtos_plugin_options_internet' ) : array();

		// print_r($escale_api_produtos_plugin_options_internet);


		foreach($internetes as $internet){
			if ( in_array(sanitize_title($internet->post_title), $escale_api_produtos_plugin_options_internet) ) {
				echo '<label style="margin-right: 10px;"><input type="checkbox" checked name="escale_api_produtos_plugin_options_internet[]" value="'.sanitize_title($internet->post_title).'">'.$internet->post_title.'</label>';
			}else{
				echo '<label style="margin-right: 10px;"><input type="checkbox" name="escale_api_produtos_plugin_options_internet[]" value="'.sanitize_title($internet->post_title).'">'.$internet->post_title.'</label>';
			}

			if($c % 3){
				echo "<br>";
			}

			$c++;
		}
    ?>
<?php
}


function escale_api_produtos_combos() { ?>
	<label>Informe o nome dos pacotes de Internet para a tabela de TV + INTERNET: </label><small>Max: 3</small><br>
    <?php
		$args = array (
			'post_type'              => array( 'escale_produtos_pt' ),
			'post_status'            => array( 'publish' ),
			'meta_key'   		     => 'escale_api_tipo',
    		'meta_value' 			 => 'INTERNET',
			'nopaging'               => true,
			'order'                  => 'ASC',
			'orderby'                => 'title',
		);

		$internetes = get_posts($args);
		$c = 0;

		$escale_api_produtos_plugin_options_combos = get_option( 'escale_api_produtos_plugin_options_combos' ) !== null && get_option( 'escale_api_produtos_plugin_options_combos' ) !== '' ? get_option( 'escale_api_produtos_plugin_options_combos' ) : array();

		// print_r($escale_api_produtos_plugin_options_combos);


		foreach($internetes as $internet){
			if ( in_array(sanitize_title($internet->post_title), $escale_api_produtos_plugin_options_combos) ) {
				echo '<label style="margin-right: 10px;"><input type="checkbox" checked name="escale_api_produtos_plugin_options_combos[]" value="'.sanitize_title($internet->post_title).'">'.$internet->post_title.'</label>';
			}else{
				echo '<label style="margin-right: 10px;"><input type="checkbox" name="escale_api_produtos_plugin_options_combos[]" value="'.sanitize_title($internet->post_title).'">'.$internet->post_title.'</label>';
			}

			if($c % 3){
				echo "<br>";
			}

			$c++;
		}
    ?>
<?php
}