import React from "react";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { Dropdown } from "aspect-ui";
import Select from "./Select";

const AccordionGlobalOptions = ({ globalOptions, updateGlobalOption }) => {
	return (
		<>
			<Select
				options={[
					{ label: "Active", value: "active" },
					{ label: "Inactive", value: "inactive" },
				]}
				label="Active Status"
				value={globalOptions?.activeItems}
				onChange={(value) => updateGlobalOption("activeItems", value)}
			/>
			<Select
				options={[
					{ label: "Right", value: "right" },
					{ label: "Left", value: "left" },
				]}
				label="Icon Position"
				value={globalOptions?.iconPosition}
				onChange={(value) => updateGlobalOption("iconPosition", value)}
			/>
			<TextControl
				label="Active Icon"
				value={globalOptions?.activeIcon}
				onChange={(value) => updateGlobalOption("activeIcon", value)}
			/>
		</>
	);
};

export default AccordionGlobalOptions;
