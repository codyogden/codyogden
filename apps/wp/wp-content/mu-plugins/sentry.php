<?php

add_action('wp', function(){
    activate_plugin('advanced-custom-fields-pro/acf.php');
});

\Sentry\init([
    'dsn'         => 'https://200f5291b9cb47418d4c603806e19099@o1245247.ingest.sentry.io/6423157',
    'environment' => 'development',
]);