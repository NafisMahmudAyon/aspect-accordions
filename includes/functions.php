<?php

if (!defined('ABSPATH')) exit;  // if direct access 



add_action('rest_api_init', function () {
    register_rest_route('aspect-accordions/v2', '/save', [
        'methods'  => 'POST',
        'callback' => 'aspect_save_accordion',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
});

function aspect_save_accordion($request) {
    $params = $request->get_json_params();

    $title = sanitize_text_field($params['title'] ?? 'Untitled Accordion');
    $content = wp_kses_post($params['content'] ?? '');

    if (empty($content)) {
        return new WP_Error('invalid_data', 'Content cannot be empty', ['status' => 400]);
    }

    $post_id = wp_insert_post([
        'post_title'   => $title,
        'post_content' => $content,
        'post_type'    => 'aspect_accordions',
        'post_status'  => $params['status'] ?? 'draft',
    ]);

    if (is_wp_error($post_id)) {
        return new WP_Error('insert_failed', 'Failed to save accordion', ['status' => 500]);
    }

    return rest_ensure_response(['success' => true, 'post_id' => $post_id]);
}