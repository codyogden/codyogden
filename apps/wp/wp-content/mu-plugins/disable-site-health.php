<?php

add_action('wp_dashboard_setup', 'remove_site_health_dashboard_widget');
function remove_site_health_dashboard_widget() {
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
}

add_action( 'admin_menu', 'remove_site_health_submenu', 999 );
function remove_site_health_submenu() {
        $page = remove_submenu_page( 'tools.php', 'site-health.php' );
}
