import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React from "react";

const AccordionPreview = ({ globalOptions, items, className }) => {
  console.log(globalOptions?.activeItems)
  let activeItems = []
if(globalOptions?.activeItems?.length >0){
for (let i = 0; i < globalOptions?.activeItems?.length; i++) {
  activeItems.push(`item-${globalOptions?.activeItems[i]+1}`)
}}else{
  activeItems = []
}
console.log(activeItems)
	return (
		<div className={`accordion-preview ${className}`}>
			<h3>Accordion Preview</h3>
			<Accordion
				activeItem={activeItems}
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
