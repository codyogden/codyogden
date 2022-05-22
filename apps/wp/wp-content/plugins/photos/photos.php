<?php
/**
 * Plugin Name: Photos
 * Description: Photos feed for codyogden.com
 * Version: 1.0.0
 * Author: Cody Ogden
 * Author URI: https://codyogden.com
 * Text Domain: co_photos
 */

// Register Custom Post Type
function codyogden_photos() {

	$labels = array(
		'name'                  => _x( 'Photos', 'Post Type General Name', 'co_photos' ),
		'singular_name'         => _x( 'Photo', 'Post Type Singular Name', 'co_photos' ),
		'menu_name'             => __( 'Photos', 'co_photos' ),
		'name_admin_bar'        => __( 'Photo', 'co_photos' ),
		'archives'              => __( 'Photo Archives', 'co_photos' ),
		'attributes'            => __( 'Photo Attributes', 'co_photos' ),
		'parent_item_colon'     => __( 'Parent Photo:', 'co_photos' ),
		'all_items'             => __( 'All Photos', 'co_photos' ),
		'add_new_item'          => __( 'Add New Photo', 'co_photos' ),
		'add_new'               => __( 'Add New', 'co_photos' ),
		'new_item'              => __( 'New Photo', 'co_photos' ),
		'edit_item'             => __( 'Edit Photo', 'co_photos' ),
		'update_item'           => __( 'Update Photo', 'co_photos' ),
		'view_item'             => __( 'View Photo', 'co_photos' ),
		'view_items'            => __( 'View Photos', 'co_photos' ),
		'search_items'          => __( 'Search Photo', 'co_photos' ),
		'not_found'             => __( 'Not found', 'co_photos' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'co_photos' ),
		'featured_image'        => __( 'Featured Image', 'co_photos' ),
		'set_featured_image'    => __( 'Set featured image', 'co_photos' ),
		'remove_featured_image' => __( 'Remove featured image', 'co_photos' ),
		'use_featured_image'    => __( 'Use as featured image', 'co_photos' ),
		'insert_into_item'      => __( 'Insert into item', 'co_photos' ),
		'uploaded_to_this_item' => __( 'Uploaded to this photo', 'co_photos' ),
		'items_list'            => __( 'Photos list', 'co_photos' ),
		'items_list_navigation' => __( 'Photos list navigation', 'co_photos' ),
		'filter_items_list'     => __( 'Filter photos list', 'co_photos' ),
	);
	$args = array(
		'label'                 => __( 'Photo', 'co_photos' ),
		'description'           => __( 'Photo gallery posts.', 'co_photos' ),
		'labels'                => $labels,
		'supports'              => array( 'title' ),
		'taxonomies'            => array( 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-camera-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'rewrite'               => false,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
		'rest_controller_class' => 'WP_REST_Photos_Controller',
	);
	register_post_type( 'photos', $args );

}
add_action( 'init', 'codyogden_photos', 0 );

function codyogden_headless_photos( $request ) {
	$per_page = ($request['per_page'] > 0) ? $request['per_page'] : 12;
	$offset = ($request['offset'] > 0) ? $request['offset'] : 0;
    $query = new WP_Query(
    array(
        'post_type'   => 'photos',
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
            function($p, $photo) {
                $fields = get_field( 'photo', $photo );
                array_push( $p, array(
                    'id'        => $photo->ID,
                    'date_gmt'  => $photo->post_date_gmt,
                    'date'      => $photo->post_date,
                    'title'     => $photo->post_title,
                    'alt'       => $fields['alt'],
                    'sizes'     => array_merge(
                        $fields['sizes'],
                        array(
                            'full'          => $fields['url'],
                            'full-width'    => $fields['width'],
                            'full-height'   => $fields['height'],
                        )
                    ),
                ));
                return $p;
            },
            array()
        )
	));
}
function codyogden_headless_photo( $request ) {
    return rest_ensure_response( array() );
}

add_action( 'rest_api_init', function() {
    $prefix = 'headless';
    $version = 'v1';

    register_rest_route(
        "$prefix/$version",
        '/photos',
        array(
            'methods' => 'GET',
            'permission_callback'  => '__return_true',
            'callback' => 'codyogden_headless_photos',
        )
    );

    register_rest_route(
        "$prefix/$version",
        '/photos/(?P<slug>[0-9-]+)',
        array(
            'methods' => 'GET',
            'permission_callback'  => '__return_true',
            'callback' => 'codyogden_headless_photo',
        )
    );
});


add_action( 'after_setup_theme', 'wpdocs_theme_setup' );
function wpdocs_theme_setup() {
    add_image_size( 'co-gallery', 300, 300, true );
}
