<?php
// Register Custom Post Type
function escale_produtos_custom_post_type() {

	$labels = array(
		'name'                  => _x( 'API Produtos', 'Post Type General Name', 'Produto' ),
		'singular_name'         => _x( 'API Produto', 'Post Type Singular Name', 'Produto' ),
		'menu_name'             => __( 'API Produtos', 'Produto' ),
		'name_admin_bar'        => __( 'API Produto', 'Produto' ),
		'archives'              => __( 'Item Archives', 'Produto' ),
		'attributes'            => __( 'Item Attributes', 'Produto' ),
		'parent_item_colon'     => __( 'Parent Item:', 'Produto' ),
		'all_items'             => __( 'All Items', 'Produto' ),
		'add_new_item'          => __( 'Adicionar Produto', 'Produto' ),
		'add_new'               => __( 'Adicionar Produto', 'Produto' ),
		'new_item'              => __( 'Novo Produto', 'Produto' ),
		'edit_item'             => __( 'Editar Produto', 'Produto' ),
		'update_item'           => __( 'Atualizar Produto', 'Produto' ),
		'view_item'             => __( 'Ver Produto', 'Produto' ),
		'view_items'            => __( 'Ver Produtos', 'Produto' ),
		'search_items'          => __( 'Search Item', 'Produto' ),
		'not_found'             => __( 'Not found', 'Produto' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'Produto' ),
		'featured_image'        => __( 'Featured Image', 'Produto' ),
		'set_featured_image'    => __( 'Set featured image', 'Produto' ),
		'remove_featured_image' => __( 'Remove featured image', 'Produto' ),
		'use_featured_image'    => __( 'Use as featured image', 'Produto' ),
		'insert_into_item'      => __( 'Insert into item', 'Produto' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'Produto' ),
		'items_list'            => __( 'Items list', 'Produto' ),
		'items_list_navigation' => __( 'Items list navigation', 'Produto' ),
		'filter_items_list'     => __( 'Filter items list', 'Produto' ),
	);
	$args = array(
		'label'                 => __( 'API Produto', 'Produto' ),
		'labels'                => $labels,
		'supports'              => array( 'title' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'escale_produtos_pt', $args );

}
add_action( 'init', 'escale_produtos_custom_post_type', 0 );


// META BOXES
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