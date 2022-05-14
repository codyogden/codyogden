<?php

// Remove Comments Notification from WordPress Admin Bar
function codyogden_remove_comments_admin_bar_links() {
  global $wp_admin_bar;
  $wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'codyogden_remove_comments_admin_bar_links');

function codyogden_disable_comments_post_types_support() {
  // Disable Support for Comments and Trackbacks in All Post Types
  $post_types = get_post_types();
  foreach ($post_types as $post_type) {
    if(post_type_supports($post_type, 'comments')) {
      remove_post_type_support($post_type, 'comments');
      remove_post_type_support($post_type, 'trackbacks');
    }
  }

  // Redirect Any Access to the Comments Page
  global $pagenow;
  if ($pagenow === 'edit-comments.php') {
    wp_redirect(admin_url()); exit;
  }

  // Remove Comments meta box from Post Editor
  remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
}
add_action('admin_init', 'codyogden_disable_comments_post_types_support');

// Close All Comments
function codyogden_disable_comments_status() {
  return false;
}
add_filter('comments_open', 'codyogden_disable_comments_status', 20, 2);
add_filter('pings_open', 'codyogden_disable_comments_status', 20, 2);

// Hide Existing Comments
function codyogden_disable_comments_hide_existing_comments($comments) {
  $comments = array();
  return $comments;
}
add_filter('comments_array', 'codyogden_disable_comments_hide_existing_comments', 10, 2);

// Remove Comments Page from Admin Menu
function codyogden_disable_comments_admin_menu() {
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'codyogden_disable_comments_admin_menu');

// Remove meta boxes for comments, reviews and trackbacks in post types
function codyogden_remove_comments_metabox_post_types() {
  $post_types = get_post_types();
  foreach ($post_types as $post_type) {
    remove_meta_box('commentsdiv', $post_type, 'normal');
    remove_meta_box('commentsstatusdiv', $post_type, 'normal');
    remove_meta_box('trackbacksdiv', $post_type, 'normal');
  }
}
add_action('add_meta_boxes', 'codyogden_remove_comments_metabox_post_types', 99);

// Remove Recent Comments Widget
function codyogden_remove_comments_widget() {
  unregister_widget('WP_Widget_Recent_Comments');
}
add_action('init', 'codyogden_remove_comments_widget');
