// import "../../style.css";

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { useEffect, useState } from "react";
// import DropdownData from "../../components/block-components/dropdown-data";
// import InputData from "../../components/block-components/input-data";
// import SwitchData from "../../components/block-components/switch-data";
import iconsListOutline from "../../components/icons/IconListOutline";
import iconsListSolid from "../../components/icons/IconListSolid";
// import Icons from "../../components/icons/Icons";
// import Style from "../../components/Style";
import { Switch } from "aspect-ui/Switch";
import Select from "../../components/Select";
import TailwindInput from "../../components/TailwindInput";
import Icons from "../../components/icons/Icons";
import { cn } from "../../components/utils/cn";
import metadata from "./block.json";

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
		console.log("Updating key:", key, "with value:", value);
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
	const [activeIcon, setActiveIcon] = useState(items.activeIcon || null);
	useEffect(() => {
		updateItem("activeIcon", activeIcon);
	}, [activeIcon]);
	console.log(items.activeIcon);
	const handleActiveIcon = (iconName) => {
		setActiveIcon(iconName);
	};
	const [inactiveIcon, setInactiveIcon] = useState(items.inactiveIcon || null);
	useEffect(() => {
		updateItem("inactiveIcon", inactiveIcon);
	}, [inactiveIcon]);
	console.log(items.inactiveIcon);
	const handleInactiveIcon = (iconName) => {
		setInactiveIcon(iconName);
	};
	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings mb-3">
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
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
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
										onChange={(value) => updateItem("iconPosition", value)}
									/>
									<Icons
										label="Active Icon"
										val={activeIcon}
										update={handleActiveIcon}
										updateIconType={(e) => {
											updateItem("activeIconType", e);
										}}
									/>
									<Icons
										label="Inactive Icon"
										val={inactiveIcon}
										update={handleInactiveIcon}
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
								update={(value) => updateItem("activeHeaderClassName", value)}
								label="Active Header Class Name"
							/>
							<TailwindInput
								val={items?.labelClassName}
								update={(value) => updateItem("labelClassName", value)}
								label="Label Class Name"
							/>
							<TailwindInput
								val={items?.activeLabelClassName}
								update={(value) => updateItem("activeLabelClassName", value)}
								label="Active Label Class Name"
							/>
							<TailwindInput
								val={items?.contentClassName}
								update={(value) => updateItem("contentClassName", value)}
								label="Content Class Name"
							/>
						</TabContent>
					</Tabs>
				</div>
			</InspectorControls>
			{JSON.stringify(items)}
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
						onChange={(value) => updateItem("headerLabel", value)}
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



