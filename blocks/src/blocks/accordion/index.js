// import required dependencies
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import { cn } from "../../components/utils/cn";
import TailwindInput from "../../components/TailwindInput";
import { Switch } from "aspect-ui/Switch";
import Select from "../../components/Select";
import Icons from "../../components/icons/Icons";

registerBlockType(metadata.name, {
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent(props) {
	const { attributes, setAttributes } = props;
	const { globalOptions } = attributes;

	const updateGlobalOption = (key, value) => {
		setAttributes({
			globalOptions: { ...globalOptions, [key]: value },
		});
	};

	const blockProps = useBlockProps({
		className: cn(
			"aspect-accordions aspect-accordions-accordion-editor",
			globalOptions.accordionClassName
		),
	});

	const ALLOWED_BLOCKS = ["aspect-accordions/accordion-item"];
	const MY_TEMPLATE = [
		["aspect-accordions/accordion-item", {}],
		["aspect-accordions/accordion-item", {}],
	];

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: MY_TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings">
					<Tabs defaultActive="item-1">
						<TabList className="px-3">
							<TabItem
								value="item-1"
								activeClassName="!bg-primary-900 !text-white dark:!bg-primary-900 dark:!text-white"
								className="px-4 py-2 rounded-md bg-gray-200 text-gray-600">
								Options
							</TabItem>
							<TabItem
								value="item-2"
								activeClassName="!bg-primary-900 !text-white dark:!bg-primary-900 dark:!text-white"
								className="px-4 py-2 rounded-md bg-gray-200 text-gray-600">
								Style
							</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
							<Switch
								checked={globalOptions?.iconEnabled}
								onChange={(value) => updateGlobalOption("iconEnabled", value)}
								label="Icon Enable"
								className="flex-row-reverse justify-between w-full"
							/>
							{globalOptions?.iconEnabled && (
								<>
									<Select
										options={[
											{ label: "Right", value: "right" },
											{ label: "Left", value: "left" },
										]}
										label="Icon Position"
										value={globalOptions?.iconPosition}
										onChange={(value) =>
											updateGlobalOption("iconPosition", value)
										}
									/>
									<Icons
										label="Active Icon"
										val={globalOptions?.activeIcon}
										update={(value) => updateGlobalOption("activeIcon", value)}
										updateIconType={(value) =>
											updateGlobalOption("activeIconType", value)
										}
									/>
									<Icons
										label="Inactive Icon"
										val={globalOptions?.inactiveIcon}
										update={(value) =>
											updateGlobalOption("inactiveIcon", value)
										}
										updateIconType={(value) =>
											updateGlobalOption("inactiveIconType", value)
										}
									/>
								</>
							)}
						</TabContent>
						<TabContent value="item-2" className="space-y-3 py-3 px-3">
							<TailwindInput
								val={globalOptions?.accordionClassName}
								update={(value) =>
									updateGlobalOption("accordionClassName", value)
								}
								label="Accordion Class Name"
							/>
							<TailwindInput
								val={globalOptions?.headerClassName}
								update={(value) => updateGlobalOption("headerClassName", value)}
								label="Header Class Name"
							/>
						</TabContent>
					</Tabs>
				</div>
			</InspectorControls>
			<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
		</>
	);
}

function SaveComponent() {
	return <InnerBlocks.Content />;
}
