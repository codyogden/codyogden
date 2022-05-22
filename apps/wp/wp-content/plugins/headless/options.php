<?php

if( function_exists('acf_add_options_page') ) {

    acf_add_options_sub_page(array(
        'parent_slug'   => 'options-general.php',
        'page_title' 	=> 'Headless Settings',
        'menu_title'	=> 'Headless',
        'menu_slug' 	=> 'theme-general-settings',
        'capability'	=> 'edit_posts',
        'redirect'		=> false
    ));

}