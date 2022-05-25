<?php

\Sentry\init([
    'dsn'         => SENTRY_DSN,
    'environment' => WP_ENVIRONMENT_TYPE,
]);
