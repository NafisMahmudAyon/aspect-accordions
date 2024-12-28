<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$aspectAccordionsBlocksAccordionItem = $attributes['items'] ?? [];
$aspectAccordionsBlocksAccordionItemHeaderLabel = $aspectAccordionsBlocksAccordionItem['headerLabel'] ?? 'Accordion 1';
$aspectAccordionsBlocksAccordionItemContent = $aspectAccordionsBlocksAccordionItem['content'] ?? 'Content 1';
$aspectAccordionsBlocksAccordionItemIconEnabled = $aspectAccordionsBlocksAccordionItem['iconEnabled'] ?? true;
$aspectAccordionsBlocksAccordionItemIconPosition = $aspectAccordionsBlocksAccordionItem['iconPosition'] ?? 'right';
$aspectAccordionsBlocksAccordionItemIconClassName = $aspectAccordionsBlocksAccordionItem['iconClassName'] ?? 'size-6';
$aspectAccordionsBlocksAccordionItemActiveIconClassName = $aspectAccordionsBlocksAccordionItem['activeIconClassName'] ?? 'size-6';
$aspectAccordionsBlocksAccordionItemActiveIcon = $aspectAccordionsBlocksAccordionItem['activeIcon'] ?? '';
$aspectAccordionsBlocksAccordionItemActiveIconType = $aspectAccordionsBlocksAccordionItem['activeIconType'] ?? '';
$aspectAccordionsBlocksAccordionItemInactiveIcon = $aspectAccordionsBlocksAccordionItem['inactiveIcon'] ?? '';
$aspectAccordionsBlocksAccordionItemInactiveIconType = $aspectAccordionsBlocksAccordionItem['inactiveIconType'] ?? '';
$aspectAccordionsBlocksAccordionItemDisabled = $aspectAccordionsBlocksAccordionItem['disabled'] ?? false;
$aspectAccordionsBlocksAccordionItemHeaderClassName = $aspectAccordionsBlocksAccordionItem['headerClassName'] ?? '';
$aspectAccordionsBlocksAccordionItemLabelClassName = $aspectAccordionsBlocksAccordionItem['labelClassName'] ?? '';
$aspectAccordionsBlocksAccordionItemActiveLabelClassName = $aspectAccordionsBlocksAccordionItem['activeLabelClassName'] ?? '';
$aspectAccordionsBlocksAccordionItemActiveHeaderClassName = $aspectAccordionsBlocksAccordionItem['activeHeaderClassName'] ?? '';
$aspectAccordionsBlocksAccordionItemContentClassName = $aspectAccordionsBlocksAccordionItem['contentClassName'] ?? '';
$aspectAccordionsBlocksAccordionItemAccordionClassName = $aspectAccordionsBlocksAccordionItem['accordionClassName'] ?? '';

?>
<div class="aspect-accordions-block-accordion-item"
  data-accordion-item-options='<?php echo esc_attr(json_encode($aspectAccordionsBlocksAccordionItem)); ?>'
  data-accordion-item-content="<?php echo esc_attr($content); ?>">

  <div
    class="aspect-accordions-block-accordion-header <?php echo esc_attr($aspectAccordionsBlocksAccordionItemHeaderClassName); ?>">
    <span class="aspect-accordions-block-accordion-label">
      <?php echo esc_html($aspectAccordionsBlocksAccordionItemHeaderLabel); ?>
    </span>
    <?php if (!empty($aspectAccordionsBlocksAccordionItemIconEnabled)) : ?>
    <span class="aspect-accordions-block-accordion-icon">
      <i class="<?php echo esc_attr($aspectAccordionsBlocksAccordionItemIconClassName); ?>"></i>
    </span>
    <?php endif; ?>
  </div>

  <div
    class="aspect-accordions-block-accordion-content <?php echo esc_attr($aspectAccordionsBlocksAccordionItemContentClassName); ?>">
    <?php echo wp_kses_post($content); ?>
  </div>
</div>