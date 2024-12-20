<?php

if (!defined('ABSPATH')) exit;  // if direct access 

class aspect_accordions_post_types{
  public function __construct(){
    add_action('init', [$this, 'create_post_type'], 0);
		add_action('admin_init', [$this, 'add_capability']);
  }

	public function add_capability()
{
    $accordions_settings = get_option('aspect_accordions_settings');
    $user_roles = $accordions_settings['user_roles'] ?? ["administrator"];
    $wp_roles = new WP_Roles();
    $roles = $wp_roles->get_names();
		var_dump($user_roles);
		var_dump($roles);

    if (!empty($roles)) {
        foreach ($roles as $index => $user_role) {
            $role = get_role($index);
            
            // Remove old capabilities
            $role->remove_cap('publish_aspect_accordions');
            $role->remove_cap('edit_aspect_accordions');
            $role->remove_cap('edit_others_aspect_accordions');
            $role->remove_cap('read_private_aspect_accordions');
            $role->remove_cap('delete_aspect_accordions');
            $role->remove_cap('delete_private_aspect_accordions');
            $role->remove_cap('delete_published_aspect_accordions');
            $role->remove_cap('delete_others_aspect_accordions');
            $role->remove_cap('edit_private_aspect_accordions');
            $role->remove_cap('edit_published_aspect_accordions');
        }
    }

    if (!empty($user_roles)) {
        foreach ($user_roles as $user_role) {
            $role = get_role($user_role);
            
            // Add new capabilities matching register_post_type
            $role->add_cap('publish_aspect_accordions');
            $role->add_cap('edit_aspect_accordions');
            $role->add_cap('edit_others_aspect_accordions');
            $role->add_cap('read_private_aspect_accordions');
            $role->add_cap('delete_aspect_accordions');
            $role->add_cap('delete_private_aspect_accordions');
            $role->add_cap('delete_published_aspect_accordions');
            $role->add_cap('delete_others_aspect_accordions');
            $role->add_cap('edit_private_aspect_accordions');
            $role->add_cap('edit_published_aspect_accordions');
        }
    }
}


  public function create_post_type(){
    
    if (post_type_exists("aspect_accordions"))
			return;

		$singular  = __('Aspect Accordions', 'aspect-accordions');
		$plural    = __('Aspect Accordions', 'aspect-accordions');

		$accordions_settings = get_option('aspect_accordions_settings');
		$accordions_preview =  $accordions_settings['aspect_accordions_preview'] ?? 'yes';


		register_post_type(
    "aspect_accordions",
    apply_filters("aspect_accordions_posttype", [
        'labels' => [
            'name'                  => $plural,
            'singular_name'         => $singular,
            'menu_name'             => $singular,
            'all_items'             => sprintf(__('All %s', 'aspect-accordions'), $plural),
            'add_new'               => __('Add New', 'aspect-accordions'),
            'add_new_item'          => sprintf(__('Add %s', 'aspect-accordions'), $singular),
            'edit'                  => __('Edit', 'aspect-accordions'),
            'edit_item'             => sprintf(__('Edit %s', 'aspect-accordions'), $singular),
            'new_item'              => sprintf(__('New %s', 'aspect-accordions'), $singular),
            'view'                  => sprintf(__('View %s', 'aspect-accordions'), $singular),
            'view_item'             => sprintf(__('View %s', 'aspect-accordions'), $singular),
            'search_items'          => sprintf(__('Search %s', 'aspect-accordions'), $plural),
            'not_found'             => sprintf(__('No %s found', 'aspect-accordions'), $plural),
            'not_found_in_trash'    => sprintf(__('No %s found in trash', 'aspect-accordions'), $plural),
            'parent'                => sprintf(__('Parent %s', 'aspect-accordions'), $singular),
        ],
        'description' => sprintf(__('This is where you can create and manage %s.', 'aspect-accordions'), $plural),
        'public'                => false,
        'show_ui'               => true,
        'capability_type'       => 'aspect_accordions',
        'capabilities'          => [
            'publish_posts'         => 'publish_aspect_accordions',
            'edit_posts'            => 'edit_aspect_accordions',
            'edit_others_posts'     => 'edit_others_aspect_accordions',
            'read_private_posts'    => 'read_private_aspect_accordions',
            'edit_post'             => 'edit_aspect_accordions',
            'delete_post'           => 'delete_aspect_accordions',
            'read_post'             => 'read_aspect_accordions',
            'delete_posts'          => 'delete_aspect_accordions',
            'delete_private_posts'  => 'delete_private_aspect_accordions',
            'delete_published_posts'=> 'delete_published_aspect_accordions',
            'delete_others_posts'   => 'delete_others_aspect_accordions',
            'edit_private_posts'    => 'edit_private_aspect_accordions',
            'edit_published_posts'  => 'edit_published_aspect_accordions',
        ],
        'map_meta_cap'          => false,
        'publicly_queryable'    => ($accordions_preview == 'yes') ? true : false,
        'exclude_from_search'   => false,
        'hierarchical'          => false,
        'rewrite'               => true,
        'query_var'             => true,
        'supports'              => array('title', 'editor', 'revisions'),
        'show_in_nav_menus'     => true,
        'show_in_menu'          => false, // Disable default menu
        'menu_icon'             => 'dashicons-align-center',
    ])
);

  }
}

new aspect_accordions_post_types();