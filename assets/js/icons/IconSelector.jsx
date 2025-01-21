import React, { useMemo } from "react";
import iconsListOutline from "./IconListOutline";
import iconsListSolid from "./IconListSolid";

const IconSelector = ({ iconType, iconName, className = "" }) => {
	// Determine the icon list based on the type
	const iconList = useMemo(
		() => (iconType === "solid" ? iconsListSolid : iconsListOutline),
		[iconType]
	);

	// Map icon names to their components
	const iconMap = useMemo(
		() => Object.fromEntries(iconList.map((item) => [item.name, item.icon])),
		[iconList]
	);

	// Select the icon component
	const SelectedIcon = iconMap[iconName] || null;

	return SelectedIcon ? <SelectedIcon className={className} /> : null;
};

export default IconSelector;
