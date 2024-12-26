<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$aspectBlocksAccordion = $attributes['accordion'] ?? [];
$aspectBlocksAccordionClass = $aspectBlocksAccordion['class'] ?? '';
$aspectBlocksAccordionTag = $aspectBlocksAccordion['tag'] ?? '';
$aspectBlocksAccordionId = $aspectBlocksAccordion['id'] ?? '';
$aspectBlocksAccordionIsMultiple = $aspectBlocksAccordion['multiple'] ?? 'false';

?>
<<?php echo esc_html($aspectBlocksAccordionTag); ?>
  class="aspect-blocks aspect-blocks-accordion <?php echo esc_attr($aspectBlocksAccordionClass); ?>"
  id="<?php echo esc_attr($aspectBlocksAccordionId); ?>"
  data-multiple="<?php echo esc_attr($aspectBlocksAccordionIsMultiple); ?>">
  <?php echo wp_kses_post($content); ?>
</<?php echo esc_html($aspectBlocksAccordionTag); ?>>