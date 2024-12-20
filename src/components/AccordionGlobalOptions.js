import React from "react";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";

const AccordionGlobalOptions = ({ globalOptions, updateGlobalOption }) => {
	return (
		<PanelBody title="Global Options">
			<SelectControl
				label="Icon Position"
				value={globalOptions?.iconPosition}
				options={[
					{ label: "Right", value: "right" },
					{ label: "Left", value: "left" },
				]}
				onChange={(value) => updateGlobalOption("iconPosition", value)}
			/>
			<TextControl
				label="Active Icon"
				value={globalOptions?.activeIcon}
				onChange={(value) => updateGlobalOption("activeIcon", value)}
			/>
		</PanelBody>
	);
};

export default AccordionGlobalOptions;
