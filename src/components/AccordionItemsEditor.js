import {
	ChevronUpDownIcon,
	DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { Button } from "aspect-ui/Button";
import { Switch } from "aspect-ui/Switch";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Icons from "./icons/Icons";
import Select from "./Select";
// import { SlateEditor } from "./SlateEditor";
import RichTextEditor from "./RichTextEditor";
import TailwindInput from "./TailwindInput";
import MarkdownEditor from "./MarkdownEditor";

const AccordionItemsEditor = ({ items, updateItem, addItem }) => {
	console.log(items);

	// Function to handle sorting and update item IDs
	const handleSort = (newList) => {
		// Update item IDs based on new order
		const updatedList = newList.map((item, index) => ({
			...item,
			id: `item-${index + 1}`, // Assign new ID based on index
		}));

		// Call the parent setOptions with rearranged and updated items
		updateItem(null, null, updatedList); // Pass the entire list to the parent handler
	};

	// Function to copy an item and insert it at the next position
	const copyItem = (index) => {
		const copiedItem = {
			...items[index],
			id: `item-${items.length + 1}`, // Assign a new unique ID
			headerLabel: `${items[index].headerLabel} (Copy)`, // Optional: Indicate it's a copy
		};

		// Insert the copied item at the next position
		const updatedItems = [
			...items.slice(0, index + 1),
			copiedItem,
			...items.slice(index + 1),
		];

		// Update the items list
		handleSort(updatedItems);
	};

	return (
		<>
			{items.length > 0 && (
				<ReactSortable list={items} handle=".handle" setList={handleSort}>
					{items.map((item, index) => {
						
						return (
							<Accordion key={index} className="mb-3">
								<AccordionItem
									className="accordion-item"
									id={`item-${index + 1}`}>
									<AccordionHeader
										className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
										activeHeaderClassName="border-b"
										labelClassName="flex items-center gap-2">
										<span className="flex items-center gap-2 w-max">
											<span
												title="Drag to reorder"
												aria-label="Drag to reorder"
												className="handle bg-primary-200 hover:bg-primary-200 dark:bg-primary-200 dark:hover:bg-primary-200 px-1 py-1 text-primary-900 dark:text-primary-900 hover:text-primary-900 dark:hover:text-primary-900 rounded-md cursor-move">
												<ChevronUpDownIcon className="size-5" />
											</span>
											<span
												title={`Copy Item ${index + 1}`}
												aria-label={`Copy Item ${index + 1}`}
												onClick={() => copyItem(index)}
												className="bg-primary-200 hover:bg-primary-200 dark:bg-primary-200 dark:hover:bg-primary-200 px-1 py-1 text-primary-900 dark:text-primary-900 hover:text-primary-900 dark:hover:text-primary-900 rounded-md cursor-pointer">
												<DocumentDuplicateIcon className="size-5" />
											</span>
										</span>
										Accordion Item {index + 1}
									</AccordionHeader>
									<AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent space-y-3">
										<Tabs defaultActive="item-1">
											<TabList className="px-3">
												<TabItem
													value="item-1"
													activeClassName="!bg-primary-900 !text-white dark:!bg-primary-900 dark:!text-white"
													className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-200 dark:text-gray-600">
													Options
												</TabItem>
												<TabItem
													value="item-2"
													activeClassName="!bg-primary-900 !text-white dark:!bg-primary-900 dark:!text-white"
													className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-200 dark:text-gray-600">
													Style
												</TabItem>
											</TabList>
											<TabContent value="item-1" className="space-y-3">
												{/* <SlateEditor
												value={item.headerLabel}
												onChange={(value) =>
													updateItem(index, "headerLabel", value)
												}
												placeholder={`Header Label ${index + 1}`}
											/> */}
												{/* <DraftEditor
												value={item.content || "{}"} // Ensure that content is a valid JSON object or an empty object
												onChange={(value) => {
													try {
														// Parse and ensure the value is valid before updating
														const parsedValue = JSON.parse(value);
														updateItem(
															index,
															"content",
															JSON.stringify(parsedValue)
														); // Store the content as JSON string
													} catch (error) {
														console.error("Invalid editor content:", error);
														// Optional: You can set the content to an empty object if the content is invalid
														updateItem(index, "content", "{}");
													}
												}}
												placeholder={`Content ${index + 1}`}
											/> */}

												<MarkdownEditor
													value={item.content || ""}
													onChange={(value) =>
														updateItem(index, "content", value)
													}
													placeholder="Start typing..."
												/>

												<Switch
													checked={item?.disabled}
													onChange={(value) =>
														updateItem(index, "disabled", value)
													}
													label="Disabled"
													labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
													className="flex-row-reverse justify-between w-full"
												/>
												<Switch
													checked={item?.iconEnabled}
													onChange={(value) =>
														updateItem(index, "iconEnabled", value)
													}
													label="Icon Enable"
													labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
													className="flex-row-reverse justify-between w-full"
												/>
												{item?.iconEnabled && (
													<>
														<Select
															options={[
																{ label: "Right", value: "right" },
																{ label: "Left", value: "left" },
															]}
															label="Icon Position"
															labelClassName="text-[11px]"
															value={item?.iconPosition}
															onChange={(value) =>
																updateItem(index, "iconPosition", value)
															}
														/>
														<Icons
															label="Active Icon"
															val={item?.activeIcon}
															update={(value) =>
																updateItem(index, "activeIcon", value)
															}
															updateIconType={(value) =>
																updateItem(index, "activeIconType", value)
															}
														/>
														<Icons
															label="Inactive Icon"
															val={item?.inactiveIcon}
															update={(value) =>
																updateItem(index, "inactiveIcon", value)
															}
															updateIconType={(value) =>
																updateItem(index, "inactiveIconType", value)
															}
														/>
													</>
												)}
											</TabContent>
											<TabContent value="item-2" className="space-y-3">
												<TailwindInput
													val={item?.headerClassName}
													update={(value) =>
														updateItem(index, "headerClassName", value)
													}
													label="Header Class Name"
												/>
												<TailwindInput
													val={item?.activeHeaderClassName}
													update={(value) =>
														updateItem(index, "activeHeaderClassName", value)
													}
													label="Active Header Class Name"
												/>
												<TailwindInput
													val={item?.labelClassName}
													update={(value) =>
														updateItem(index, "labelClassName", value)
													}
													label="Label Class Name"
												/>
												<TailwindInput
													val={item?.activeLabelClassName}
													update={(value) =>
														updateItem(index, "activeLabelClassName", value)
													}
													label="Active Label Class Name"
												/>
												<TailwindInput
													val={item?.contentClassName}
													update={(value) =>
														updateItem(index, "contentClassName", value)
													}
													label="Content Class Name"
												/>
											</TabContent>
										</Tabs>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						);
					})}
				</ReactSortable>
			)}
			<Button onClick={addItem}>Add New Item</Button>
		</>
	);
};

export default AccordionItemsEditor;
