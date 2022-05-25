<?php

function codyogden_headless_get_featured_image( $post ) {
    $featured_image = null;
    if ( has_post_thumbnail( $post ) ) {
        $post_thumbnail_id = get_post_thumbnail_id( $post );
        $post_thumbnail_post = get_post( $post_thumbnail_id );
        $sizes      = array_merge( get_intermediate_image_sizes(), array( 'full' ) );
        $sizes_data = array();

        foreach ( $sizes as $size ) {
            $src = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), $size );
            if ( $src ) {
                $sizes_data[ $size ]             = $src[0];
                $sizes_data[ $size . '-width' ]  = $src[1];
                $sizes_data[ $size . '-height' ] = $src[2];
            }
        }

        $featured_image = array(
            'id'    => $post_thumbnail_id,
            'date_gmt'  => $post_thumbnail_post->post_date_gmt,
            'date'      => $post_thumbnail_post->post_date,
            'title' => $post_thumbnail_post->post_title,
            'alt'   => get_post_meta( $post_thumbnail_id, '_wp_attachment_image_alt', true),
            'sizes' => $sizes_data,
        );
    }
    return $featured_image;
}


// Get all posts
function codyogden_headless_posts( $request ) {
    $result = get_posts();
    return rest_ensure_response(array_reduce($result, function( $p, $post ) {
        array_push($p, array(
            'id'                => $post->ID,
            'title'             => $post->post_title,
            'slug'              => $post->post_name,
            'date_gmt'          => $post->post_date_gmt,
            'date'              => $post->post_date,
            'featured_image'    => codyogden_headless_get_featured_image( $post ),
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

    $response = array(
        'id'            => $post->ID,
        'slug'          => $post->post_name,
        'title'         => $post->post_title,
        'content'       => $content,
        'date_gmt'      => $post->post_date_gmt,
        'date'          => $post->post_date,
    );


    if ( has_post_thumbnail( $post ) ) {
        $post_thumbnail_id = get_post_thumbnail_id( $post );
        $post_thumbnail_post = get_post( $post_thumbnail_id );
        $sizes      = array_merge( get_intermediate_image_sizes(), array( 'full' ) );
        $sizes_data = array();

        foreach ( $sizes as $size ) {
            $src = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), $size );
            if ( $src ) {
                $sizes_data[ $size ]             = $src[0];
                $sizes_data[ $size . '-width' ]  = $src[1];
                $sizes_data[ $size . '-height' ] = $src[2];
            }
        }

        $response['featured_image'] = array(
            'id'    => $post_thumbnail_id,
            'date_gmt'  => $post_thumbnail_post->post_date_gmt,
            'date'      => $post_thumbnail_post->post_date,
            'title' => $post_thumbnail_post->post_title,
            'alt'   => get_post_meta( $post_thumbnail_id, '_wp_attachment_image_alt', true),
            'sizes' => $sizes_data,
        );
    } else {
        $response['featured_image'] = null;
    }

    return rest_ensure_response($response);
}

function codyogden_headless_pages( $request ) {
        $query = new WP_Query(
        array(
            'post_type'   => 'page',
            'numberposts' => 1000,
        ) );
        return rest_ensure_response(array_reduce(
            $query->get_posts(),
            function($p, $post) {
                array_push( $p, array(
                    'params'    => array(
                        'path'  => explode( '/', ltrim( rtrim( parse_url( get_permalink( $post ) )['path'], '/' ), '/') ),
                    ),
                ));
                return $p;
            },
            array()
        ));
}

function codyogden_headless_page( $request ) {
    $query = new WP_Query(
        array(
            'name'   => $request['slug'],
            'post_type'   => 'page',
            'numberposts' => 1,
        ) );
    $posts = $query->get_posts();
    $post = array_shift( $posts );
    $content = ($post) ? apply_filters( 'the_content', get_the_content( null, null, $post->ID ) ) : '';
    return rest_ensure_response(array(
        'id'        => $post->ID ?? null,
        'slug'      => $post->post_name ?? null,
        'title'     => $post->post_title ?? null,
        'content'   => $content ?? null,
        'date_gmt'  => $post->post_date_gmt ?? null,
        'date'      => $post->post_date ?? null,
    ));
}

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

        register_rest_route(
            "$prefix/$version",
            '/pages',
            array(
                'methods' => 'GET',
                'permission_callback'  => '__return_true',
                'callback' => 'codyogden_headless_pages',
            )
        );

        register_rest_route(
            "$prefix/$version",
            '/pages/(?P<slug>[a-zA-Z0-9-]+)',
            array(
                'methods' => 'GET',
                'permission_callback'  => '__return_true',
                'callback' => 'codyogden_headless_page',
            )
        );
        
    }
);
