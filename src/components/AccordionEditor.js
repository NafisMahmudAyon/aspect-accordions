import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { Button } from "aspect-ui/Button";
import React, { useEffect, useState } from "react";
import AccordionDashboard from "./AccordionDashboard";
import AccordionGlobalOptions from "./AccordionGlobalOptions";
import AccordionItemsEditor from "./AccordionItemsEditor";
import AccordionPreview from "./AccordionPreview";
import { defaultData } from "./defaultData";

const AccordionEditor = () => {
	const [accordions, setAccordions] = useState([]);
	const [currentAccordion, setCurrentAccordion] = useState(null);
	const [options, setOptions] = useState(null);

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
		setOptions(defaultData);
	};

	const saveAccordion = async () => {
		const response = await fetch(`${aspectAccordionsData.apiUrl}/save`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": aspectAccordionsData.nonce,
			},
			body: JSON.stringify({
				id: currentAccordion?.id || null,
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

	const updateGlobalOption = (key, value) => {
		setOptions((prev) => ({
			...prev,
			global: { ...prev.global, [key]: value },
		}));
	};

	const updateItem = (index, key, value) => {
		setOptions((prev) => {
			const updatedItems = [...prev.items];
			updatedItems[index][key] = value;
			return { ...prev, items: updatedItems };
		});
	};

	const addItem = () => {
		setOptions((prev) => ({
			...prev,
			items: [
				...prev.items,
				{
					headerLabel: "",
					content: "",
					iconEnabled: true,
					iconPosition: "right",
					iconClassName: "size-6",
					activeIconClassName: "size-6",
					activeIcon: "arrow-right",
					inactiveIcon: "arrow-down",
					disabled: false,
					headerClassName: "",
					labelClassName: "",
					activeLabelClassName: "",
					activeHeaderClassName: "",
					contentClassName: "",
				},
			],
		}));
	};

	console.log(options);

	return (
		<div className="aspect-accordion-dashboard">
			{!options ? (
				<AccordionDashboard
					accordions={accordions}
					startCreating={startCreating}
					startEditing={startEditing}
				/>
			) : (
				<>
					<div className="aspect-accordion-editor flex gap-5 max-h-[700px] h-[70vh] relative ">
						<aside className="w-[30%] max-w-[300px] sticky top-0">
							<Accordion>
								<AccordionItem
									id="item-1"
									className="border-primary-200 dark:border-primary-200">
									<AccordionHeader
										className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
										activeHeaderClassName="border-b ">
										<h3 className="text-h6">Accordion Editor</h3>
									</AccordionHeader>
									<AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent space-y-3">
										<AccordionGlobalOptions
											globalOptions={options.global}
											updateGlobalOption={updateGlobalOption}
										/>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem
									id="item-2"
									className="border-primary-200 dark:border-primary-200">
									<AccordionHeader
										className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
										activeHeaderClassName="border-b ">
										<h3 className="text-h6">Preview</h3>
									</AccordionHeader>
									<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
										<AccordionItemsEditor
											items={options.items}
											updateItem={updateItem}
											addItem={addItem}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</aside>
						<AccordionPreview
							className="flex-1 overflow-y-scroll"
							globalOptions={options.global}
							items={options.items}
						/>
					</div>
					<Button isPrimary onClick={saveAccordion}>
						Save Accordion
					</Button>
				</>
			)}
		</div>
	);
};

export default AccordionEditor;
