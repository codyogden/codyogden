<?php
/**
 * Plugin Name: Uses
 * Description: Items feed for codyogden.com
 * Version: 1.0.0
 * Author: Cody Ogden
 * Author URI: https://codyogden.com
 * Text Domain: co_uses
 */

// Register Custom Post Type
function codyogden_uses() {

	$labels = array(
		'name'                  => _x( 'Items', 'Post Type General Name', 'co_uses' ),
		'singular_name'         => _x( 'Item', 'Post Type Singular Name', 'co_uses' ),
		'menu_name'             => __( 'Items', 'co_uses' ),
		'name_admin_bar'        => __( 'Item', 'co_uses' ),
		'archives'              => __( 'Item Archives', 'co_uses' ),
		'attributes'            => __( 'Item Attributes', 'co_uses' ),
		'parent_item_colon'     => __( 'Parent Item:', 'co_uses' ),
		'all_items'             => __( 'All Items', 'co_uses' ),
		'add_new_item'          => __( 'Add New Item', 'co_uses' ),
		'add_new'               => __( 'Add New', 'co_uses' ),
		'new_item'              => __( 'New Item', 'co_uses' ),
		'edit_item'             => __( 'Edit Item', 'co_uses' ),
		'update_item'           => __( 'Update Item', 'co_uses' ),
		'view_item'             => __( 'View Item', 'co_uses' ),
		'view_items'            => __( 'View Items', 'co_uses' ),
		'search_items'          => __( 'Search Item', 'co_uses' ),
		'not_found'             => __( 'Not found', 'co_uses' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'co_uses' ),
		'featured_image'        => __( 'Featured Image', 'co_uses' ),
		'set_featured_image'    => __( 'Set featured image', 'co_uses' ),
		'remove_featured_image' => __( 'Remove featured image', 'co_uses' ),
		'use_featured_image'    => __( 'Use as featured image', 'co_uses' ),
		'insert_into_item'      => __( 'Insert into item', 'co_uses' ),
		'uploaded_to_this_item' => __( 'Uploaded to this photo', 'co_uses' ),
		'items_list'            => __( 'Items list', 'co_uses' ),
		'items_list_navigation' => __( 'Items list navigation', 'co_uses' ),
		'filter_items_list'     => __( 'Filter photos list', 'co_uses' ),
	);
	$args = array(
		'label'                 => __( 'Item', 'co_uses' ),
		'description'           => __( 'Item gallery posts.', 'co_uses' ),
		'labels'                => $labels,
		'supports'              => array( 'title' ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-screenoptions',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'rewrite'               => false,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
		'rest_controller_class' => 'WP_REST_Items_Controller',
	);
	register_post_type( 'uses', $args );

}
add_action( 'init', 'codyogden_uses', 0 );

function codyogden_headless_uses( $request ) {
	$per_page = ($request['per_page'] > 0) ? $request['per_page'] : 12;
	$offset = ($request['offset'] > 0) ? $request['offset'] : 0;
    $query = new WP_Query(
    array(
        'post_type'   => 'uses',
        'posts_per_page' => $per_page,
		'offset'	=> $offset,
    ) );

    return rest_ensure_response(array(
		'meta'	=> array(
			'total'	=> $query->found_posts,
			'per_page'	=> $per_page,
		),
		'data'	=> array_reduce(
            $query->get_posts(),
            function($p, $item) {
                $fields = get_fields( $item->ID );
                if( ! $fields )
                    return $p;
                array_push( $p, array(
                    'id'        => $item->ID,
                    'date_gmt'  => $item->post_date_gmt,
                    'date'      => $item->post_date,
                    'title'     => $item->post_title,
                    'fields'    => array_merge(
                        $fields,
                        array(
                            'image' => array(
                                'sizes' => array_merge(
                                $fields['image']['sizes'],
                                array(
                                    'full'          => $fields['image']['url'],
                                    'full-width'    => $fields['image']['width'],
                                    'full-height'   => $fields['image']['height'],
                                )
                            )
                            )
                        )
                    ),
                ));
                return $p;
            },
            array()
        )
	));
}

add_action( 'rest_api_init', function() {
    $prefix = 'headless';
    $version = 'v1';

    register_rest_route(
        "$prefix/$version",
        '/uses',
        array(
            'methods' => 'GET',
            'permission_callback'  => '__return_true',
            'callback' => 'codyogden_headless_uses',
        )
    );

});


add_action( 'after_setup_theme', 'codyogden_headless_uses_theme_setup' );
function codyogden_headless_uses_theme_setup() {
    add_image_size( 'co-uses', 400, 400, true );
}
