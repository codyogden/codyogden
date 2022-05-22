<?php

// Filter S3 Uploads params.
add_filter( 's3_uploads_s3_client_params', function ( $params ) {
	if ( defined( 'S3_UPLOADS_ENDPOINT' ) ) {
		$params['endpoint'] = S3_UPLOADS_ENDPOINT;
		$params['use_path_style_endpoint'] = true;
		$params['debug'] = false; // Set to true if uploads are failing.
	}
	return $params;
}, 5, 1 );
