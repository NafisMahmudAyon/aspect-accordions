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
        require_once aspect_accordions_plugin_dir . 'includes/functions.php';
        require_once aspect_accordions_plugin_dir . 'includes/menu/all-menu.php';
    }
}

// Initialize the plugin
new AspectAccordions();