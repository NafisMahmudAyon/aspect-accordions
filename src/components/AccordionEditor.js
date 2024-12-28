import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import AccordionDashboard from "./AccordionDashboard";
import AccordionGlobalOptions from "./AccordionGlobalOptions";
import AccordionItemsEditor from "./AccordionItemsEditor";
import AccordionPreview from "./AccordionPreview";
import { defaultData } from "./defaultData";
import qs from "qs";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { Button } from "aspect-ui/Button";
import React, { useEffect, useState } from "react";

const AccordionEditor = () => {
	const [accordions, setAccordions] = useState([]);
	const [currentAccordion, setCurrentAccordion] = useState(null);
	const [options, setOptions] = useState(null);
	const [title, setTitle] = useState(""); // State for the accordion title
	const [saveLoading, setSaveLoading] = useState(false);
	useEffect(() => {
		fetch(`${aspectAccordionsData?.apiUrl}/list`, {
			headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
		})
		.then((res) => res.json())
			.then((data) => {
				console.log("data: ",data)
				setAccordions(data);
			})
			.catch((err) => console.error(err));
	}, []);

	const startEditing = (accordion) => {
		setCurrentAccordion(accordion);
		setTitle(accordion.title); // Set the existing title for editing
		var parsedData = qs.parse(accordion?.content, { decode: true });
		const content = Object.keys(parsedData).reduce((acc, key) => {
			const cleanedKey = key.replace(/^amp;/, ""); // Remove the 'amp;' prefix
			acc[cleanedKey] = parsedData[key];
			return acc;
		}, {});
		setOptions(content);
	};
	
	const startCreating = () => {
		setCurrentAccordion(null);
		setTitle("New Accordion"); // Default title for new accordion
		setOptions(defaultData);
	};
	
	const saveAccordion = async () => {
		console.log(options)
		setSaveLoading(true);
		const response = await fetch(`${aspectAccordionsData?.apiUrl}/save`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": aspectAccordionsData?.nonce,
			},
			body: JSON.stringify({
				id: currentAccordion?.id || null,
				title, // Use the title from state
				content: qs.stringify(options, { encode: true }),
				status: "publish",
			}),
		});

		if (response.ok) {
			await fetchUpdatedAccordionList(); // Fetch the updated list after saving
			setCurrentAccordion(null);
			setOptions(null);
			setTitle(""); // Clear the title field
		} else {
			console.error("Error saving accordion");
		}
		setSaveLoading(false);
	};
	
	const startDeleting = async (id) => {
		if (window.confirm("Are you sure you want to delete this accordion?")) {
			try {
				await fetch(`${aspectAccordionsData?.apiUrl}/delete/${id}`, {
					method: "DELETE",
					headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
				});
				await fetchUpdatedAccordionList(); // Refresh the list
			} catch (err) {
				console.error("Error deleting accordion:", err);
			}
		}
	};

	const startCopying = async (accordion) => {
		try {
			const response = await fetch(`${aspectAccordionsData?.apiUrl}/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-WP-Nonce": aspectAccordionsData?.nonce,
				},
				body: JSON.stringify({
					id: null, // New accordion
					title: `${accordion.title} (Copy)`,
					content: accordion.content,
					status: "publish",
				}),
			});
			if (response.ok) {
				await fetchUpdatedAccordionList(); // Refresh the list
			}
		} catch (err) {
			console.error("Error copying accordion:", err);
		}
	};
	
	// const startQuickView = (accordion) => {
		// 	alert(
	// 		`Quick View:\n\nTitle: ${accordion.title}\nContent: ${accordion.content}`
	// 	);
	// };

	// Fetch the updated list of accordions
	const fetchUpdatedAccordionList = async () => {
		try {
			const response = await fetch(`${aspectAccordionsData?.apiUrl}/list`, {
				headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
			});
			const data = await response.json();
			setAccordions(data);
		} catch (err) {
			console.error("Error fetching accordion list:", err);
		}
	};
	
	const updateGlobalOption = (key, value) => {
		setOptions((prev) => ({
			...prev,
			global: { ...prev.global, [key]: value },
		}));
	};

	const updateItem = (index, key, value) => {
		console.log("accordion editor: ",value)
		if (index === null) {
			// Handle entire list update (used for sorting)
			setOptions((prev) => ({
				...prev,
				items: value, // Update the entire items list
			}));
			return;
		}
		
		// Update individual item
		// setOptions((prev) => {
		// 	const updatedItems = [...prev.items];
		// 	updatedItems[index][key] = value;
		// 	return { ...prev, items: updatedItems };
		// });
		
		setOptions((prev) => {
			const updatedItems = [...prev.items]; // Create a shallow copy of the items array
			updatedItems[index] = { ...updatedItems[index], [key]: value }; // Create a new object for the updated item
			return { ...prev, items: updatedItems }; // Return the updated options
		});
	};
	console.log("Updated items:", options?.items);

	const cancelEditing = () => {
		// Reset the states to exit the editing mode
		setCurrentAccordion(null);
		setOptions(null);
		setTitle("");
	};

	const addItem = (index) => {
		setOptions((prev) => ({
			...prev,
			items: [
				...prev.items,
				{
					id: "item-" + (index + 1),
					headerLabel: "Accordion" + (index + 1),
					content: "Content" + (index + 1),
					iconEnabled: true,
					iconPosition: "right",
					iconClassName: "size-6",
					activeIconClassName: "size-6",
					activeIcon: "",
					activeIconType: "outline",
					inactiveIcon: "",
					inactiveIconType: "outline",
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
	console.log(accordions)
	return (
		<div className="aspect-accordion-dashboard">
			{!options ? (
				<AccordionDashboard
					accordions={accordions}
					startCreating={startCreating}
					startEditing={startEditing}
					startDeleting={startDeleting}
					startCopying={startCopying}
					// startQuickView={startQuickView}
				/>
			) : (
				<>
					<div className="aspect-accordion-editor flex gap-5 max-h-[700px] h-[70vh] relative">
						<aside className="w-[30%] max-w-[300px] sticky top-0 font-poppins overflow-y-auto light-scrollbar pr-2">
							{/* Title Input */}
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">
									Accordion Title
								</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full px-3 py-2 border rounded-md text-sm"
									placeholder="Enter accordion title"
								/>
							</div>
							<Accordion>
								<AccordionItem
									id="item-1"
									className="border-primary-200 dark:border-primary-200">
									<AccordionHeader
										className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
										activeHeaderClassName="border-b">
										<h3 className="text-h6 !text-[13px]">Global Options</h3>
									</AccordionHeader>
									<AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent space-y-3">
										<AccordionGlobalOptions
											globalOptions={options.global}
											itemsLength={options.items.length}
											updateGlobalOption={updateGlobalOption}
										/>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem
									id="item-2"
									className="border-primary-200 dark:border-primary-200">
									<AccordionHeader
										className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
										activeHeaderClassName="border-b">
										<h3 className="text-h6 !text-[13px]">Items Options</h3>
									</AccordionHeader>
									<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
										<AccordionItemsEditor
											items={options.items}
											updateItem={updateItem}
											addItem={() => addItem(options.items.length)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</aside>
						<AccordionPreview
							className="flex-1 overflow-y-scroll"
							globalOptions={options.global}
							items={options.items}
							updateItem={updateItem}
						/>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<Button
							icon={<CheckCircleIcon className="size-5" />}
							loading={saveLoading}
							onClick={saveAccordion}>
							Save Accordion
						</Button>
						<Button
							icon={<XCircleIcon className="size-5" />}
							onClick={cancelEditing}>
							Cancel Editing
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default AccordionEditor;





