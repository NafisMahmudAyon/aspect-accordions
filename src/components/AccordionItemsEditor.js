import React from "react";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
} from "@wordpress/components";

const AccordionItemsEditor = ({ items, updateItem, addItem }) => {
  console.log(items)
	return (
		<PanelBody title="Accordion Items">
			{items.map((item, index) => (
				<div key={index} className="accordion-item">
					<TextControl
						label={`Header Label ${index + 1}`}
						value={item.headerLabel}
						onChange={(value) => updateItem(index, "headerLabel", value)}
					/>
					<TextareaControl
						label={`Content ${index + 1}`}
						value={item.content}
						onChange={(value) => updateItem(index, "content", value)}
					/>
				</div>
			))}
			<Button onClick={addItem}>Add New Item</Button>
		</PanelBody>
	);
};

export default AccordionItemsEditor;
