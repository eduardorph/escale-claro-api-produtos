<?php
function escale_api_produtos_admin_page() {
    add_menu_page( 'Configuração Escale API Produtos', 'Escale API Conf', 'manage_options', 'escale-api-settings', 'escale_api_produtos' );
}
add_action( 'admin_menu', 'escale_api_produtos_admin_page' );


function escale_api_produtos_options() {
    
    register_setting( 'escale_api_produtos_plugin_options', 'escale_api_produtos_plugin_options_tv' );
    register_setting( 'escale_api_produtos_plugin_options', 'escale_api_produtos_plugin_options_internet' );
    register_setting( 'escale_api_produtos_plugin_options', 'escale_api_produtos_plugin_options_combos' );
    

    add_settings_section( 'escale_api_produtos_section', 'Produtos Disponíveis', 'escale_api_produtos_section_api', 'escale_api_produtos' );
    // add_settings_section( 'escale_api_produtos_section2', 'Configuração da API', 'escale_api_produtos_section_api2', 'escale_api_produtos' );

    // add_settings_field( 'escale_api_produtos_plugin_options_tvs', 'Tvs', 'escale_api_produtos_tvs', 'escale_api_produtos', 'escale_api_produtos_section' );
    // add_settings_field( 'escale_api_produtos_plugin_options_internets', 'Internetes', 'escale_api_produtos_internets', 'escale_api_produtos', 'escale_api_produtos_section' );
    add_settings_field( 'escale_api_produtos_plugin_options_combos', 'Tabela de Combos (Internet)', 'escale_api_produtos_combos', 'escale_api_produtos', 'escale_api_produtos_section' );

    // add_settings_field( 'escale_api_produtos_plugin_options_page_endereco', 'URL Phoneline', 'escale_api_produtos_endereco_callback', 'escale_api_produtos', 'escale_api_produtos_section2' );
    // add_settings_field( 'escale_api_produtos_plugin_options_page_fila', 'Fila Principal', 'escale_api_produtos_fila_callback', 'escale_api_produtos', 'escale_api_produtos_section2' );

}
add_action( 'admin_init', 'escale_api_produtos_options' );