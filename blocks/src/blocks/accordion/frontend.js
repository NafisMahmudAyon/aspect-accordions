import React from "react";
import { createRoot } from "react-dom/client";
import iconsListOutline from "../../components/icons/IconListOutline";
import iconsListSolid from "../../components/icons/IconListSolid";

document.addEventListener("DOMContentLoaded", () => {
	const accordionContainers = document.querySelectorAll(
		".aspect-blocks-accordion"
	);

	// Map to store React roots for icon elements
	const iconRoots = new Map();

	const solidIconsMap = Object.fromEntries(
		iconsListSolid.map((item) => [item.name, item.icon])
	);
	const outlineIconsMap = Object.fromEntries(
		iconsListOutline.map((item) => [item.name, item.icon])
	);

	accordionContainers.forEach((accordionContainer) => {
		const allowMultiple =
			accordionContainer.dataset.multiple === "true" ||
			accordionContainer.dataset.multiple === "1";

		const accordionItems = accordionContainer.querySelectorAll(
			".aspect-blocks-accordion-item"
		);

		accordionItems.forEach((accordionItem) => {
			const header = accordionItem.querySelector(
				".aspect-blocks-accordion-header"
			);
			const content = accordionItem.querySelector(
				".aspect-blocks-accordion-content"
			);
			const icon = accordionItem.querySelector(".aspect-blocks-accordion-icon");

			const defaultOpen =
				accordionItem.dataset.open === "true" ||
				accordionItem.dataset.open === "1";

			const openIcon = icon.dataset.openIcon;
			const closeIcon = icon.dataset.closeIcon;
			const openIconType = icon.dataset.openIconType;
			const closeIconType = icon.dataset.closeIconType;

			renderIcon(icon, openIcon, openIconType);

			if (defaultOpen) {
				accordionItem.classList.add("open");
				content.style.height = content.scrollHeight + "px";
				renderIcon(icon, closeIcon, closeIconType);
			}

			header.addEventListener("click", () => {
				if (
					accordionItem.dataset.disabled === "true" ||
					accordionItem.dataset.disabled === "1"
				) {
					return; // Skip disabled items
				}

				const isOpen = accordionItem.classList.contains("open");

				if (allowMultiple) {
					toggleAccordionItem(
						accordionItem,
						isOpen,
						content,
						icon,
						openIcon,
						closeIcon,
						openIconType,
						closeIconType
					);
				} else {
					accordionItems.forEach((item) => {
						const itemContent = item.querySelector(
							".aspect-blocks-accordion-content"
						);
						const itemIcon = item.querySelector(
							".aspect-blocks-accordion-icon"
						);
						const itemIsOpen = item.classList.contains("open");

						if (item !== accordionItem) {
							item.classList.remove("open");
							itemContent.style.height = 0;
							renderIcon(
								itemIcon,
								itemIcon.dataset.openIcon,
								itemIcon.dataset.openIconType
							);
						}

						if (!itemIsOpen) {
							toggleAccordionItem(
								accordionItem,
								false,
								content,
								icon,
								openIcon,
								closeIcon,
								openIconType,
								closeIconType
							);
						}
					});
				}
			});
		});
	});

	function renderIcon(iconElement, iconName, iconType) {
		const iconMap = iconType === "solid" ? solidIconsMap : outlineIconsMap;
		const IconComponent = iconMap[iconName];

		if (IconComponent) {
			// Check if root already exists
			let root = iconRoots.get(iconElement);

			if (!root) {
				// Create root if it doesn't exist
				root = createRoot(iconElement);
				iconRoots.set(iconElement, root);
			}

			// Render the icon component
			root.render(<IconComponent />);
		}
	}

	function toggleAccordionItem(
		accordionItem,
		isOpen,
		content,
		icon,
		openIcon,
		closeIcon,
		openIconType,
		closeIconType
	) {
		const iconMap = openIconType === "solid" ? solidIconsMap : outlineIconsMap;

		if (isOpen) {
			accordionItem.classList.remove("open");
			content.style.height = 0;
			renderIcon(icon, openIcon, openIconType);
		} else {
			accordionItem.classList.add("open");
			content.style.height = content.scrollHeight + "px";
			renderIcon(icon, closeIcon, closeIconType);
		}
	}
});

