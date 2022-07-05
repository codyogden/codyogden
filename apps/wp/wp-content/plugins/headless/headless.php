<?php
/**
 * Plugin Name: Headless
 * Description: Add specific features and settings for the headless website.
 * Version: 1.0.0
 * Author: Cody Ogden
 * Author URI: https://codyogden.com
 */

use GuzzleHttp\Client;

require dirname(__FILE__) . '/options.php';
require dirname(__FILE__) . '/client.php';
require dirname(__FILE__) . '/menu.php';
require dirname(__FILE__) . '/api.php';

function headless_get_path( $post ) {
    $permalink = get_permalink( $post->ID );
    if ( $post->post_status === 'draft' ) {

        $my_post = clone $post;
        $my_post->post_status = 'publish';
        $my_post->post_name = sanitize_title(
            $my_post->post_name ? $my_post->post_name : $my_post->post_title,
            $my_post->ID
        );
        $permalink = get_permalink( $my_post );
    }

    $path = rtrim( parse_url( $permalink )['path'], '/' );

    switch ($post->post_type) {
        case 'post':
            return "/blog$path";
        default:
            return $path;
    }
}

function headless_revalidate_page( $post ) {
    global $headless_client;
    $path = headless_get_path( $post );
    if($path) {
        try {
            $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=' . $path);
        } catch (Exception $e) {
            throw new Error($e->getMessage());
        }
    }
}

function headless_revalidate_post( $post ) {
    global $headless_client;
    $path = headless_get_path( $post );
    if($path) {
        try {
            $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=' . $path);
            $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=/blog');
        } catch (Exception $e) {
            throw new Error($e->getMessage());
        }
    }
}

function headless_revalidate_photos( $post ) {
    global $headless_client;
    try {
        $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=/photos');
    } catch (Exception $e) {
        throw new Error($e->getMessage());
    }
}

function headless_revalidate_uses( $post ) {
    global $headless_client;
    try {
        $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=/uses');
    } catch (Exception $e) {
        throw new Error($e->getMessage());
    }
}

add_action('save_post', function( $post_id, $post, $update ) {
    global $headless_client;
    $headless_client->request('GET', '/api/revalidate?token=' . HEADLESS_REVALIDATE_TOKEN . '&path=/');
    if( function_exists( 'headless_revalidate_' . $post->post_type ) ) {
        ('headless_revalidate_' . get_post( $post_id )->post_type)( get_post( $post_id ) );
    }

}, 10, 3);

add_action('wp_trash_post', function( $post_id ) {

    if( function_exists( 'headless_revalidate_' . get_post( $post_id )->post_type ) ) {
        wp_update_post(array( 'ID' => $post_id, 'post_status' => 'draft' ));
        ('headless_revalidate_' . get_post( $post_id )->post_type)( get_post( $post_id ) );
    }

}, 99);
