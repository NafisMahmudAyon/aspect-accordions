// import "../../style.css";

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { useState } from "react";
// import DropdownData from "../../components/block-components/dropdown-data";
// import InputData from "../../components/block-components/input-data";
// import SwitchData from "../../components/block-components/switch-data";
import iconsListOutline from "../../components/icons/IconListOutline";
import iconsListSolid from "../../components/icons/IconListSolid";
// import Icons from "../../components/icons/Icons";
// import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";
import MarkdownEditor from "../../../../src/components/MarkdownEditor";
import { Switch } from "aspect-ui/Switch";
import Select from "../../components/Select";
import TailwindInput from "../../components/TailwindInput";
import Icons from "../../components/icons/Icons";

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	const { attributes, setAttributes } = props;
	const { items } = attributes;
	const [open, setOpen] = useState(items.open || true);

	// Common Helper Functions
	const updateAttribute = (key, value) => {
		setAttributes({
			items: { ...items, [key]: value },
		});
	};

	const updateClass = (key, value) => {
		setAttributes({
			items: { ...items, [key]: value },
		});
	};

	const renderIcon = (iconName, iconType) => {
		const iconMap = iconType === "solid" ? iconsListSolid : iconsListOutline;
		const IconComponent = iconMap.find((icon) => icon.name === iconName)?.icon;
		return IconComponent ? <IconComponent /> : null;
	};

	const updateItem = (key, value) => {
		setAttributes({
			items: { ...items, [key]: value },
		});
	};

	// Block Props
	const blockProps = useBlockProps({
		className: cn(
			"aspect-blocks aspect-blocks-accordion-item-editor",
			items.accordionClassName
		),
		...(items.disabled && { disabled: true }),
	});

	// Tag Options
	const tagNameOptions = [
		{ label: "H1", value: "h1" },
		{ label: "H2", value: "h2" },
		{ label: "H3", value: "h3" },
		{ label: "H4", value: "h4" },
		{ label: "H5", value: "h5" },
		{ label: "H6", value: "h6" },
		{ label: "SPAN", value: "span" },
		{ label: "DIV", value: "div" },
		{ label: "P", value: "p" },
	];

	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings mb-3">
					<Accordion className="mb-3">
						<AccordionItem className="accordion-item" id={"item-1"}>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b"
								labelClassName="flex items-center gap-2">
								Accordion Item
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
												value={items.headerLabel}
												onChange={(value) =>
													updateItem(index, "headerLabel", value)
												}
												placeholder={`Header Label ${index + 1}`}
											/> */}
										{/* <DraftEditor
												value={items.content || "{}"} // Ensure that content is a valid JSON object or an empty object
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

										<Switch
											checked={items?.disabled}
											onChange={(value) => updateItem("disabled", value)}
											label="Disabled"
											labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
											className="flex-row-reverse justify-between w-full"
										/>
										<Switch
											checked={items?.iconEnabled}
											onChange={(value) => updateItem("iconEnabled", value)}
											label="Icon Enable"
											labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
											className="flex-row-reverse justify-between w-full"
										/>
										{items?.iconEnabled && (
											<>
												<Select
													options={[
														{ label: "Right", value: "right" },
														{ label: "Left", value: "left" },
													]}
													label="Icon Position"
													labelClassName="text-[11px]"
													value={items?.iconPosition}
													onChange={(value) =>
														updateItem("iconPosition", value)
													}
												/>
												<Icons
													label="Active Icon"
													val={items?.activeIcon}
													update={(value) => updateItem("activeIcon", value)}
													updateIconType={(value) =>
														updateItem("activeIconType", value)
													}
												/>
												<Icons
													label="Inactive Icon"
													val={items?.inactiveIcon}
													update={(value) => updateItem("inactiveIcon", value)}
													updateIconType={(value) =>
														updateItem("inactiveIconType", value)
													}
												/>
											</>
										)}
									</TabContent>
									<TabContent value="item-2" className="space-y-3">
										<TailwindInput
											val={items?.headerClassName}
											update={(value) => updateItem("headerClassName", value)}
											label="Header Class Name"
										/>
										<TailwindInput
											val={items?.activeHeaderClassName}
											update={(value) =>
												updateItem("activeHeaderClassName", value)
											}
											label="Active Header Class Name"
										/>
										<TailwindInput
											val={items?.labelClassName}
											update={(value) => updateItem("labelClassName", value)}
											label="Label Class Name"
										/>
										<TailwindInput
											val={items?.activeLabelClassName}
											update={(value) =>
												updateItem("activeLabelClassName", value)
											}
											label="Active Label Class Name"
										/>
										<TailwindInput
											val={items?.contentClassName}
											update={(value) => updateItem("contentClassName", value)}
											label="Content Class Name"
										/>
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{/* {JSON.stringify(items)} */}
			{/* Block Output */}
			<div {...blockProps}>
				<div
					onClick={() => setOpen(!open)}
					className={cn(
						"aspect-blocks-accordion-header",
						items.headerClassName
					)}>
					<RichText
						className={cn(
							"aspect-blocks-accordion-header-title",
							items.labelClassName
						)}
						tagName="span"
						value={items.headerLabel}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
						onChange={(value) => updateAttribute("headerLabel", value)}
						placeholder="Start Writing..."
					/>
					<span
						className={cn("aspect-blocks-accordion-icon", items.iconClassName)}>
						{open
							? renderIcon(items.openIcon, items.openIconType)
							: renderIcon(items.closeIcon, items.closeIconType)}
					</span>
				</div>

				{/* Accordion Content */}
				{open && (
					<div
						className={cn(
							"aspect-blocks-accordion-content-editor transition-[max-height] duration-300 ease-in-out",
							items.contentClassName
						)}
						style={{
							display: open ? "block" : "none",
							maxHeight: open ? "max-content" : "0",
							overflow: "hidden",
							transition: "max-height 0.3s ease-in-out",
						}}>
						<InnerBlocks
							renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
						/>
					</div>
				)}
			</div>
		</>
	);
}

function SaveComponent() {
	return <InnerBlocks.Content />;
}

