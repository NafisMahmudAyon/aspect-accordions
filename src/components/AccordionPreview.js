import { Switch } from "aspect-ui";
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import React, { useState } from "react";
import IconSelector from "./icons/IconSelector";
import MarkdownEditor from "./MarkdownEditor";

const AccordionPreview = ({
	globalOptions,
	items,
	className,
	updateItem,
	quickView = false,
}) => {
	console.log("Preview props:", { globalOptions, items });
	console.log("first", items[0].headerClassName);

	// Determine active items based on global options
	const activeItems =
		globalOptions?.activeItems?.map((index) => `item-${index + 1}`) || [];

	const [preview, setPreview] = useState(false);
	console.log(items.disabled);

	// console.log("Preview props:", { globalOptions, items });
	// console.log("first",items[0].headerClassName);

	return (
		<div className={`accordion-preview font-poppins ${className}`}>
			<h3>Accordion Preview</h3>
			<Accordion
				activeItem={activeItems}
				iconEnabled={globalOptions.iconEnabled}
				iconPosition={globalOptions.iconPosition}
				className={globalOptions.accordionClassName}
				reset={true}>
				{items.map((item, index) => {
					return (
						<AccordionItem
							key={index}
							id={`item-${index + 1}`}
							disabled={item.disabled === "true" ? true : false}>
							<AccordionHeader
								iconEnabled={item.iconEnabled}
								iconPosition={item.iconPosition}
								iconClassName={item.iconClassName}
								activeIconClassName={item.activeIconClassName}
								activeIcon={
									item.activeIcon ? (
										<IconSelector
											iconType={item.activeIconType}
											iconName={item.activeIcon}
										/>
									) : (
										<IconSelector
											iconType={globalOptions.activeIconType}
											iconName={globalOptions.activeIcon}
										/>
									)
								}
								inactiveIcon={
									item.inactiveIcon ? (
										<IconSelector
											iconType={item.inactiveIconType}
											iconName={item.inactiveIcon}
										/>
									) : (
										<IconSelector
											iconType={globalOptions.inactiveIconType}
											iconName={globalOptions.inactiveIcon}
										/>
									)
								}
								className={item.headerClassName}
								labelClassName={item.labelClassName}
								activeHeaderClassName={item.activeHeaderClassName}
								activeLabelClassName={item.activeLabelClassName}>
								{item.headerLabel}
							</AccordionHeader>

							{/* <AccordionContent
								className={item.contentClassName}
								dangerouslySetInnerHTML={{
									__html: qs.unescape(item.content),
								}}
							/> */}

							{!quickView && (
								<AccordionContent className={item.contentClassName}>
									<Switch
										checked={preview}
										onChange={(value) => setPreview(value)}
										label="Preview?"
										labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
										className="flex-row-reverse justify-between w-full"
									/>
									{preview ? (
										<div dangerouslySetInnerHTML={{ __html: item.content }} />
									) : (
										<MarkdownEditor
											value={item.content || ""}
											onChange={(value) => updateItem(index, "content", value)}
											placeholder="Start typing..."
										/>
									)}
								</AccordionContent>
							)}
							{quickView && (
								<AccordionContent
									className={item.contentClassName}
									dangerouslySetInnerHTML={{ __html: item.content }}
								/>
							)}
							{/* <AccordionContent
								className={item.contentClassName}
								dangerouslySetInnerHTML={{ __html: item.content }}
							/> */}
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default AccordionPreview;
