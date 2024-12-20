<?php
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
  <h1><?php echo esc_html__('Aspect Accordions Settings', 'aspect-accordions'); ?></h1>
  <form method="post" action="options.php">
    <?php
        settings_fields('aspect_accordions_settings');
        do_settings_sections('aspect_accordions_settings');
        submit_button();
        ?>
  </form>
</div>