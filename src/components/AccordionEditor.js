import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { Button } from "aspect-ui/Button";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import AccordionDashboard from "./AccordionDashboard";
import AccordionGlobalOptions from "./AccordionGlobalOptions";
import AccordionItemsEditor from "./AccordionItemsEditor";
import AccordionPreview from "./AccordionPreview";
import { defaultData } from "./defaultData";

const AccordionEditor = () => {
	const [accordions, setAccordions] = useState([]);
	const [currentAccordion, setCurrentAccordion] = useState(null);
	const [selectedAccordions, setSelectedAccordions] = useState([]);

	const [options, setOptions] = useState(null);
	const [title, setTitle] = useState(""); // State for the accordion title
	const [saveLoading, setSaveLoading] = useState(false);
	const [postStatus, setPostStatus] = useState("publish");
	const [currentPage, setCurrentPage] = useState(1); // Track the current page
	const [totalPages, setTotalPages] = useState(1); // Track total number of pages
	const mountedRef = useRef(true);
	const [isAccordion, setIsAccordion] = useState(null);
	useEffect(() => {
		setIsAccordion(options?.global?.isAccordion ?? true);
	}, [options?.global]);

	console.log(aspectAccordionsData);

	useEffect(() => {
		const listState = `/list?status=${postStatus}&page=${currentPage}`;
		const fetchAccordions = async () => {
			try {
				const response = await fetch(
					`${aspectAccordionsData?.apiUrl}${listState}`,
					{
						headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
					}
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				var dataX = [];
				const data = await response.json();
				dataX = JSON.parse(data)
				// Safely update state only if the component is still mounted
				if (mountedRef.current) {
					setAccordions(dataX.accordions);
					setTotalPages(dataX.pagination.total_pages); // Set total pages
				}
			} catch (err) {
				console.error("Error fetching accordions:", err);
			}
		};

		fetchAccordions();
	}, [postStatus, currentPage]); // Re-run when postStatus or currentPage changes

	// Use a ref to check if the component is mounted to prevent setting state after unmount
	useEffect(() => {
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const startEditing = (accordion) => {
		setCurrentAccordion(accordion);
		// setIsAccordion(accordion.isAccordion ?? true);
		setTitle(accordion.title); // Set the existing title for editing
		// var parsedData = qs.parse(accordion?.content, { decode: true });
		// const content = Object.keys(accordion?.content).reduce((acc, key) => {
		// 	const cleanedKey = key.replace(/^amp;/, ""); // Remove the 'amp;' prefix
		// 	acc[cleanedKey] = parsedData[key];
		// 	return acc;
		// }, {});
		setOptions(accordion?.content);
	};

	// const startEditing = (accordion) => {
	// 	setCurrentAccordion(accordion);
	// 	setTitle(accordion.title); // Set the existing title for editing

	// 	console.log(accordion?.content);

	// 	// Parse the query string into an object
	// 	var parsedData = qs.parse(accordion?.content, { decode: true });
	// 	console.log(parsedData);

	// 	// Clean and merge the keys, ensuring global fields are properly handled
	// 	const content = Object.keys(parsedData).reduce((acc, key) => {
	// 		const cleanedKey = key.replace(/^amp;/, ""); // Remove the 'amp;' prefix
	// 		const [parentKey, subKey] = cleanedKey.split(/\[|\]/).filter(Boolean);

	// 		if (parentKey === "global") {
	// 			if (!acc.global) acc.global = {};
	// 			acc.global[subKey] = parsedData[key];
	// 		} else if (parentKey === "items") {
	// 			if (!acc.items) acc.items = [];
	// 			const itemIndex = parseInt(subKey, 10); // Convert index to number
	// 			if (!acc.items[itemIndex]) acc.items[itemIndex] = {};
	// 			const [, itemSubKey] = cleanedKey.split(/\]\[/).filter(Boolean);
	// 			acc.items[itemIndex][itemSubKey] = parsedData[key];
	// 		} else {
	// 			acc[parentKey] = parsedData[key];
	// 		}

	// 		return acc;
	// 	}, {});

	// 	// Add the original global fields (if needed)
	// 	content.global.isAccordion = parsedData.global?.isAccordion || "false";

	// 	console.log(content);

	// 	// Set the merged options
	// 	setOptions(content);
	// };



	const startCreating = () => {
		setCurrentAccordion(null);
		setTitle("New Accordion"); // Default title for new accordion
		setOptions(defaultData);
	};

	const filterSerializableData = (obj) => {
		const isSerializable = (value) =>
			typeof value !== "object" ||
			value === null ||
			Array.isArray(value) ||
			Object.prototype.toString.call(value) === "[object Object]";

		if (!isSerializable(obj)) return null;

		return Object.entries(obj).reduce(
			(acc, [key, value]) => {
				acc[key] = isSerializable(value)
					? value
					: filterSerializableData(value);
				return acc;
			},
			Array.isArray(obj) ? [] : {}
		);
	};
	const saveAccordion = async (status = "publish") => {
		const cleanedOptions = filterSerializableData(options);
		try {
			// Validate and filter options
			if (!cleanedOptions) {
				alert("Invalid data in accordion options. Please check your input.");
				return;
			}

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
					content: cleanedOptions,
					status,
				}),
			});

			if (response.ok) {
				const result = await response.json();
				await fetchUpdatedAccordionList();
				setCurrentAccordion(null);
				setOptions(null);
				setTitle("");
				alert("Accordion saved successfully!");
			} else {
				const error = await response.json();
				console.error("Error saving accordion:", error);
				alert(
					error.message || "Failed to save the accordion. Please try again."
				);
			}
		} catch (err) {
			console.error("Unexpected error while saving accordion:", err);
			alert("An unexpected error occurred. Please try again.");
		} finally {
			setSaveLoading(false);
			setPostStatus("publish");
		}
	};

	// const startDeleting = async (id) => {
	// 	if (window.confirm(`${postStatus === "trash"} ? "Are you sure you want to delete this accordion?" : "Are you sure you want to move this accordion to the trash?"`)) {
	// 		try {
	// 			await fetch(`${aspectAccordionsData?.apiUrl}/delete/${id}`, {
	// 				method: "DELETE",
	// 				headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
	// 			});
	// 			await fetchUpdatedAccordionList(); // Refresh the list
	// 		} catch (err) {
	// 			console.error("Error deleting accordion:", err);
	// 		}
	// 	}
	// };

	const startDeleting = async (id, status = "trash") => {
		const isTrash = postStatus === "trash";
		let confirmationMessage;

		if (isTrash && (status === "publish" || status === "draft")) {
			confirmationMessage = "Are you sure you want to restore this accordion?";
		} else if (isTrash) {
			confirmationMessage =
				"Are you sure you want to permanently delete this accordion?";
		} else {
			confirmationMessage =
				"Are you sure you want to move this accordion to the trash?";
		}

		if (window.confirm(confirmationMessage)) {
			try {
				// Determine API endpoint and HTTP method
				const endpoint =
					isTrash && (status === "publish" || status === "draft")
						? `${aspectAccordionsData?.apiUrl}/status/${id}`
						: isTrash
						? `${aspectAccordionsData?.apiUrl}/delete/${id}`
						: `${aspectAccordionsData?.apiUrl}/status/${id}`;

				const method =
					isTrash && (status === "publish" || status === "draft")
						? "POST"
						: isTrash
						? "DELETE"
						: "POST";
				const body = method === "POST" ? JSON.stringify({ status }) : null;

				await fetch(endpoint, {
					method,
					headers: {
						"X-WP-Nonce": aspectAccordionsData?.nonce,
						"Content-Type": "application/json",
					},
					body,
				});

				await fetchUpdatedAccordionList(); // Refresh the list
				if (status === "publish") setPostStatus("publish");
			} catch (err) {
				console.error("Error updating accordion status:", err);
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
		setCurrentPage(1);
		setPostStatus("publish");
		const listState = `/list?status=publish&page=1`;
		try {
			const response = await fetch(`${aspectAccordionsData?.apiUrl}${listState}`, {
				headers: { "X-WP-Nonce": aspectAccordionsData?.nonce },
			});
			var dataX = [];
			const data = await response.json();
			dataX = JSON.parse(data);
			setAccordions(dataX.accordions);
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
		if (value instanceof HTMLElement) {
			console.warn("Avoid adding DOM elements to state:", value);
			return;
		}
		setOptions((prev) => {
			const updatedItems = [...prev.items];
			updatedItems[index] = { ...updatedItems[index], [key]: value };
			return { ...prev, items: updatedItems };
		});
	};

	// const updateItem = (index, key, value) => {
	// 	console.log("accordion editor: ", value);
	// 	if (index === null) {
	// 		// Handle entire list update (used for sorting)
	// 		setOptions((prev) => ({
	// 			...prev,
	// 			items: value, // Update the entire items list
	// 		}));
	// 		return;
	// 	}

	// 	// Update individual item
	// 	// setOptions((prev) => {
	// 	// 	const updatedItems = [...prev.items];
	// 	// 	updatedItems[index][key] = value;
	// 	// 	return { ...prev, items: updatedItems };
	// 	// });

	// 	setOptions((prev) => {
	// 		const updatedItems = [...prev.items]; // Create a shallow copy of the items array
	// 		updatedItems[index] = { ...updatedItems[index], [key]: value }; // Create a new object for the updated item
	// 		return { ...prev, items: updatedItems }; // Return the updated options
	// 	});
	// };

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			if (options !== null) {
				// Custom message for the user
				const message =
					"You have unsaved changes. Are you sure you want to leave?";
				// Standard way to show a prompt for beforeunload
				event.returnValue = message; // For most browsers
				return message; // For some older browsers
			}
		};

		// Attach the event listener when the component mounts
		window.addEventListener("beforeunload", handleBeforeUnload);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [options]);

	const cancelEditing = () => {
		// Reset the states to exit the editing mode
		setCurrentAccordion(null);
		setOptions(null);
		setTitle("");
	};

	const handleBulkUpdate = async (selectedIds, status) => {
		try {
			const response = await fetch(
				`${aspectAccordionsData?.apiUrl}/bulk-update`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-WP-Nonce": aspectAccordionsData?.nonce,
					},
					body: JSON.stringify({ ids: selectedIds, status }),
				}
			);

			const result = await response.json();

			if (result.success) {
				await fetchUpdatedAccordionList();
				setCurrentAccordion(null);
				setOptions(null);
				setTitle("");
				setSelectedAccordions([]);
				// alert(result.message);
				// Refresh the accordion list if needed
			} else {
				console.error("Error:", result);
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
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

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<div className="aspect-accordion-dashboard">
				{!options ? (
					<AccordionDashboard
						totalPages={totalPages}
						currentPage={currentPage}
						handlePageChange={handlePageChange}
						accordions={accordions}
						postStatus={postStatus}
						handlePostStatusChange={setPostStatus}
						startCreating={startCreating}
						startEditing={startEditing}
						startDeleting={startDeleting}
						startCopying={startCopying}
						selectedAccordions={selectedAccordions}
						setSelectedAccordions={setSelectedAccordions}
						handleBulkUpdate={handleBulkUpdate}
						// startQuickView={startQuickView}
					/>
				) : (
					<>
						<div className="aspect-accordion-editor flex gap-5 max-h-[700px] h-[70vh] relative">
							<aside className="w-[30%] max-w-[300px] sticky top-0 font-poppins overflow-y-auto light-scrollbar pr-2">
								{/* <button onClick={() => {
									//clipboard the options
									navigator.clipboard.writeText(JSON.stringify(options));
									alert("Options copied to clipboard!");
								}}>Copy</button> */}
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
												isAccordion={isAccordion}
												setIsAccordion={setIsAccordion}
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
								onClick={() => saveAccordion("publish")}>
								Save Accordion
							</Button>
							<Button
								icon={<CheckCircleIcon className="size-5" />}
								loading={saveLoading}
								onClick={() => saveAccordion("draft")}>
								Save as Draft
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
		</>
	);
};

export default AccordionEditor;


















