<?php

if (!defined('ABSPATH')) exit;  // if direct access 

add_action('rest_api_init', function () {
    // Get all accordions
    register_rest_route('aspect-accordions/v2', '/list', [
        'methods' => 'GET',
        'callback' => 'aspect_get_accordions',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);

    // Save accordion (create/update)
    register_rest_route('aspect-accordions/v2', '/save', [
        'methods' => 'POST',
        'callback' => 'aspect_save_accordion',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);

    // Delete accordion
    register_rest_route('aspect-accordions/v2', '/delete/(?P<id>\d+)', [
        'methods' => 'DELETE',
        'callback' => 'aspect_delete_accordion',
        'args' => [
            'id' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                },
            ],
        ],
        'permission_callback' => function () {
            return current_user_can('delete_posts');
        },
    ]);

    // Duplicate accordion
    register_rest_route('aspect-accordions/v2', '/duplicate/(?P<id>\d+)', [
        'methods' => 'POST',
        'callback' => 'aspect_duplicate_accordion',
        'args' => [
            'id' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                },
            ],
        ],
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);

    // Quick view accordion
    register_rest_route('aspect-accordions/v2', '/view/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'aspect_quick_view_accordion',
        'args' => [
            'id' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                },
            ],
        ],
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
});

// Get all accordions
function aspect_get_accordions() {
    $posts = get_posts([
        'post_type' => 'aspect_accordions',
        'post_status' => 'publish',
        'numberposts' => -1,
    ]);

    return array_map(function ($post) {
        return [
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        ];
    }, $posts);
}

// Save (create/update) accordion
function aspect_save_accordion($request) {
    $params = $request->get_json_params();

    $post_data = [
        'post_title'   => sanitize_text_field($params['title']),
        'post_content' => wp_kses_post($params['content']),
        'post_status'  => 'publish',
        'post_type'    => 'aspect_accordions',
    ];

    if (!empty($params['id'])) {
        $post_data['ID'] = intval($params['id']);
        $post_id = wp_update_post($post_data, true);
    } else {
        $post_id = wp_insert_post($post_data, true);
    }

    if (is_wp_error($post_id)) {
        return new WP_Error('save_failed', 'Failed to save accordion', ['status' => 500]);
    }

    return get_post($post_id);
}

// Delete accordion
function aspect_delete_accordion($request) {
    $id = intval($request['id']);

    if (get_post_type($id) !== 'aspect_accordions') {
        return new WP_Error('invalid_post_type', 'Invalid accordion ID', ['status' => 400]);
    }

    $deleted = wp_delete_post($id, true);
    if (!$deleted) {
        return new WP_Error('delete_failed', 'Failed to delete accordion', ['status' => 500]);
    }

    return ['message' => 'Accordion deleted successfully'];
}

// Duplicate accordion
function aspect_duplicate_accordion($request) {
    $id = intval($request['id']);
    $post = get_post($id);

    if (!$post || $post->post_type !== 'aspect_accordions') {
        return new WP_Error('invalid_post', 'Invalid accordion ID', ['status' => 400]);
    }

    $new_post_data = [
        'post_title'   => $post->post_title . ' (Copy)',
        'post_content' => $post->post_content,
        'post_status'  => 'publish',
        'post_type'    => 'aspect_accordions',
    ];

    $new_post_id = wp_insert_post($new_post_data, true);
    if (is_wp_error($new_post_id)) {
        return new WP_Error('duplicate_failed', 'Failed to duplicate accordion', ['status' => 500]);
    }

    return get_post($new_post_id);
}

// Quick view accordion
function aspect_quick_view_accordion($request) {
    $id = intval($request['id']);
    $post = get_post($id);

    if (!$post || $post->post_type !== 'aspect_accordions') {
        return new WP_Error('invalid_post', 'Invalid accordion ID', ['status' => 400]);
    }

    return [
        'id' => $post->ID,
        'title' => $post->post_title,
        'content' => $post->post_content,
    ];
}