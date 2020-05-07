<?php
defined( 'ABSPATH' ) or die();
/*
* Plugin name: Escale API
* Description: Plugin para montar as ofertas da API Claro
* Version: 1.0
* Author: Eduardo - Proteína Digital
*/
require dirname(__FILE__).'/lib/curl-php/Curl.php';
require dirname(__FILE__).'/claro-api/Claro.php';
require dirname(__FILE__).'/front.php';

// ESTILOS
function load_jquery() {
    if ( !wp_script_is( 'jquery', 'enqueued' )) {

        //Enqueue
        wp_enqueue_script( 'jquery' );
    }

    wp_register_style( 'escale_api', plugins_url('/style.css', __FILE__), false, '1.0.3', 'all');
    wp_enqueue_style( 'escale_api' );

    wp_register_script( 'escale_api_mask', plugins_url('/lib/mask/jquery.mask.min.js',__FILE__ ), false, '1.0.0', 'all');
    wp_enqueue_script('escale_api_mask');

    wp_register_script( 'escale_api', plugins_url('/escale_api.js',__FILE__ ), false, '1.0.18', 'all');
    wp_enqueue_script('escale_api');

    wp_localize_script('escale_api', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php'), 'outro_valor' => 1234));
}
add_action( 'wp_enqueue_scripts', 'load_jquery' );