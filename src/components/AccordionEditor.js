import React, { useState, useEffect } from "react";
import {
	Button,
	Panel,
	PanelBody,
	TextControl,
	TextareaControl,
	ColorPicker,
} from "@wordpress/components";

const AccordionEditor = () => {
	const [accordions, setAccordions] = useState([]); // List of accordions
	const [currentAccordion, setCurrentAccordion] = useState(null); // Accordion being edited
	const [options, setOptions] = useState(null); // Options for customization

	console.log(aspectAccordionsData);
	console.log(accordions);

	// Fetch existing accordions
	useEffect(() => {
		fetch(`${aspectAccordionsData.apiUrl}/list`, {
			headers: { "X-WP-Nonce": aspectAccordionsData.nonce },
		})
			.then((res) => res.json())
			.then((data) => setAccordions(data))
			.catch((err) => console.error(err));
	}, []);

	const startEditing = (accordion) => {
		setCurrentAccordion(accordion);
		setOptions(JSON.parse(accordion.content));
	};

	const startCreating = () => {
		setCurrentAccordion(null);
		setOptions({
			items: [{ title: "Accordion 1", content: "Content 1" }],
			styles: {
				backgroundColor: "#ffffff",
				titleColor: "#000000",
				borderColor: "#dddddd",
			},
		});
	};

	const saveAccordion = async () => {
		const response = await fetch(`${aspectAccordionsData.apiUrl}/save`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": aspectAccordionsData.nonce,
			},
			body: JSON.stringify({
				id: currentAccordion?.id || null, // Null for new accordion
				title: currentAccordion?.title || "New Accordion",
				content: JSON.stringify(options),
				status: "publish",
			}),
		});

		if (response.ok) {
			const newAccordion = await response.json();
			setAccordions((prev) =>
				currentAccordion
					? prev.map((acc) =>
							acc.id === currentAccordion.id ? newAccordion : acc
					  )
					: [...prev, newAccordion]
			);
			setCurrentAccordion(null);
			setOptions(null);
		} else {
			console.error("Error saving accordion");
		}
	};

	return (
		<div className="aspect-accordion-dashboard">
			{!options ? (
				<div>
					<h2>Accordion Dashboard</h2>
					<Button isPrimary onClick={startCreating}>
						Create New Accordion
					</Button>
					<ul>
						{accordions.map((accordion) => (
							<li key={accordion.id}>
								<Button isLink onClick={() => startEditing(accordion)}>
									{accordion.title}
								</Button>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="aspect-accordion-editor">
					<Panel>
						<PanelBody title="Accordion Items">
							{options.items.map((item, index) => (
								<div key={index} className="accordion-item">
									<TextControl
										label={`Title ${index + 1}`}
										value={item.title}
										onChange={(value) =>
											setOptions((prev) => {
												const updatedItems = [...prev.items];
												updatedItems[index].title = value;
												return { ...prev, items: updatedItems };
											})
										}
									/>
									<TextareaControl
										label={`Content ${index + 1}`}
										value={item.content}
										onChange={(value) =>
											setOptions((prev) => {
												const updatedItems = [...prev.items];
												updatedItems[index].content = value;
												return { ...prev, items: updatedItems };
											})
										}
									/>
								</div>
							))}
							<Button
								onClick={() =>
									setOptions((prev) => ({
										...prev,
										items: [...prev.items, { title: "", content: "" }],
									}))
								}>
								Add Item
							</Button>
						</PanelBody>
						<PanelBody title="Styling Options">
							<ColorPicker
								label="Background Color"
								color={options.styles.backgroundColor}
								onChangeComplete={(color) =>
									setOptions((prev) => ({
										...prev,
										styles: { ...prev.styles, backgroundColor: color.hex },
									}))
								}
							/>
						</PanelBody>
					</Panel>
					<Button isPrimary onClick={saveAccordion}>
						Save Accordion
					</Button>
				</div>
			)}
		</div>
	);
};

export default AccordionEditor;
