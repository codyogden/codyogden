<?php

use GuzzleHttp\Client;

function get_headless_host() {
    try {
        $host = HEADLESS_URL;
        return $host;
    } catch ( Exception $e ) {
        throw new Error($e->getMessage());
    }
}

$headless_client = new Client(array(
    'base_uri' => get_headless_host(),
));
