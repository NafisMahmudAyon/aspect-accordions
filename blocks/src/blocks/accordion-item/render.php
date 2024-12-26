<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$aspectBlocksAccordionItem = $attributes['accordionItem'] ?? [];
$aspectBlocksAccordionItemClassName = $aspectBlocksAccordionItem['class'] ?? '';
$aspectBlocksAccordionItemHeaderClassName = $aspectBlocksAccordionItem['accordionHeaderClass'] ?? '';
$aspectBlocksAccordionItemHeaderTitleClassName = $aspectBlocksAccordionItem['accordionHeaderTitleClass'] ?? '';
$aspectBlocksAccordionItemContentClassName = $aspectBlocksAccordionItem['accordionContentClass'] ?? '';
$aspectBlocksAccordionItemIconClassName = $aspectBlocksAccordionItem['accordionIconClass'] ?? '';
$aspectBlocksAccordionItemTag = $aspectBlocksAccordionItem['tag'] ?? 'div';
$aspectBlocksAccordionItemHeaderTag = $aspectBlocksAccordionItem['headerTag'] ?? 'div';
$aspectBlocksAccordionItemContentTag = $aspectBlocksAccordionItem['contentTag'] ?? 'div';
$aspectBlocksAccordionItemHeaderTitle = $aspectBlocksAccordionItem['headerTitle'] ?? 'Accordion Item Header';
$aspectBlocksAccordionItemId = $aspectBlocksAccordionItem['id'] ?? '';
$aspectBlocksAccordionItemOpen = $aspectBlocksAccordionItem['open'] ?? 'false';
$aspectBlocksAccordionItemDisabled = $aspectBlocksAccordionItem['disabled'] ?? 'false';
$aspectBlocksAccordionItemOpenIcon = $aspectBlocksAccordionItem['openIcon'] ?? '';
$aspectBlocksAccordionItemCloseIcon = $aspectBlocksAccordionItem['closeIcon'] ?? '';
$aspectBlocksAccordionItemOpenIconType = $aspectBlocksAccordionItem['openIconType'] ?? 'solid';
$aspectBlocksAccordionItemCloseIconType = $aspectBlocksAccordionItem['closeIconType'] ?? 'solid';

?>
<<?php echo esc_html($aspectBlocksAccordionItemTag); ?>
  class="aspect-blocks aspect-blocks-accordion-item <?php echo esc_attr($aspectBlocksAccordionItemClassName); ?><?php echo $aspectBlocksAccordionItemDisabled === true ? ' disabled' : ''; ?>"
  id="<?php echo esc_attr($aspectBlocksAccordionItemId); ?>"
  <?php if ($aspectBlocksAccordionItemDisabled === true) { ?>disabled="true" <?php } ?>
  data-open="<?php echo esc_attr($aspectBlocksAccordionItemOpen); ?>"
  data-disabled="<?php echo esc_attr($aspectBlocksAccordionItemDisabled); ?>">

  <<?php echo esc_html($aspectBlocksAccordionItemHeaderTag); ?>
    class="aspect-blocks-accordion-header <?php echo esc_attr($aspectBlocksAccordionItemHeaderClassName); ?>">
    <span
      class="aspect-blocks-accordion-header-title <?php echo esc_attr($aspectBlocksAccordionItemHeaderTitleClassName); ?>"><?php echo wp_kses_post($aspectBlocksAccordionItemHeaderTitle); ?>
    </span>
    <span class="aspect-blocks-accordion-icon <?php echo esc_attr($aspectBlocksAccordionItemIconClassName); ?>"
      data-open-icon="<?php echo esc_attr($aspectBlocksAccordionItemOpenIcon); ?>"
      data-close-icon="<?php echo esc_attr($aspectBlocksAccordionItemCloseIcon); ?>"
      data-open-icon-type="<?php echo esc_attr($aspectBlocksAccordionItemOpenIconType); ?>"
      data-close-icon-type="<?php echo esc_attr($aspectBlocksAccordionItemCloseIconType); ?>">
    </span>
  </<?php echo esc_html($aspectBlocksAccordionItemHeaderTag); ?>>
  <<?php echo esc_html($aspectBlocksAccordionItemContentTag); ?>
    class="aspect-blocks-accordion-content <?php echo esc_attr($aspectBlocksAccordionItemContentClassName); ?>">
    <?php echo wp_kses_post($content); ?>
  </<?php echo esc_html($aspectBlocksAccordionItemContentTag); ?>>
</<?php echo esc_html($aspectBlocksAccordionItemTag); ?>>