<?php

use GuzzleHttp\Client;

function get_headless_host() {
    try {
        $host = get_field( 'host', 'options' );
        return $host;
    } catch ( Exception $e ) {
        throw new Error($e->getMessage());
    }
}

$headless_client = new Client(array(
    'base_uri' => get_headless_host(),
));
