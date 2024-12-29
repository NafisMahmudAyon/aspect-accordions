import React from "react";
import { createRoot } from "react-dom/client";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "aspect-ui/Accordion";
import IconSelector from "../../components/icons/IconSelector";

document.addEventListener("DOMContentLoaded", () => {
	const accordionContainers = document.querySelectorAll(
		".aspect-accordions-block-accordion"
	);

	accordionContainers.forEach((container) => {
		const globalOptions = container.dataset.accordionGlobalOptions
			? JSON.parse(container.dataset.accordionGlobalOptions)
			: {};
			console.log(globalOptions)
		const accordionItems = Array.from(
			container.querySelectorAll(".aspect-accordions-block-accordion-item")
		);
			// console.log(accordionItems);
			const root = createRoot(container);
		try{
			root.render(
				<Accordion
					activeItem={globalOptions.activeItems}
					multiple={
						globalOptions.multiple === "true" || globalOptions.multiple === "1"
					}
					iconEnabled={
						globalOptions.iconEnabled === "true" ||
						globalOptions.iconEnabled === "1"
					}
					iconPosition={globalOptions.iconPosition}
					activeIcon={
						globalOptions.activeIcon ? (
							<IconSelector
								iconType={globalOptions.activeIconType}
								iconName={globalOptions.activeIcon}
							/>
						) : null
					}
					inactiveIcon={
						globalOptions.inactiveIcon ? (
							<IconSelector
								iconType={globalOptions.inactiveIconType}
								iconName={globalOptions.inactiveIcon}
							/>
						) : null
					}
					activeIconClassName={globalOptions.activeIconClassName}
					iconClassName={globalOptions.inactiveIconClassName}
					labelClassName={globalOptions.labelClassName}
					activeLabelClassName={globalOptions.activeLabelClassName}
					headerClassName={globalOptions.headerClassName}
					activeHeaderClassName={globalOptions.activeHeaderClassName}
					contentClassName={globalOptions.contentClassName}>
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
									{...(itemData.iconEnabled && {
										iconEnabled: itemData.iconEnabled,
									})}
									{...(itemData.iconPosition && {
										iconPosition: itemData.iconPosition,
									})}
									{...(itemData.iconClassName && {
										iconClassName: itemData.iconClassName,
									})}
									{...(itemData.activeIconClassName && {
										activeIconClassName: itemData.activeIconClassName,
									})}
									{...(itemData.activeIcon && {
										activeIcon: (
											<IconSelector
												iconType={itemData.activeIconType}
												iconName={itemData.activeIcon}
											/>
										),
									})}
									{...(itemData.inactiveIcon && {
										inactiveIcon: (
											<IconSelector
												iconType={itemData.inactiveIconType}
												iconName={itemData.inactiveIcon}
											/>
										),
									})}>
									{itemData.headerLabel}
								</AccordionHeader>

								<AccordionContent
									dangerouslySetInnerHTML={{
										__html: content,
									}}></AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			);
		}
		catch (error) {
			console.error("Accordion rendering failed:", error);
		}
});









});