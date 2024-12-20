import { Switch } from "aspect-ui/Switch";
import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import React from "react";
import Icons from "./icons/Icons";
import Select from "./Select";
import TailwindInput from "./TailwindInput";
const AccordionGlobalOptions = ({
	globalOptions,
	itemsLength,
	updateGlobalOption,
}) => {
	let activeTab = "item-1";
	console.log(activeTab);
	return (
		<>
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
					<Select
						options={[
							{ label: "Right", value: "right" },
							{ label: "Left", value: "left" },
						]}
						label="Icon Position"
						labelClassName="text-[11px]"
						value={globalOptions?.iconPosition}
						onChange={(value) => updateGlobalOption("iconPosition", value)}
					/>
					<Switch
						checked={globalOptions?.iconEnabled}
						onChange={(value) => updateGlobalOption("iconEnabled", value)}
						label="Icon Enable"
						labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
						className="flex-row-reverse justify-between w-full"
					/>
					{globalOptions?.iconEnabled && (
						<>
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
								update={(value) => updateGlobalOption("inactiveIcon", value)}
								updateIconType={(value) =>
									updateGlobalOption("inactiveIconType", value)
								}
							/>
						</>
					)}
					<div className="flex flex-col gap-2">
						<label
							htmlFor=""
							className="text-[11px] text-primary-900 dark:text-primary-900">
							Active Items
						</label>
						<div className="flex flex-wrap gap-3">
							{itemsLength > 0 &&
								Array.from({ length: itemsLength }, (_, index) => (
									<div key={index} className="flex items-center gap-2">
										<input
											type="checkbox"
											className="w-4 h-4 !m-0"
											checked={globalOptions?.activeItems?.includes(index)}
											onChange={(e) => {
												const activeItems = [...globalOptions?.activeItems];
												if (e.target.checked) {
													activeItems.push(index);
												} else {
													activeItems.splice(activeItems.indexOf(index), 1);
												}
												updateGlobalOption("activeItems", activeItems);
											}}
										/>
										<label htmlFor="" className="text-[11px] text-primary-900 dark:text-primary-900">{`Item ${
											index + 1
										}`}</label>
									</div>
								))}
						</div>
					</div>
				</TabContent>
				<TabContent value="item-2" className="space-y-3 py-3 px-3">
					<TailwindInput
						val={globalOptions?.accordionClassName}
						update={(value) => updateGlobalOption("accordionClassName", value)}
						label="Accordion Class Name"
					/>
					<TailwindInput
						val={globalOptions?.headerClassName}
						update={(value) => updateGlobalOption("headerClassName", value)}
						label="Header Class Name"
					/>
					<TailwindInput
						val={globalOptions?.activeHeaderClassName}
						update={(value) =>
							updateGlobalOption("activeHeaderClassName", value)
						}
						label="Active Header Class Name"
					/>
					<TailwindInput
						val={globalOptions?.labelClassName}
						update={(value) => updateGlobalOption("labelClassName", value)}
						label="Label Class Name"
					/>
					<TailwindInput
						val={globalOptions?.activeLabelClassName}
						update={(value) =>
							updateGlobalOption("activeLabelClassName", value)
						}
						label="Active Label Class Name"
					/>
					<TailwindInput
						val={globalOptions?.contentClassName}
						update={(value) => updateGlobalOption("contentClassName", value)}
						label="Content Class Name"
					/>
				</TabContent>
			</Tabs>
		</>
	);
};

export default AccordionGlobalOptions;
