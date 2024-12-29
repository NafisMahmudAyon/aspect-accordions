<?php

if (!defined('ABSPATH')) exit;  // if direct access 

add_action('rest_api_init', function () {
    // Get all accordions
    register_rest_route('aspect-accordions/v2', '/list', [
        'methods' => 'GET',
        'callback' => 'aspect_get_accordions_by_status',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
    // register_rest_route('aspect-accordions/v2', '/list-draft', [
    //     'methods' => 'GET',
    //     'callback' => 'aspect_get_accordions_by_status',
    //     'permission_callback' => function () {
    //         return current_user_can('edit_posts');
    //     },
    // ]);
    // register_rest_route('aspect-accordions/v2', '/list-trash', [
    //     'methods' => 'GET',
    //     'callback' => 'aspect_get_accordions_by_status',
    //     'permission_callback' => function () {
    //         return current_user_can('edit_posts');
    //     },
    // ]);

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
    // Register the route for changing post status
    register_rest_route('aspect-accordions/v2', '/status/(?P<id>\d+)', [
        'methods' => 'POST',
        'callback' => 'aspect_change_accordion_status',
        'args' => [
            'id' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                },
            ],
            'status' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return in_array($param, ['publish', 'draft', 'trash']);
                },
            ],
        ],
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
});

// Get all accordions
// function aspect_get_accordions() {
//     $posts = get_posts([
//         'post_type' => 'aspect_accordions',
//         'post_status' => 'publish',
//         'numberposts' => -1,
//     ]);

//     return array_map(function ($post) {
//         return [
//             'id' => $post->ID,
//             'title' => $post->post_title,
//             'content' => $post->post_content,
//         ];
//     }, $posts);
// }

function aspect_get_accordions($request) {
    // Get pagination parameters
    $page = (int) $request->get_param('page') ?: 1;
    $per_page = (int) $request->get_param('per_page') ?: 10;

    // Query arguments
    $args = [
        'post_type' => 'aspect_accordions',
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
    ];

    // WP_Query for paginated posts
    $query = new WP_Query($args);

    // Prepare response
    $accordions = array_map(function ($post) {
        return [
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        ];
    }, $query->posts);

    // Add pagination info
    $response = [
        'accordions' => $accordions,
        'pagination' => [
            'total' => (int) $query->found_posts,
            'per_page' => $per_page,
            'current_page' => $page,
            'total_pages' => (int) $query->max_num_pages,
        ],
    ];

    return rest_ensure_response($response);
}

function aspect_get_accordions_by_status($request) {
    // Get parameters from the request
    $status = $request->get_param('status') ?: 'publish';
    $page = (int) $request->get_param('page') ?: 1;
    $per_page = (int) $request->get_param('per_page') ?: 10;

    // Query arguments based on status
    $args = [
        'post_type' => 'aspect_accordions',
        'post_status' => $status,
        'posts_per_page' => $per_page,
        'paged' => $page,
    ];

    // WP_Query for paginated posts
    $query = new WP_Query($args);

    // Prepare response
    $accordions = array_map(function ($post) {
        return [
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        ];
    }, $query->posts);

    // Add pagination info
    $response = [
        'accordions' => $accordions,
        'pagination' => [
            'total' => (int) $query->found_posts,
            'per_page' => $per_page,
            'current_page' => $page,
            'total_pages' => (int) $query->max_num_pages,
        ],
    ];

    return rest_ensure_response($response);
}
function aspect_get_draft_accordions() {
    $posts = get_posts([
        'post_type' => 'aspect_accordions',
        'post_status' => 'draft',
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
function aspect_get_trash_accordions() {
    $posts = get_posts([
        'post_type' => 'aspect_accordions',
        'post_status' => 'trash',
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

    // Validate required fields
    if (empty($params['title'])) {
        return new WP_Error('missing_title', 'The title field is required.', ['status' => 400]);
    }

    if (empty($params['content'])) {
        return new WP_Error('missing_content', 'The content field is required.', ['status' => 400]);
    }

    // Sanitize inputs
    $post_data = [
        'post_title'   => sanitize_text_field($params['title']),
        'post_content' => serialize(wp_kses_post($params['content'])),
        'post_status'  => sanitize_text_field($params['status']),
        'post_type'    => 'aspect_accordions',
    ];

    // Handle update or insert
    if (!empty($params['id'])) {
        $post_data['ID'] = intval($params['id']);
        $post_id = wp_update_post($post_data, true);
    } else {
        $post_id = wp_insert_post($post_data, true);
    }

    if (is_wp_error($post_id)) {
        return new WP_Error('save_failed', 'Failed to save accordion.', ['status' => 500]);
    }

    return [
        'message' => 'Accordion saved successfully.',
        'accordion' => get_post($post_id),
    ];
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

// Change the post status of an accordion
function aspect_change_accordion_status($request) {
    $id = intval($request['id']);
    $status = sanitize_text_field($request['status']);

    // Check if the status is valid
    $valid_statuses = ['publish', 'draft', 'trash'];
    if (!in_array($status, $valid_statuses)) {
        return new WP_Error('invalid_status', 'Invalid post status', ['status' => 400]);
    }

    // Check if the post is an accordion
    $post = get_post($id);
    if (!$post || $post->post_type !== 'aspect_accordions') {
        return new WP_Error('invalid_post', 'Invalid accordion ID', ['status' => 400]);
    }

    // Update the post status
    $updated_post = wp_update_post([
        'ID' => $id,
        'post_status' => $status,
    ], true);

    if (is_wp_error($updated_post)) {
        return new WP_Error('update_failed', 'Failed to update post status', ['status' => 500]);
    }

    return [
        'message' => 'Accordion status updated successfully',
        'id' => $id,
        'status' => $status,
    ];
}