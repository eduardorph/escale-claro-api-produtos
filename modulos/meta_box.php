<?php
function escale_api_meta_boxes()
{
  add_meta_box ( 'escale-api-tipo', 'Tipo de Produto', 'escale_api_tipo', 'escale_produtos_pt', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'escale_api_meta_boxes' );



function escale_api_meta_boxes_save( $post_id )
{
	if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;

	if( !isset( $_POST['meta_box_nonce'] ) || !wp_verify_nonce( $_POST['meta_box_nonce'], 'my_meta_box_nonce' ) ) return;

	if( !current_user_can( 'edit_posts' ) ) return;

	$allowed = array(
		'a' => array(
			'href' => array()
		)
	);

	if( isset( $_POST['escale_tipo_produto'] ) ){
		$meta_element_class = $_POST['escale_tipo_produto'];
		update_post_meta( $post_id, 'escale_api_tipo', wp_kses( $_POST['escale_tipo_produto'], $allowed ) );
	}

  if( isset( $_POST['escale_numero_canais_hd'] ) ){
    if( empty( $_POST['escale_numero_canais_hd'] ) ){
      update_post_meta( $post_id, 'escale_api_canais_hd', wp_kses( 0, $allowed ) );
    }else{
      update_post_meta( $post_id, 'escale_api_canais_hd', wp_kses( $_POST['escale_numero_canais_hd'], $allowed ) );
    }
  }

  if( isset( $_POST['escale_ondemand'] ) ){
    $ondemand = $_POST['escale_ondemand'];
    update_post_meta( $post_id, 'escale_ondemand', wp_kses( $_POST['escale_ondemand'], $allowed ) );
  }
}
add_action( 'save_post', 'escale_api_meta_boxes_save' );


function escale_api_tipo($post){
    $meta_element_class = get_post_meta($post->ID, 'escale_api_tipo', true);
    $canais_hd = get_post_meta($post->ID, 'escale_api_canais_hd', true);
    $ondemand = get_post_meta($post->ID, 'escale_ondemand', true);
    $escale_numero_canais_hd = isset($canais_hd) ? $canais_hd : 0;
    $escale_ondemand = isset($ondemand) ? $ondemand : '';
    wp_nonce_field( 'my_meta_box_nonce', 'meta_box_nonce' );
    ?> 

    <p>
      <label>Escolha o tipo de produto: </label><br>
      <select name="escale_tipo_produto" id="escale_tipo_produto" required>
        <option value="" <?php selected( $meta_element_class, '' ); ?>>ESCOLHA O TIPO DE PRODUTO</option>
        <option value="CELULAR" <?php selected( $meta_element_class, 'CELULAR' ); ?>>CELULAR</option>
        <option value="INTERNET" <?php selected( $meta_element_class, 'INTERNET' ); ?>>INTERNET</option>
        <option value="TV" <?php selected( $meta_element_class, 'TV' ); ?>>TV</option>
        <option value="TELEFONE" <?php selected( $meta_element_class, 'TELEFONE' ); ?>>TELEFONE</option>
      </select>
    </p>

    <p>
      <label for="escale_numero_canais_hd">Número de Canais HD (Se for TV): </label><br>
      <input type="number" name="escale_numero_canais_hd" value="<?php echo $escale_numero_canais_hd; ?>" id="escale_numero_canais_hd" placeholder="Ex: 10" />
    </p>

    <p>
      <label for="escale_ondemand">Conteúdo On-Demand (Se for TV): </label><br>
      <input type="text" name="escale_ondemand" value="<?php echo $escale_ondemand; ?>" id="escale_ondemand" placeholder="EX: NOW Online e Netflix" />
    </p>
    <?php
}