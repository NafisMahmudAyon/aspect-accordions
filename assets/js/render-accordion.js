import React from "react";
import ReactDOM from "react-dom";
import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionContent,
} from "aspect-ui/Accordion";

document.addEventListener("DOMContentLoaded", () => {
	const accordions = document.querySelectorAll(".aspect-accordion");

	accordions.forEach((container) => {
		const dataElement = container.querySelector(".aspect-accordion-data");
    console.log(dataElement)
		if (!dataElement) return;

		try {
			const accordionData = JSON.parse(dataElement.textContent);
      console.log(accordionData)

			ReactDOM.render(
				<Accordion
					iconEnabled={accordionData?.global?.iconEnabled??true}
					iconPosition={accordionData.global.iconPosition}
					className={accordionData.global.headerClassName}>
					{accordionData.items.map((item, index) => (
						<AccordionItem
							key={index}
							id={`item-${index}`}
							disabled={item.disabled}>
							<AccordionHeader className={item.headerClassName}>
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
