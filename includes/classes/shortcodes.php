<?php

if (!defined('ABSPATH')) exit; // Prevent direct access

class aspect_accordions_shortcodes {
    public function __construct() {
        // Register the shortcode
        add_shortcode('aspect_accordions', [$this, 'aspect_accordions_shortcode']);
    }

    public function aspect_accordions_shortcode($atts) {
        // Extract attributes and get the post ID
        $atts = shortcode_atts([
            'id' => null,
        ], $atts, 'aspect_accordions');

        $post_id = intval($atts['id']);

        // Check if a valid post ID is provided
        if (!$post_id || get_post_type($post_id) !== 'aspect_accordions') {
            return '<p>Invalid accordion ID.</p>';
        }

        // Get the post content (stored as JSON)
        $post = get_post($post_id);
        if (!$post || !$post->post_content) {
            return '<p>Accordion not found or empty.</p>';
        }

        // Decode the JSON content
        $accordion_data = json_decode($post->post_content, true);
        if (json_last_error() !== JSON_ERROR_NONE || empty($accordion_data)) {
            return '<p>Invalid accordion data.</p>';
        }

        // Prepare the HTML output
        ob_start();
        ?>
<div id="aspect-accordion-<?php echo esc_attr($post_id); ?>" class="aspect-accordion">
  <script type="application/json" class="aspect-accordion-data">
  <?php echo wp_json_encode($accordion_data); ?>
  </script>
</div>
<?php
        return ob_get_clean();
    }
}

// Initialize the shortcode class
new aspect_accordions_shortcodes();