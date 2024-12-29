import {
	ArchiveBoxIcon,
	ArrowPathRoundedSquareIcon,
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClipboardDocumentIcon,
	DocumentDuplicateIcon,
	EyeIcon,
	PencilSquareIcon,
	Squares2X2Icon,
	SquaresPlusIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "aspect-ui/Button";
import { Modal, ModalAction, ModalContent } from "aspect-ui/Modal";
import { Pagination } from "aspect-ui/Pagination";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";
import qs from "qs";
import React from "react";
import AccordionPreview from "./AccordionPreview";

const AccordionDashboard = ({
	totalPages,
	currentPage,
	handlePageChange,
	postStatus,
	handlePostStatusChange,
	accordions,
	startCreating,
	startEditing,
	startDeleting,
	startCopying,
	// startQuickView,
}) => {
	return (
		<div className="accordion-dashboard">
			{/* <h2 className="text-lg font-bold mb-4">Accordion Dashboard</h2> */}
			<div className="flex gap-5 items-center">
				<Button
					icon={<Squares2X2Icon className="size-5" />}
					className="mb-4"
					onClick={(e) => {
						e.preventDefault();
						handlePostStatusChange("publish");
					}}>
					Published Accordions
				</Button>
				<Button
					icon={<ArchiveBoxIcon className="size-5" />}
					className="mb-4"
					onClick={(e) => {
						e.preventDefault();
						handlePostStatusChange("draft");
					}}>
					Drafted Accordions
				</Button>
				<Button
					icon={<TrashIcon className="size-5" />}
					className="mb-4"
					onClick={(e) => {
						e.preventDefault();
						handlePostStatusChange("trash");
					}}>
					Trashed Accordions
				</Button>
			</div>
			<Button
				onClick={startCreating}
				icon={<SquaresPlusIcon className="size-5" />}
				className="mb-4">
				Create New Accordion
			</Button>
			<ul className="">
				{accordions.map((accordion, index) => {
					var parsedData = qs.parse(accordion?.content, { decode: true });
					const content = Object.keys(parsedData).reduce((acc, key) => {
						const cleanedKey = key.replace(/^amp;/, ""); // Remove the 'amp;' prefix
						acc[cleanedKey] = parsedData[key];
						return acc;
					}, {});
					// var content = accordion?.content;
					// console.log("parsed: ",JSON.parse(content));
					var globalOptions = content?.global;
					var items = content?.items;
					var shortCode = `[aspect_accordions id="${accordion.id}"]`;
					return (
						<li
							key={index}
							className="p-4 bg-gray-100 border-b border-b-gray-200 mb-0 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
							<div className="flex justify-between items-center">
								<p className="font-bold text-sm">{accordion.title}</p>
								<div className="flex gap-2">
									{postStatus === "publish" && (
										<div className="flex items-center gap-2 border border-x-primary-200 rounded-md p-2">
											<span>{shortCode}</span>
											<Tooltip direction="top" arrowColor="#a9cdcf">
												<TooltipAction>
													<ClipboardDocumentIcon
														className="size-5"
														onClick={() =>
															navigator.clipboard.writeText(shortCode)
														}
													/>
												</TooltipAction>
												<TooltipContent>
													<p className="text-body1 !text-[11px]">
														Copy Shortcode
													</p>
												</TooltipContent>
											</Tooltip>
										</div>
									)}
									{(postStatus === "publish" || postStatus === "draft") && (
										<Tooltip direction="top" arrowColor="#a9cdcf">
											<TooltipAction>
												<Button onClick={() => startEditing(accordion)}>
													<PencilSquareIcon className="size-5" />
												</Button>
											</TooltipAction>
											<TooltipContent>
												<p className="text-body1 !text-[11px]">
													Edit Accordion
												</p>
											</TooltipContent>
										</Tooltip>
									)}
									{postStatus !== "trash" && (
										<Tooltip direction="top" arrowColor="#a9cdcf">
											<TooltipAction>
												<Button onClick={() => startCopying(accordion)}>
													<DocumentDuplicateIcon className="size-5" />
												</Button>
											</TooltipAction>
											<TooltipContent>
												<p className="text-body1 !text-[11px]">
													Duplicate Accordion
												</p>
											</TooltipContent>
										</Tooltip>
									)}
									{postStatus === "trash" && (
										<Tooltip direction="top" arrowColor="#a9cdcf">
											<TooltipAction>
												<Button
													onClick={() => startDeleting(accordion.id, "draft")}>
													<ArrowPathRoundedSquareIcon className="size-5" />
												</Button>
											</TooltipAction>
											<TooltipContent>
												<p className="text-body1 !text-[11px]">
													Restore Accordion
												</p>
											</TooltipContent>
										</Tooltip>
									)}
									<Tooltip direction="top" arrowColor="#a9cdcf">
										<TooltipAction>
											<Button onClick={() => startDeleting(accordion.id)}>
												<TrashIcon className="size-5" />
											</Button>
										</TooltipAction>
										<TooltipContent>
											<p className="text-body1 !text-[11px]">
												{postStatus === "trash"
													? "Delete Accordion"
													: "Move to Trash"}
											</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip direction="top" arrowColor="#a9cdcf">
										<TooltipAction>
											<Modal>
												<ModalAction>
													<EyeIcon className="size-5" />
												</ModalAction>
												<ModalContent className="p-4 min-w-[600px] max-h-[600px] overflow-y-auto light-scrollbar">
													<AccordionPreview
														globalOptions={globalOptions}
														items={items}
														quickView={true}
													/>
												</ModalContent>
											</Modal>
										</TooltipAction>
										<TooltipContent>
											<p className="text-body1 !text-[11px]">
												Preview Accordion
											</p>
										</TooltipContent>
									</Tooltip>
									{/* <Button
										isSmall
										isTertiary
										onClick={() => startQuickView(accordion)}>
										Quick View
									</Button> */}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<Pagination
				className="mt-4"
				count={totalPages} // Use totalPages from state
				defaultPage={currentPage} // Use currentPage from state
				boundaryCount={2}
				siblingCount={1}
				showFirstLast={totalPages > 5 ? true : false}
				showNextPrev={true}
				numberType="roman"
				firstButton={<ChevronDoubleLeftIcon className="size-4" />}
				lastButton={<ChevronDoubleRightIcon className="size-4" />}
				nextButton={<ChevronRightIcon className="size-4" />}
				previousButton={<ChevronLeftIcon className="size-4" />}
				onChange={handlePageChange}
			/>
			{accordions.length === 0 && (
				<p className="text-gray-500 text-sm">No accordions available.</p>
			)}
		</div>
	);
};

export default AccordionDashboard;
