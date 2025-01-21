<?php
if (!defined('ABSPATH')) exit; // Prevent direct access

class AspectAccordionsMenu {
    public function __construct() {
        add_action('admin_menu', [$this, 'register_menus'], 12);
    }

    public function register_menus() {
        // Add the main menu
        add_menu_page(
            __('Aspect Accordions', 'aspect-accordions'),
            __('Aspect Accordions', 'aspect-accordions'),
            'manage_options',
            'aspect-accordions',
            [$this, 'dashboard_page'],
            'dashicons-align-center',
            25
        );

        // Add the Dashboard submenu
        add_submenu_page(
            'aspect-accordions',
            __('Dashboard', 'aspect-accordions'),
            __('Dashboard', 'aspect-accordions'),
            'manage_options',
            'aspect-accordions',
            [$this, 'dashboard_page']
        );

        // Add the All Accordions submenu
        // add_submenu_page(
        //     'aspect-accordions',
        //     __('All Accordions', 'aspect-accordions'),
        //     __('All Accordions', 'aspect-accordions'),
        //     'manage_options',
        //     'edit.php?post_type=aspect_accordions',
        //     null
        // );

        // Add the Add New Accordion submenu
        // add_submenu_page(
        //     'aspect-accordions',
        //     __('Add New Accordion', 'aspect-accordions'),
        //     __('Add New', 'aspect-accordions'),
        //     'manage_options',
        //     'post-new.php?post_type=aspect_accordions',
        //     null
        // );

        // Add the Settings submenu
        // add_submenu_page(
        //     'aspect-accordions',
        //     __('Settings', 'aspect-accordions'),
        //     __('Settings', 'aspect-accordions'),
        //     'manage_options',
        //     'aspect-accordions-settings',
        //     [$this, 'settings_page']
        // );
    }

    public function dashboard_page() {
        include_once aspect_accordions_plugin_dir . 'includes/menu/pages/dashboard.php';
    }

    // public function settings_page() {
    //     include_once aspect_accordions_plugin_dir . 'includes/menu/pages/settings.php';
    // }
}

new AspectAccordionsMenu();