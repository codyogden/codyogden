<?php

function codyogden_disable_feed() {
 die();
}

add_action('do_feed', 'codyogden_disable_feed', 1);
add_action('do_feed_rdf', 'codyogden_disable_feed', 1);
add_action('do_feed_rss', 'codyogden_disable_feed', 1);
add_action('do_feed_rss2', 'codyogden_disable_feed', 1);
add_action('do_feed_atom', 'codyogden_disable_feed', 1);
add_action('do_feed_rss2_comments', 'codyogden_disable_feed', 1);
add_action('do_feed_atom_comments', 'codyogden_disable_feed', 1);
