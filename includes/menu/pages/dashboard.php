<?php
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
  <h1><?php echo esc_html__('Create Accordion', 'aspect-accordions'); ?></h1>
  <div class="wrap">
    <a href="<?php echo esc_url(admin_url('post-new.php?post_type=aspect_accordions')); ?>" class="page-title-action">
      <?php echo esc_html__('Add New Accordion', 'aspect-accordions'); ?>
    </a>

  </div>
  <div id="aspect-accordions-app"></div>
</div>

<?php
// Enqueue React and our custom scripts
wp_enqueue_script('aspect-accordions-react', aspect_accordions_plugin_url . 'build/index.js', ['wp-element', 'wp-api', 'wp-components'], aspect_accordions_version, true);


// add_filter('script_loader_tag', function ($tag, $handle, $src) {
//     if ('aspect-accordions-react' === $handle) {
//         $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
//     }
//     return $tag;
// }, 10, 3);

// Localize script with necessary data
wp_localize_script('aspect-accordions-react', 'aspectAccordionsData', [
    'nonce' => wp_create_nonce('wp_rest'),
    'apiUrl' => rest_url('aspect-accordions/v2'),
    'pluginUrl' => aspect_accordions_plugin_url,
]);
?>