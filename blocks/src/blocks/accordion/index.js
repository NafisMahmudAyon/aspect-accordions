// import "../../style.css";

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
// import TailwindInput from "../../components/TailwindInput";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
// import DropdownData from "../../components/block-components/dropdown-data";
// import InputData from "../../components/block-components/input-data";
// import SwitchData from "../../components/block-components/switch-data";
// import Style from "../../components/Style";
import { cn } from "../../components/utils/cn";

registerBlockType(metadata.name, { edit: EditComponent, save: SaveComponent });

function EditComponent(props) {
	var attributes = props.attributes;
	var setAttributes = props.setAttributes;
	var accordion = attributes.accordion;

	function updateTailwindClass(e) {
		setAttributes({ accordion: { ...accordion, class: e } });
	}
	function updateAccordionId(e) {
		setAttributes({ accordion: { ...accordion, id: e.target.value } });
	}
	function handleMultipleChange(e) {
		setAttributes({ accordion: { ...accordion, multiple: e } });
	}
	function updateAccordionTag(e) {
		setAttributes({
			accordion: { ...accordion, tag: e.target.value },
		});
	}

	const blockProps = useBlockProps({
		className: cn(
			"aspect-accordions aspect-accordions-accordion-editor",
			accordion.accordionClassName
		),
	});
	const ALLOWED_BLOCKS = ["aspect-accordions/accordion-item"];
	const MY_TEMPLATE = [
		["aspect-accordions/accordion-item", {}],
		["aspect-accordions/accordion-item", {}],
	];
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		directInsert: true,
		template: MY_TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			<InspectorControls>
				<div className="aspect-blocks-editor-settings">
					<Tabs defaultActive="item-1">
						<TabList className="px-3">
							<TabItem value="item-1">Options</TabItem>
							<TabItem value="item-2">Style</TabItem>
						</TabList>
						<TabContent value="item-1" className="space-y-3 py-3 px-3">
							{/* <InputData val={accordion.id} update={updateAccordionId} /> */}
							{/* <SwitchData
								label="Open Multiple"
								val={accordion.multiple}
								update={handleMultipleChange}
							/> */}
						</TabContent>
						<TabContent value="item-2">
							{/* <Style
								update={updateTailwindClass}
								val={accordion.accordionClassName}
							/> */}
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
