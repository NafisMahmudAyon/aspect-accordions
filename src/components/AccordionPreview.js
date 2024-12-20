import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React from "react";

const AccordionPreview = ({ globalOptions, items, className }) => {
	return (
		<div className={`accordion-preview ${className}`}>
			<h3>Accordion Preview</h3>
			<Accordion
				iconEnabled={globalOptions.iconEnabled}
				iconPosition={globalOptions.iconPosition}
				className={globalOptions.headerClassName}>
				{items.map((item, index) => (
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
			</Accordion>
		</div>
	);
};

export default AccordionPreview;
