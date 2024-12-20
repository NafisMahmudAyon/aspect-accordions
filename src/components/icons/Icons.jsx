import { Popover } from "@wordpress/components";
import { useState, useMemo } from "react";
import iconsListOutline from "./IconListOutline";
import iconsListSolid from "./IconListSolid";

const Icons = ({
	label = "Select Icon",
	val,
	update,
	updateIconType,
}) => {
	const [iconType, setIconType] = useState("solid");
	const [open, setOpen] = useState(false);

	// Memoize the icons list and map for performance
	const iconsList = useMemo(
		() => (iconType === "solid" ? iconsListSolid : iconsListOutline),
		[iconType],
	);
	const iconsMap = useMemo(
		() => Object.fromEntries(iconsList.map((item) => [item.name, item.icon])),
		[iconsList],
	);

	// Get the selected icon component
	const SelectedIcon = iconsMap[val];

	return (
		<div className="flex flex-col gap-2 text-[11px] font-medium text-primary-900 dark:text-primary-900">
			<div className="flex items-center justify-between">
				<span>{label}</span>
				<button
					onClick={() => setOpen(!open)}
					className="p-2 border border-primary-900 rounded-md"
					aria-haspopup="true"
					aria-expanded={open}
					aria-label="Select an icon"
				>
					{SelectedIcon ? (
						<SelectedIcon className="size-4 text-primary-900" />
					) : (
						<span className="size-4 text-gray-400">?</span>
					)}
				</button>
			</div>

			{open && (
				<Popover position="bottom right">
					<div className="p-3 bg-primary-200 max-h-[300px] overflow-y-auto light-scrollbar">
						<div className="flex items-center gap-4 mb-4">
							<button
								onClick={() => {
									setIconType("solid");
									updateIconType("solid");
								}}
								className={`px-4 py-2 rounded-md ${
									iconType === "solid"
										? "bg-primary-900 text-white"
										: "bg-gray-200 text-gray-600"
								}`}
							>
								Solid
							</button>
							<button
								onClick={() => {
									setIconType("outline");
									updateIconType("outline");
								}}
								className={`px-4 py-2 rounded-md ${
									iconType === "outline"
										? "bg-primary-900 text-white"
										: "bg-gray-200 text-gray-600"
								}`}
							>
								Outline
							</button>
						</div>
						<div className="grid gap-4 grid-cols-[repeat(5,_minmax(0,_1fr))] place-items-center">
							{iconsList.map((icon, i) => {
								const Icon = icon.icon;
								return (
									<button
										key={i}
										className="flex items-center flex-col text-center p-2 focus:outline-none"
										onClick={() => {
											update(icon.name);
											setOpen(false);
										}}
										aria-label={icon.name}
									>
										<Icon className="w-6 h-6 text-gray-600" />
										{/* <span className="text-xs font-light tracking-wide mt-1">
											{icon.name}
										</span> */}
									</button>
								);
							})}
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
};

export default Icons;
