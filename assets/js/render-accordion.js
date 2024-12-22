import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React from "react";
import ReactDOM from "react-dom";
import IconSelector from "@icons/IconSelector";

document.addEventListener("DOMContentLoaded", () => {
	const accordions = document.querySelectorAll(".aspect-accordion");

	accordions.forEach((container) => {
		const dataElement = container.querySelector(".aspect-accordion-data");
		console.log(dataElement);
		if (!dataElement) return;

		try {
			const accordionData = JSON.parse(dataElement.textContent);
			console.log(accordionData);

			let activeItems = [];
			if (accordionData?.global?.activeItems?.length > 0) {
				for (let i = 0; i < accordionData?.global?.activeItems?.length; i++) {
					activeItems.push(`item-${accordionData?.global?.activeItems[i] + 1}`);
				}
			} else {
				activeItems = [];
			}

			ReactDOM.render(
				<Accordion
					activeItem={activeItems}
					iconEnabled={accordionData?.global?.iconEnabled ?? true}
					iconPosition={accordionData.global?.iconPosition}
					className={accordionData.global?.accordionClassName}
					reset={true}>
					{accordionData.items.map((item, index) => (
						<AccordionItem
							key={index}
							id={`item-${index + 1}`}
							disabled={item?.disabled}>
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
											iconType={accordionData?.global?.activeIconType}
											iconName={accordionData?.global?.activeIcon}
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
											iconType={accordionData?.global?.inactiveIconType}
											iconName={accordionData?.global?.inactiveIcon}
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
					))}
				</Accordion>,
				container
			);
		} catch (error) {
			console.error("Failed to render accordion:", error);
		}
	});
});
