import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React from "react";
import IconSelector from "./icons/IconSelector";

const AccordionPreview = ({ globalOptions, items, className }) => {
	// Determine active items based on global options
	const activeItems =
		globalOptions?.activeItems?.map((index) => `item-${index + 1}`) || [];

		console.log(globalOptions.activeIcon, items[0].activeIcon);

	return (
		<div className={`accordion-preview ${className}`}>
			<h3>Accordion Preview</h3>
			<Accordion
				activeItem={activeItems}
				iconEnabled={globalOptions.iconEnabled}
				iconPosition={globalOptions.iconPosition}
				className={globalOptions.accordionClassName}>
				{items.map((item, index) => {
					

					return (
						<AccordionItem
							key={index}
							id={`item-${index + 1}`}
							disabled={item.disabled}>
							<AccordionHeader
								iconEnabled={item.iconEnabled}
								iconPosition={item.iconPosition}
								iconClassName={item.iconClassName}
								activeIconClassName={item.activeIconClassName}
								activeIcon={
									item.activeIcon ? (
										<IconSelector
											iconType={item.activeIconType}
											iconName={item.activeIcon}
										/>
									) : (
										<IconSelector
											iconType={globalOptions.activeIconType}
											iconName={globalOptions.activeIcon}
										/>
									)
								}
								inactiveIcon={
									item.inactiveIcon ? (
										<IconSelector
											iconType={item.inactiveIconType}
											iconName={item.inactiveIcon}
										/>
									) : (
										<IconSelector
											iconType={globalOptions.inactiveIconType}
											iconName={globalOptions.inactiveIcon}
										/>
									)
								}
								className={item.headerClassName}
								labelClassName={item.labelClassName}
								activeHeaderClassName={item.activeHeaderClassName}
								activeLabelClassName={item.activeLabelClassName}>
								{item.headerLabel}
							</AccordionHeader>
							<AccordionContent className={item.contentClassName}>
								{item.content}
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default AccordionPreview;
