import RichTextViewer from "@components/RichTextViewer";
import IconSelector from "@icons/IconSelector";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React from "react";
import ReactDOM from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
	const accordions = document.querySelectorAll(".aspect-accordion");

	accordions.forEach((container) => {
		try {
			const dataElement = container.querySelector(".aspect-accordion-data");
			if (!dataElement) return;

			// Parse accordionData from the JSON inside .aspect-accordion-data
			const accordionData = JSON.parse(dataElement.textContent);

			ReactDOM.render(
				<Accordion
					activeItem={accordionData?.global?.activeItems?.map(
						(index) => `item-${index + 1}`
					)}
					iconEnabled={accordionData?.global?.iconEnabled ?? true}
					iconPosition={accordionData.global?.iconPosition}
					className={accordionData.global?.accordionClassName}
					multiple={accordionData?.global?.multiple ?? false}
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
								<RichTextViewer savedContent={item.content} />
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>,
				container
			);
		} catch (error) {
			console.error("Accordion rendering failed:", error);
		}
	});
});

