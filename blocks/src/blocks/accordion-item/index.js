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

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	const { attributes, setAttributes } = props;
	const { accordionItem } = attributes;
	const [open, setOpen] = useState(accordionItem.open || true);

	// Common Helper Functions
	const updateAttribute = (key, value) => {
		setAttributes({
			accordionItem: { ...accordionItem, [key]: value },
		});
	};

	const updateClass = (key, value) => {
		setAttributes({
			accordionItem: { ...accordionItem, [key]: value },
		});
	};

	const renderIcon = (iconName, iconType) => {
		const iconMap = iconType === "solid" ? iconsListSolid : iconsListOutline;
		const IconComponent = iconMap.find((icon) => icon.name === iconName)?.icon;
		return IconComponent ? <IconComponent /> : null;
	};

	// Block Props
	const blockProps = useBlockProps({
		className: cn(
			"aspect-blocks aspect-blocks-accordion-item-editor",
			accordionItem.class?.sm,
			accordionItem.class?.md,
			accordionItem.class?.desktop,
			accordionItem.class?.custom,
		),
		...(accordionItem.disabled && { disabled: true }),
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
					<Accordion iconPosition="right">
						{/* Accordion Item Settings */}
						<AccordionItem
							id="accordion-item"
							className="border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1" className="space-y-3">
										{/* <InputData
											val={accordionItem.id}
											update={(e) => updateAttribute("id", e.target.value)}
										/> */}
										{/* <SwitchData
											label="Open Onload"
											val={accordionItem.open}
											update={(e) => updateAttribute("open", e)}
										/>
										<SwitchData
											label="Disabled"
											val={accordionItem.disabled}
											update={(e) => updateAttribute("disabled", e)}
										/>
										<DropdownData
											label="Tag"
											options={tagNameOptions}
											value={accordionItem.tag}
											update={(e) => updateAttribute("tag", e.target.value)}
										/> */}
									</TabContent>
									<TabContent value="item-2">
										{/* <Style
											update={(e) => updateClass("class", e)}
											val={accordionItem.class}
										/> */}
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							id="accordion-item-header"
							className="border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item Header
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1">
										{/* <DropdownData
											label="Header Tag"
											options={tagNameOptions}
											value={accordionItem.headerTag}
											update={(e) =>
												updateAttribute("headerTag", e.target.value)
											}
										/> */}
									</TabContent>
									<TabContent value="item-2">
										{/* <Style
											update={(e) => updateClass("accordionHeaderClass", e)}
											val={accordionItem.accordionHeaderClass}
										/> */}
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							id="accordion-item-header-title"
							className="border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Header Title
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1"></TabContent>
									<TabContent value="item-2">
										{/* <Style
											update={(e) =>
												updateClass("accordionHeaderTitleClass", e)
											}
											val={accordionItem.accordionHeaderTitleClass}
										/> */}
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							id="accordion-item-content"
							className="border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Accordion Item Content
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1">
										{/* <DropdownData
											label="Content Tag"
											options={tagNameOptions}
											value={accordionItem.contentTag}
											update={(e) =>
												updateAttribute("contentTag", e.target.value)
											}
										/> */}
									</TabContent>
									<TabContent value="item-2">
										{/* <Style
											update={(e) => updateClass("accordionContentClass", e)}
											val={accordionItem.accordionContentClass}
										/> */}
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							id="accordion-item-header-icon"
							className="border-primary-200 dark:border-primary-200"
						>
							<AccordionHeader
								className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
								activeHeaderClassName="border-b "
							>
								Header Icon
							</AccordionHeader>
							<AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
								<Tabs defaultActive="item-1">
									<TabList>
										<TabItem value="item-1">Options</TabItem>
										<TabItem value="item-2">Style</TabItem>
									</TabList>
									<TabContent value="item-1">
										{/* <Icons
											label="Open Icon"
											val={accordionItem.openIcon}
											update={(e) => updateAttribute("openIcon", e)}
										/> */}
										{/* <Icons
											label="Close Icon"
											val={accordionItem.closeIcon}
											update={(e) => updateAttribute("closeIcon", e)}
										/> */}
									</TabContent>
									<TabContent value="item-2">
										{/* <Style
											update={(e) => updateClass("accordionIconClass", e)}
											val={accordionItem.accordionIconClass}
										/> */}
									</TabContent>
								</Tabs>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</InspectorControls>
			{/* {JSON.stringify(accordionItem)} */}
			{/* Block Output */}
			<accordionItem.tag {...blockProps}>
				<accordionItem.headerTag
					onClick={() => setOpen(!open)}
					className={cn(
						"aspect-blocks-accordion-header",
						accordionItem.accordionHeaderClass?.sm,
						accordionItem.accordionHeaderClass?.md,
						accordionItem.accordionHeaderClass?.desktop,
						accordionItem.accordionHeaderClass?.custom,
					)}
				>
					<RichText
						className={cn(
							"aspect-blocks-accordion-header-title",
							accordionItem.accordionHeaderTitleClass?.sm,
							accordionItem.accordionHeaderTitleClass?.md,
							accordionItem.accordionHeaderTitleClass?.desktop,
							accordionItem.accordionHeaderTitleClass?.custom,
						)}
						tagName="span"
						value={accordionItem.headerTitle}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
						onChange={(value) => updateAttribute("headerTitle", value)}
						placeholder="Start Writing..."
					/>
					<span
						className={cn(
							"aspect-blocks-accordion-icon",
							accordionItem.accordionIconClass?.sm,
							accordionItem.accordionIconClass?.md,
							accordionItem.accordionIconClass?.desktop,
							accordionItem.accordionIconClass?.custom,
						)}
					>
						{open
							? renderIcon(accordionItem.openIcon, accordionItem.openIconType)
							: renderIcon(
									accordionItem.closeIcon,
									accordionItem.closeIconType,
							  )}
					</span>
				</accordionItem.headerTag>

				{/* Accordion Content */}
				{/* {open && ( */}
				<accordionItem.contentTag
					className={cn(
						"aspect-blocks-accordion-content-editor transition-[max-height] duration-300 ease-in-out",
						accordionItem.accordionContentClass?.sm,
						accordionItem.accordionContentClass?.md,
						accordionItem.accordionContentClass?.desktop,
						accordionItem.accordionContentClass?.custom,
					)}
					style={{
						display: open ? "block" : "none",
						maxHeight: open ? "max-content" : "0",
						overflow: "hidden",
						transition: "max-height 0.3s ease-in-out",
					}}
				>
					<InnerBlocks
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				</accordionItem.contentTag>
				{/* )} */}
			</accordionItem.tag>
		</>
	);
}

function SaveComponent() {
	return <InnerBlocks.Content />;
}
