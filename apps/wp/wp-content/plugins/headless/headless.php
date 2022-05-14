<?php
/**
 * Plugin Name: Headless
 * Description: Add specific features and settings for the headless website.
 * Version: 1.0.0
 * Author: Cody Ogden
 * Author URI: https://codyogden.com
 */

// Get all posts
function codyogden_headless_posts( $request ) {
    $result = get_posts();
    return rest_ensure_response(array_reduce($result, function( $p, $post ) {
        array_push($p, array(
            'ID'    => $post->ID,
            'title' => $post->post_title,
            'slug'  => $post->post_name,
            'date_gmt'  => $post->date_gmt,
            'date'      => $post->date,
        ));
        return $p;
    }, array()));
}

// Return a single post by slug
function codyogden_headless_post( $request ) {
    $query = new WP_Query(
        array(
            'name'   => $request['slug'],
            'post_type'   => 'post',
            'numberposts' => 1,
        ) );
    $posts = $query->get_posts();
    $post = array_shift( $posts );
    $content = apply_filters( 'the_content', get_the_content( null, null, $post->ID ) );
    return rest_ensure_response(array(
        'slug'      => $post->post_name,
        'title'     => $post->post_title,
        'content'   => $content,
        'date_gmt'  => $post->post_date_gmt,
        'date'      => $post->post_date,
    ));
}

function codyogden_headless_pages( $request ) {}
function codyogden_headless_page( $request ) {}

 add_action( 'rest_api_init',
    function () {
        $prefix = 'headless';
        $version = 'v1';

        register_rest_route(
            "$prefix/$version",
            '/posts',
            array(
                'methods' => 'GET',
                'permission_callback'  => '__return_true',
                'callback' => 'codyogden_headless_posts',
            )
        );

        register_rest_route(
            "$prefix/$version",
            '/posts/(?P<slug>[a-zA-Z0-9-]+)',
            array(
                'methods' => 'GET',
                'permission_callback'  => '__return_true',
                'callback' => 'codyogden_headless_post',
            )
        );
    }
);
