<?php

if (!defined('ABSPATH')) exit;  // if direct access 


add_action('rest_api_init', function () {
    register_rest_route('aspect-accordions/v2', '/list', [
        'methods' => 'GET',
        'callback' => 'aspect_get_accordions',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);

    register_rest_route('aspect-accordions/v2', '/save', [
        'methods' => 'POST',
        'callback' => 'aspect_save_accordion',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
});

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

function aspect_accordions_enqueue_tailwind_cdn(){
    wp_enqueue_script('tailwind-cdn', aspect_accordions_plugin_dir . '/assets/js/tailwind.js', [], '3.4.15', true);
    $aspect_accordions_tailwind_config = "tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: {
            '50': '#edf6f7',
            '100': '#cbe2e2',
            '200': '#a9cdcf',
            '300': '#87b8bc',
            '400': '#65a3a9',
            '500': '#438e96',
            '600': '#38757a',
            '700': '#2c5c60',
            '800': '#204346',
            '900': '#142a2c',
            '950': '#081112'
          },
        }
      }
    }
  };";

  wp_add_inline_script('tailwind-cdn', $aspect_accordions_tailwind_config);
}