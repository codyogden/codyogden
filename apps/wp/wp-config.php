<?php

define( 'DB_NAME', getenv( 'WORDPRESS_DB_NAME' ) );
define( 'DB_USER', getenv( 'WORDPRESS_DB_USER' ) );
define( 'DB_PASSWORD', getenv( 'WORDPRESS_DB_PASSWORD' ) );
define( 'DB_HOST', getenv( 'WORDPRESS_DB_HOST' ) );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );
define( 'AUTH_KEY',         getenv( 'WORDPRESS_AUTH_KEY' ) );
define( 'SECURE_AUTH_KEY',  getenv( 'WORDPRESS_SECURE_AUTH_KEY' ) );
define( 'LOGGED_IN_KEY',    getenv( 'WORDPRESS_LOGGED_IN_KEY' ) );
define( 'NONCE_KEY',        getenv( 'WORDPRESS_NONCE_KEY' ) );
define( 'AUTH_SALT',        getenv( 'WORDPRESS_AUTH_SALT' ) );
define( 'SECURE_AUTH_SALT', getenv( 'WORDPRESS_SECURE_AUTH_SALT' ) );
define( 'LOGGED_IN_SALT',   getenv( 'WORDPRESS_LOGGED_IN_SALT' ) );
define( 'NONCE_SALT',       getenv( 'WORDPRESS_NONCE_SALT' ) );
$table_prefix = getenv( 'WORDPRESS_TABLE_PREFIX' );
define( 'WP_DEBUG', getenv( 'WORDPRESS_DEBUG' ) );
define( 'WP_SITEURL', getenv( 'WORDPRESS_WP_SITEURL' ) );
define( 'WP_HOME', getenv( 'WORDPRESS_WP_HOME' ) );
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_AUTO_UPDATE_CORE', false );
define( 'WP_DEFAULT_THEME', getenv( 'WP_DEFAULT_THEME' ) );
define( 'S3_UPLOADS_BUCKET', getenv( 'S3_UPLOADS_BUCKET' ) );
define( 'S3_UPLOADS_REGION', getenv( 'S3_UPLOADS_REGION' ) );
define( 'S3_UPLOADS_KEY', getenv( 'S3_UPLOADS_KEY' ) );
define( 'S3_UPLOADS_SECRET', getenv( 'S3_UPLOADS_SECRET' ) );
define( 'S3_UPLOADS_USE_INSTANCE_PROFILE', true );
define( 'S3_UPLOADS_BUCKET_URL', getenv( 'S3_UPLOADS_BUCKET_URL' ) );
define( 'S3_UPLOADS_ENDPOINT', getenv( 'S3_UPLOADS_ENDPOINT' ) );
define( 'WP_ENVIRONMENT_TYPE', getenv( 'WORDPRESS_ENVIRONMENT_TYPE' ) );
define( 'SENTRY_DSN', getenv( 'SENTRY_DSN' ) );
define( 'HEADLESS_URL', getenv( 'HEADLESS_URL' ) );
define( 'ACF_PRO_LICENSE', getenv( 'ACF_PRO_LICENSE' ) );
define( 'FORCE_SSL_ADMIN', true );
define( 'FORCE_SSL_LOGIN', true );

if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

require 'vendor/autoload.php';

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
