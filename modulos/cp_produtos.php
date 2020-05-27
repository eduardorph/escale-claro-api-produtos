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