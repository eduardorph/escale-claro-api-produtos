<?php
// Register Custom Post Type
function escale_escolha_combos() {

  $labels = array(
    'name'                  => _x( 'API Combos', 'Post Type General Name', 'Combo' ),
    'singular_name'         => _x( 'API Combo', 'Post Type Singular Name', 'Combo' ),
    'menu_name'             => __( 'API Combos', 'Combo' ),
    'name_admin_bar'        => __( 'API Combo', 'Combo' ),
    'archives'              => __( 'Item Archives', 'Combo' ),
    'attributes'            => __( 'Item Attributes', 'Combo' ),
    'parent_item_colon'     => __( 'Parent Item:', 'Combo' ),
    'all_items'             => __( 'All Items', 'Combo' ),
    'add_new_item'          => __( 'Adicionar Combo', 'Combo' ),
    'add_new'               => __( 'Adicionar Combo', 'Combo' ),
    'new_item'              => __( 'Novo Combo', 'Combo' ),
    'edit_item'             => __( 'Editar Combo', 'Combo' ),
    'update_item'           => __( 'Atualizar Combo', 'Combo' ),
    'view_item'             => __( 'Ver Combo', 'Combo' ),
    'view_items'            => __( 'Ver Combos', 'Combo' ),
    'search_items'          => __( 'Search Item', 'Combo' ),
    'not_found'             => __( 'Not found', 'Combo' ),
    'not_found_in_trash'    => __( 'Not found in Trash', 'Combo' ),
    'featured_image'        => __( 'Featured Image', 'Combo' ),
    'set_featured_image'    => __( 'Set featured image', 'Combo' ),
    'remove_featured_image' => __( 'Remove featured image', 'Combo' ),
    'use_featured_image'    => __( 'Use as featured image', 'Combo' ),
    'insert_into_item'      => __( 'Insert into item', 'Combo' ),
    'uploaded_to_this_item' => __( 'Uploaded to this item', 'Combo' ),
    'items_list'            => __( 'Items list', 'Combo' ),
    'items_list_navigation' => __( 'Items list navigation', 'Combo' ),
    'filter_items_list'     => __( 'Filter items list', 'Combo' ),
  );
  $args = array(
    'label'                 => __( 'API Combo', 'Combo' ),
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
  register_post_type( 'escale_combos_pt', $args );

}
add_action( 'init', 'escale_escolha_combos', 0 );



// META BOXES
function escale_api_meta_boxes_combos()
{
  add_meta_box ( 'escale-api-planos-combo', 'Planos', 'escale_combos_planos', 'escale_combos_pt', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'escale_api_meta_boxes_combos' );



function escale_api_meta_boxes_combos_save( $post_id )
{
	if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;

	if( !isset( $_POST['meta_box_nonce'] ) || !wp_verify_nonce( $_POST['meta_box_nonce'], 'my_meta_box_nonce' ) ) return;

	if( !current_user_can( 'edit_posts' ) ) return;

	$allowed = array(
		'a' => array(
			'href' => array()
		)
	);

	if( isset( $_POST['plano_tv'] ) ){
		$meta_element_class = $_POST['plano_tv'];
		update_post_meta( $post_id, 'escale_combos_plano_tv', wp_kses( $_POST['plano_tv'], $allowed ) );
	}

  if( isset( $_POST['plano_internet'] ) ){
    $meta_element_class = $_POST['plano_internet'];
    update_post_meta( $post_id, 'escale_combos_plano_internet', wp_kses( $_POST['plano_internet'], $allowed ) );
  }

  if( isset( $_POST['planos_telefone'] ) ){
    $meta_element_class = $_POST['planos_telefone'];
    update_post_meta( $post_id, 'escale_combos_plano_telefone', wp_kses( $_POST['planos_telefone'], $allowed ) );
  }

  if( isset( $_POST['planos_movel'] ) ){
    $meta_element_class = $_POST['planos_movel'];
    update_post_meta( $post_id, 'escale_combos_plano_movel', wp_kses( $_POST['planos_movel'], $allowed ) );
  }
}
add_action( 'save_post', 'escale_api_meta_boxes_combos_save' );


function escale_combos_planos($post){
    $plano_tv = get_post_meta($post->ID, 'escale_combos_plano_tv', true);
    $escale_combos_plano_tv = isset($plano_tv) && !empty($plano_tv) ? $plano_tv : '';

    $plano_internet = get_post_meta($post->ID, 'escale_combos_plano_internet', true);
    $escale_combos_plano_internet = isset($plano_internet) && !empty($plano_internet) ? $plano_internet : '';

    $plano_telefone = get_post_meta($post->ID, 'escale_combos_plano_telefone', true);
    $escale_combos_plano_telefone = isset($plano_telefone) && !empty($plano_telefone) ? $plano_telefone : '';

    $plano_movel = get_post_meta($post->ID, 'escale_combos_plano_movel', true);
    $escale_combos_plano_movel = isset($plano_movel) && !empty($plano_movel) ? $plano_movel : '';
    
    $tvs = produtos_pt('TV');
    $internets = produtos_pt('INTERNET');
    $telefones = produtos_pt('TELEFONE');
    $celulares = produtos_pt('CELULAR');

    wp_nonce_field( 'my_meta_box_nonce', 'meta_box_nonce' );
    ?> 

    <p>
      <label>Escolha um plano de TV: </label><br>
      <select name="plano_tv" id="plano_tv">
        <option value="" <?php selected( $escale_combos_plano_tv, '' ); ?>>---</option>
        <?php foreach ($tvs as $tv) { ?>
          <option value="<?php echo sanitize_title($tv->post_title); ?>" <?php selected( $escale_combos_plano_tv, sanitize_title($tv->post_title) ); ?>><?php echo strtoupper($tv->post_title); ?></option>
        <?php } ?>

      </select>
    </p>


    <p>
      <label>Escolha um plano de Internet: </label><br>
      <select name="plano_internet" id="plano_internet">
        <option value="" <?php selected( $escale_combos_plano_internet, '' ); ?>>---</option>
        <?php foreach ($internets as $internet) { ?>
          <option value="<?php echo sanitize_title($internet->post_title); ?>" <?php selected( $escale_combos_plano_internet, sanitize_title($internet->post_title) ); ?>><?php echo strtoupper($internet->post_title); ?></option>
        <?php } ?>

      </select>
    </p>


    <p>
      <label>Escolha um plano de Telefone: </label><br>
      <select name="plano_telefone" id="plano_telefone">
        <option value="" <?php selected( $escale_combos_plano_telefone, '' ); ?>>---</option>
        <?php foreach ($telefones as $telefone) { ?>
          <option value="<?php echo sanitize_title($telefone->post_title); ?>" <?php selected( $escale_combos_plano_telefone, sanitize_title($telefone->post_title) ); ?>><?php echo strtoupper($telefone->post_title); ?></option>
        <?php } ?>

      </select>
    </p>


    <p>
      <label>Escolha um plano Móvel: </label><br>
      <select name="plano_movel" id="plano_movel">
        <option value="" <?php selected( $escale_combos_plano_movel, '' ); ?>>---</option>
        <?php foreach ($celulares as $movel) { ?>
          <option value="<?php echo sanitize_title($movel->post_title); ?>" <?php selected( $escale_combos_plano_movel, sanitize_title($movel->post_title) ); ?>><?php echo strtoupper($movel->post_title); ?></option>
        <?php } ?>

      </select>
    </p>

   
    <?php
}


function produtos_pt($tipo){
  $args = array (
      'post_type'              => array( 'escale_produtos_pt' ),
      'post_status'            => array( 'publish' ),
      'meta_key'               => 'escale_api_tipo',
      'meta_value'             => $tipo,
      'nopaging'               => true,
      'order'                  => 'ASC',
      'orderby'                => 'title',
    );

  return get_posts($args);
}