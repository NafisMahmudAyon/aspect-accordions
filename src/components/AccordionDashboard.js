import {
	ClipboardDocumentIcon,
	DocumentDuplicateIcon,
	EyeIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "aspect-ui/Button";
import { Modal, ModalAction, ModalContent } from "aspect-ui/Modal";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";
import React from "react";
import AccordionPreview from "./AccordionPreview";

const AccordionDashboard = ({
	accordions,
	startCreating,
	startEditing,
	startDeleting,
	startCopying,
	// startQuickView,
}) => {
	return (
		<div className="accordion-dashboard">
			<h2 className="text-lg font-bold mb-4">Accordion Dashboard</h2>
			<Button
				onClick={startCreating}
				icon={<PlusCircleIcon className="size-5" />}
				className="mb-4"
				isPrimary>
				Create New Accordion
			</Button>
			<ul className="space-y-4">
				{accordions.map((accordion, index) => {
					var content = JSON.parse(accordion.content);
					var globalOptions = content.global;
					var items = content.items;
					var shortCode = `[aspect_accordions id="${accordion.id}"]`;
					return (
						<li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
							<div className="flex justify-between items-center">
								<p className="font-bold text-sm">{accordion.title}</p>
								<div className="flex gap-2">
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
									<Tooltip direction="top" arrowColor="#a9cdcf">
										<TooltipAction>
											<Button onClick={() => startEditing(accordion)}>
												<PencilSquareIcon className="size-5" />
											</Button>
										</TooltipAction>
										<TooltipContent>
											<p className="text-body1 !text-[11px]">Edit Accordion</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip direction="top" arrowColor="#a9cdcf">
										<TooltipAction>
											<Button onClick={() => startDeleting(accordion.id)}>
												<TrashIcon className="size-5" />
											</Button>
										</TooltipAction>
										<TooltipContent>
											<p className="text-body1 !text-[11px]">
												Delete Accordion
											</p>
										</TooltipContent>
									</Tooltip>
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
									<Tooltip direction="top" arrowColor="#a9cdcf">
										<TooltipAction>
											<Modal>
												<ModalAction>
													<EyeIcon className="size-5" />
												</ModalAction>
												<ModalContent className="p-4 min-w-[600px]">
													<AccordionPreview
														globalOptions={globalOptions}
														items={items}
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
			{accordions.length === 0 && (
				<p className="text-gray-500 text-sm">No accordions available.</p>
			)}
		</div>
	);
};

export default AccordionDashboard;
