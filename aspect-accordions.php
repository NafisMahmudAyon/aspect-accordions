<?php
/*
Plugin Name: Aspect Accordions
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

        add_action('wp_enqueue_scripts', [$this, 'aspect_accordions_enqueue_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'aspect_accordions_enqueue_tailwind_cdn']);
        add_action('enqueue_block_editor_assets', [$this, 'aspect_accordions_enqueue_tailwind_cdn']);
        add_action('wp_enqueue_scripts', [$this, 'aspect_accordions_enqueue_styles']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    public function aspect_accordions_enqueue_scripts()
    {
        wp_enqueue_script(
            'aspect-accordions-render',
            plugins_url('/assets/js/render-accordion.bundle.js', __FILE__),
            ['react', 'react-dom', 'wp-element'],
            '1.0.0',
            true
        );

        add_filter('script_loader_tag', function ($tag, $handle, $src) {
            if ($handle === 'aspect-accordions-render') {
                return '<script type="module" src="' . esc_url($src) . '"></script>';
            }
            return $tag;
        }, 10, 3);
    }

    public function aspect_accordions_enqueue_tailwind_cdn()
    {
        wp_enqueue_script(
            'tailwind-cdn',
            plugins_url('/assets/js/tailwind.js', __FILE__),
            [],
            '3.4.15',
            true
        );

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

    public function aspect_accordions_enqueue_styles()
    {
        wp_enqueue_style(
            'aspect-accordions-style',
            plugins_url('/dist/output.css', __FILE__),
            [],
            '1.0.0'
        );
    }

    public function enqueue_admin_scripts($hook_suffix)
    {
        // Load scripts only on the Aspect Accordions admin page
        if ($hook_suffix === 'toplevel_page_aspect-accordions') {
            $this->aspect_accordions_enqueue_tailwind_cdn();
            $this->aspect_accordions_enqueue_styles();
        }
    }
}

// Initialize the plugin
new AspectAccordions();