<?php
/*
Plugin Name: Aspect Accordions - With Tailwind
Plugin URI: https://nafisbd.com
Description: Fully responsive and mobile ready accordion plugin for WordPress.
Version: 0.0.1
Author: nafismahmudayon
Author URI: http://nafisbd.com
Text Domain: aspect-accordions
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) exit;  // Prevent direct access

class AspectAccordions
{
    public function __construct()
    {
        // Define constants
        define('aspect_accordions_plugin_url', plugins_url('/', __FILE__));
        define('aspect_accordions_plugin_dir', plugin_dir_path(__FILE__));
        define('aspect_accordions_version', '0.0.1');
        define('aspect_accordions_plugin_name', 'Aspect Accordions');
        define('aspect_accordions_plugin_basename', plugin_basename(__FILE__));

        // Include required files
        require_once aspect_accordions_plugin_dir . 'includes/classes/post-types.php';
        require_once aspect_accordions_plugin_dir . 'includes/classes/shortcodes.php';
        require_once aspect_accordions_plugin_dir . 'includes/functions.php';
        require_once aspect_accordions_plugin_dir . 'includes/functions-rest.php';
        require_once aspect_accordions_plugin_dir . 'includes/menu/all-menu.php';

        // Enqueue actions
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);

        add_action('enqueue_block_assets', [$this, 'enqueue_tailwind_cdn']);

        add_action('admin_init', [$this, 'suppress_notices_on_custom_page']);

        // add_action('init', [$this, 'aspectAccordions_register_blocks']);
    }

    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_frontend_assets()
    {
        // Ensure the Tailwind CDN is enqueued
        $this->enqueue_tailwind_cdn();

        // Enqueue Render Script
        wp_enqueue_script(
            'aspect-accordions-render',
            plugins_url('/assets/js/build/shortcode.bundle.js', __FILE__),
            ['react', 'react-dom', 'wp-element'], // Dependencies
            aspect_accordions_version,
            true
        );

        // wp_enqueue_style(
        //         'aspect-accordions-admin-style',
        //         plugins_url('/build/index.css', __FILE__),
        //         [],
        //         aspect_accordions_version
        //     );

        // Enqueue Styles
        // wp_enqueue_style(
        //     'aspect-accordions-style',
        //     plugins_url('/dist/output.css', __FILE__),
        //     [],
        //     aspect_accordions_version
        // );
    }

    /**
     * Enqueue admin scripts and styles for the Aspect Accordions admin page
     */
    public function enqueue_admin_assets($hook_suffix)
    {
        // Load assets only on the Aspect Accordions admin page
        if ($hook_suffix === 'toplevel_page_aspect-accordions') {
            $this->enqueue_tailwind_cdn();

            // Enqueue Admin Styles
            wp_enqueue_style(
                'aspect-accordions-admin-style',
                plugins_url('/build/index.css', __FILE__),
                [],
                aspect_accordions_version
            );
        }
    }

    /**
     * Enqueue Tailwind CDN and its inline configuration
     */
    public function enqueue_tailwind_cdn()
    {

        wp_enqueue_script(
            'tailwind-cdn',
            plugins_url('/assets/js/tailwind.js', __FILE__),
            [],
            '3.4.15',
            true
        );

        $tailwind_config = "tailwind.config = {
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

        wp_add_inline_script('tailwind-cdn', $tailwind_config);
    }

    public function aspectAccordions_register_blocks()
{
    register_block_type(__DIR__ . '/build/blocks/accordion');
    register_block_type(__DIR__ . '/build/blocks/accordion-item');
}

public function suppress_notices_on_custom_page() {
    // Check if we are on the custom dashboard page
    if (isset($_GET['page']) && $_GET['page'] === 'aspect-accordions') { // Adjust the page slug
        remove_all_actions('admin_notices');
    }
}


}

// Initialize the plugin
new AspectAccordions();