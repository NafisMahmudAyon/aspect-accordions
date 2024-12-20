import {
	Button,
	ColorPicker,
	Panel,
	PanelBody,
	TextControl,
	TextareaControl,
} from "@wordpress/components";
import React, { useState } from "react";

const AccordionEditor = () => {
	const [options, setOptions] = useState({
		items: [{ title: "Accordion 1", content: "Content 1" }],
		styles: {
			backgroundColor: "#ffffff",
			titleColor: "#000000",
			borderColor: "#dddddd",
		},
	});

  console.log(options)

	const addItem = () => {
		setOptions((prev) => ({
			...prev,
			items: [...prev.items, { title: "", content: "" }],
		}));
	};

	const updateItem = (index, key, value) => {
		const updatedItems = [...options.items];
		updatedItems[index][key] = value;
		setOptions({ ...options, items: updatedItems });
	};

	const removeItem = (index) => {
		const updatedItems = options.items.filter((_, i) => i !== index);
		setOptions({ ...options, items: updatedItems });
	};

	const saveAccordion = async () => {
		try {
			const response = await fetch(aspectAccordionsData.apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-WP-Nonce": aspectAccordionsData.nonce,
				},
				body: JSON.stringify({
					title: "New Accordion",
					content: JSON.stringify(options),
					status: "publish",
				}),
			});

			if (response.ok) {
				alert("Accordion saved successfully!");
				setOptions({
					items: [{ title: "Accordion 1", content: "Content 1" }],
					styles: {
						backgroundColor: "#ffffff",
						titleColor: "#000000",
						borderColor: "#dddddd",
					},
				});
			} else {
				alert("Failed to save accordion.");
			}
		} catch (error) {
			console.error("Error saving accordion:", error);
		}
	};

	return (
		<div className="aspect-accordion-editor">
			<Panel>
				<PanelBody title="Accordion Items">
					{options.items.map((item, index) => (
						<div key={index} className="accordion-item">
							<TextControl
								label={`Title ${index + 1}`}
								value={item.title}
								onChange={(value) => updateItem(index, "title", value)}
							/>
							<TextareaControl
								label={`Content ${index + 1}`}
								value={item.content}
								onChange={(value) => updateItem(index, "content", value)}
							/>
							<Button isDestructive onClick={() => removeItem(index)}>
								Remove Item
							</Button>
						</div>
					))}
					<Button onClick={addItem}>Add New Item</Button>
				</PanelBody>
				<PanelBody title="Styling Options">
					<ColorPicker
						label="Background Color"
						color={options.styles.backgroundColor}
						onChangeComplete={(color) =>
							setOptions({
								...options,
								styles: { ...options.styles, backgroundColor: color.hex },
							})
						}
					/>
					<ColorPicker
						label="Title Color"
						color={options.styles.titleColor}
						onChangeComplete={(color) =>
							setOptions({
								...options,
								styles: { ...options.styles, titleColor: color.hex },
							})
						}
					/>
					<ColorPicker
						label="Border Color"
						color={options.styles.borderColor}
						onChangeComplete={(color) =>
							setOptions({
								...options,
								styles: { ...options.styles, borderColor: color.hex },
							})
						}
					/>
				</PanelBody>
			</Panel>
			<Button isPrimary onClick={saveAccordion}>
				Save Accordion
			</Button>
		</div>
	);
};

export default AccordionEditor;
