<?php

function codyogden_headless_menus( $request ) {
    return rest_ensure_response( array_reduce( wp_get_nav_menu_items( $request['slug'] ), function( $p, $item ){
        // array_push( $p, array(
        //     'id'    => $item->ID,
        //     'title' => $item->title,
        //     'url'   => rtrim( str_replace( 'http://localhost:8080', '', $item->url ), '/'),
        // ));
        array_push( $p, $item );
        return $p;
    }, array() ));
}

add_action('rest_api_init', function(){
    $prefix = 'headless';
    $version = 'v1';
    register_rest_route(
        "$prefix/$version",
        'settings',
        array(
            'methods'   => 'GET',
            'permission_callback'   => '__return_true',
            'callback'  => function( $request ){
                return rest_ensure_response( array(
                    'menu'  => array_reduce( wp_get_nav_menu_items( 'main-menu' ), function( $p, $item ){
                        array_push( $p, array(
                            'id'    => $item->ID,
                            'title' => $item->title,
                            'url'   => rtrim( str_replace( 'http://localhost:8080', '', $item->url ), '/'),
                        ));
                        return $p;
                    }, array() )
                ) );
            }
        )
    );
    register_rest_route(
        "$prefix/$version",
        '/menus/(?P<slug>[a-zA-Z0-9-]+)',
        array(
            'methods'   => 'GET',
            'permission_callback'   => '__return_true',
            'callback'  => 'codyogden_headless_menus',
        )
    );
});