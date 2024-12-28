import React from "react";
import { createRoot } from "react-dom/client";
import iconsListOutline from "../../components/icons/IconListOutline";
import iconsListSolid from "../../components/icons/IconListSolid";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "aspect-ui";

document.addEventListener("DOMContentLoaded", () => {
	const accordionContainers = document.querySelectorAll(
		".aspect-accordions-block-accordion"
	);

	
	// Map to store React roots for icon elements
	const iconRoots = new Map();
	
	const solidIconsMap = Object.fromEntries(
		iconsListSolid.map((item) => [item.name, item.icon])
	);
	const outlineIconsMap = Object.fromEntries(
		iconsListOutline.map((item) => [item.name, item.icon])
	);
	
	
	accordionContainers.forEach((container) => {
		const globalOptions = container.dataset.accordionGlobalOptions
			? JSON.parse(container.dataset.accordionGlobalOptions)
			: {};
		const accordionItems = Array.from(
			container.querySelectorAll(".aspect-accordions-block-accordion-item")
		);
			console.log(accordionItems);
			const root = createRoot(container);
		try{
			root.render(<Accordion
			// activeItems={globalOptions.activeItems}
			multiple={globalOptions.multiple === "true" || globalOptions.multiple === "1"}
			iconEnabled={globalOptions.iconEnabled === "true" || globalOptions.iconEnabled === "1"}
			// iconPosition={globalOptions.iconPosition}
			// activeIcon={globalOptions.activeIcon}
			// activeIconType={globalOptions.activeIconType}
			// inactiveIcon={globalOptions.inactiveIcon}
			// inactiveIconType={globalOptions.inactiveIconType}
			// activeIconClassName={globalOptions.activeIconClassName}
			// inactiveIconClassName={globalOptions.inactiveIconClassName}
			// labelClassName={globalOptions.labelClassName}
			// activeLabelClassName={globalOptions.activeLabelClassName}
			// headerClassName={globalOptions.headerClassName}
			// activeHeaderClassName={globalOptions.activeHeaderClassName}
			// contentClassName={globalOptions.contentClassName}
			// activeContentClassName={globalOptions.activeContentClassName}
			>
				{accordionItems.map((item, index) => {
					// console.log(item);
					const itemData = JSON.parse(item.dataset.accordionItemOptions);
					const content = item.dataset.accordionItemContent;
					console.log(content);
					return (
						<AccordionItem
							key={index}
							id={`item-${index + 1}`}
							disabled={itemData.disabled}>
							<AccordionHeader
								// iconEnabled={itemData.iconEnabled}
								// iconPosition={itemData.iconPosition}
								// iconClassName={itemData.iconClassName}
								// activeIconClassName={itemData.activeIconClassName}
								// activeIcon={itemData.activeIcon}
								// activeIconType={itemData.activeIconType}
								// inactiveIcon={itemData.inactiveIcon}
								// inactiveIconType={itemData.inactiveIconType}
								>
								{itemData.headerLabel}
							</AccordionHeader>
							<AccordionContent dangerouslySetInnerHTML={{ __html: content }}>
								 
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>);
		}
		catch (error) {
			console.error("Accordion rendering failed:", error);
		}
});






});