<?php
// Register Custom Taxonomy
function escale_tipo_tax() {

	$labels = array(
		'name'                       => _x( 'Tipos de Produtos', 'Taxonomy General Name', 'escale_tipo_tax' ),
		'singular_name'              => _x( 'Tipo de Produto', 'Taxonomy Singular Name', 'escale_tipo_tax' ),
		'menu_name'                  => __( 'API Tipo de Produtos', 'escale_tipo_tax' ),
		'all_items'                  => __( 'All Items', 'escale_tipo_tax' ),
		'parent_item'                => __( 'Parent Item', 'escale_tipo_tax' ),
		'parent_item_colon'          => __( 'Parent Item:', 'escale_tipo_tax' ),
		'new_item_name'              => __( 'New Item Name', 'escale_tipo_tax' ),
		'add_new_item'               => __( 'Add New Item', 'escale_tipo_tax' ),
		'edit_item'                  => __( 'Edit Item', 'escale_tipo_tax' ),
		'update_item'                => __( 'Update Item', 'escale_tipo_tax' ),
		'view_item'                  => __( 'View Item', 'escale_tipo_tax' ),
		'separate_items_with_commas' => __( 'Separate items with commas', 'escale_tipo_tax' ),
		'add_or_remove_items'        => __( 'Add or remove items', 'escale_tipo_tax' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'escale_tipo_tax' ),
		'popular_items'              => __( 'Popular Items', 'escale_tipo_tax' ),
		'search_items'               => __( 'Search Items', 'escale_tipo_tax' ),
		'not_found'                  => __( 'Not Found', 'escale_tipo_tax' ),
		'no_terms'                   => __( 'No items', 'escale_tipo_tax' ),
		'items_list'                 => __( 'Items list', 'escale_tipo_tax' ),
		'items_list_navigation'      => __( 'Items list navigation', 'escale_tipo_tax' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => false,
		'show_in_rest'               => false,
	);
	register_taxonomy( 'escale_tipo_tax', array( 'escale_produtos_pt' ), $args );

}
add_action( 'init', 'escale_tipo_tax', 0 );