import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import iconsListSolid from "../../components/icons/IconListSolid";
import iconsListOutline from "../../components/icons/IconListOutline";

// IconToggle Component to handle the toggle logic
const IconToggle = ({
	openIconName,
	closeIconName,
	openIconType,
	closeIconType,
	classNames,
}) => {
	const solidIconsMap = Object.fromEntries(
		iconsListSolid.map((item) => [item.name, item.icon]),
	);
	const outlineIconsMap = Object.fromEntries(
		iconsListOutline.map((item) => [item.name, item.icon]),
	);

	// Select the correct icon map based on type
	const openIconMap =
		openIconType === "solid" ? solidIconsMap : outlineIconsMap;
	const closeIconMap =
		closeIconType === "solid" ? solidIconsMap : outlineIconsMap;

	const OpenIconComponent = openIconMap[openIconName];
	const CloseIconComponent = closeIconMap[closeIconName];

	// Ensure the icons are found before rendering
	if (!OpenIconComponent || !CloseIconComponent) {
		console.warn(`Icon not found: ${openIconName} or ${closeIconName}`);
		return null;
	}

	const [isOpen, setIsOpen] = useState(false); // State for toggle behavior

	const toggleIcon = () => {
		setIsOpen((prev) => !prev);
	};

	const IconToRender = isOpen ? CloseIconComponent : OpenIconComponent;

	return (
		<div onClick={toggleIcon} className={classNames}>
			<IconToRender className={classNames} />
		</div>
	);
};

// Function to replace <span> with the corresponding JSX component
function replaceSpansWithIcons() {
	const spans = document.querySelectorAll(
		"span.aspect-blocks-accordion-header-title",
	);
	console.log(spans);
	spans.forEach((span) => {
		console.log(span);
		const { openIconName, closeIconName, openIconType, closeIconType } =
			span.dataset;

		console.log(span.dataset);
		const classNames = span.className;

		// Create the new component
		const root = createRoot(span);
		root.render(
			<IconToggle
				openIconName={openIconName}
				closeIconName={closeIconName}
				openIconType={openIconType}
				closeIconType={closeIconType}
				classNames={classNames}
			/>,
		);
	});
}

// replaceSpansWithIcons()
