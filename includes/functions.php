<?php

if (!defined('ABSPATH')) exit;  // if direct access 

// add_filter('block_categories_all', 'aspectAccordions_categories', 10, 2);

// function aspectAccordions_categories($categories, $context)
// {
//   if (!empty($categories)) {
//     $inserted = [
//       [
//         'slug' => 'aspect-accordions',
//         'title' => __('Aspect Accordions', 'aspect-accordions'),
//       ],
//       // array(
//       //   'slug' => 'aspect-blocks-tools',
//       //   'title' => __('Aspect Blocks - Tools', 'aspect-blocks'),
//       // ),
//       // array(
//       //   'slug' => 'aspect-blocks-woo',
//       //   'title' => __('Aspect Blocks - WooCommerce', 'aspect-blocks'),
//       // ),
//       // array(
//       //   'slug' => 'aspect-blocks-archive',
//       //   'title' => __('Aspect Blocks - Archive', 'aspect-blocks'),
//       // ),
//     ];
//     array_splice($categories, 3, 0, $inserted); // splice in at position 3
//     return $categories;
//   } else {
//     return $categories;
//   }
// }


add_filter( 'block_categories_all' , function( $categories ) {

    // Adding a new category.
	$categories[] = [
		'slug'  => 'aspect-accordions',
		'title' => __('Aspect Accordions', 'aspect-accordions'),
	];

	return $categories;
} );

