<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly


// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$aspectAccordionsBlocksPostID = $block->context["postId"] ??  "";
$aspectAccordionsBlocksAccordion = $attributes['globalOptions'] ?? [];
$aspectAccordionsBlocksAccordionActiveItems = $aspectAccordionsBlocksAccordion['activeItems'] ?? [];
$aspectAccordionsBlocksAccordionIsMultiple = $aspectAccordionsBlocksAccordion['multiple'] ?? 'false';
$aspectAccordionsBlocksAccordionIconEnabled = $aspectAccordionsBlocksAccordion['iconEnabled'] ?? 'true';
$aspectAccordionsBlocksAccordionIconPosition = $aspectAccordionsBlocksAccordion['iconPosition'] ?? 'right';
$aspectAccordionsBlocksAccordionActiveIcon = $aspectAccordionsBlocksAccordion['activeIcon'] ?? 'chevron-down-icon';
$aspectAccordionsBlocksAccordionActiveIconType = $aspectAccordionsBlocksAccordion['activeIconType'] ?? 'outline';
$aspectAccordionsBlocksAccordionInactiveIcon = $aspectAccordionsBlocksAccordion['inactiveIcon'] ?? 'chevron-up-icon';
$aspectAccordionsBlocksAccordionInactiveIconType = $aspectAccordionsBlocksAccordion['inactiveIconType'] ?? 'outline';
$aspectAccordionsBlocksAccordionActiveIconClassName = $aspectAccordionsBlocksAccordion['activeIconClassName'] ?? 'size-6';
$aspectAccordionsBlocksAccordionInactiveIconClassName = $aspectAccordionsBlocksAccordion['inactiveIconClassName'] ?? 'size-6';
$aspectAccordionsBlocksAccordionLabelClassName = $aspectAccordionsBlocksAccordion['labelClassName'] ?? '';
$aspectAccordionsBlocksAccordionActiveLabelClassName = $aspectAccordionsBlocksAccordion['activeLabelClassName'] ?? '';
$aspectAccordionsBlocksAccordionHeaderClassName = $aspectAccordionsBlocksAccordion['headerClassName'] ?? '';
$aspectAccordionsBlocksAccordionActiveHeaderClassName = $aspectAccordionsBlocksAccordion['activeHeaderClassName'] ?? '';
$aspectAccordionsBlocksAccordionContentClassName = $aspectAccordionsBlocksAccordion['contentClassName'] ?? '';
$aspectAccordionsBlocksAccordionClassName = $aspectAccordionsBlocksAccordion['accordionClassName'] ?? '';

?>
<div id="aspect-accordion-<?php echo esc_attr($aspectAccordionsBlocksPostID); ?>"
  class="aspect-accordions-block-accordion"
  data-accordion-global-options='<?php echo json_encode($aspectAccordionsBlocksAccordion); ?>'>
  <!-- <div class="aspect-accordion-wrapper"> -->
  <?php echo wp_kses_post($content); ?>
  <!-- </div> -->
</div>