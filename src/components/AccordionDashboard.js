import React from "react";
import { Button } from "@wordpress/components";

const AccordionDashboard = ({ accordions, startCreating, startEditing }) => {
	return (
		<div>
			<h2>Accordion Dashboard</h2>
			<Button isPrimary onClick={startCreating}>
				Create New Accordion
			</Button>
			<ul>
				{accordions.map((accordion,index) => (
					<li key={index}>
						<Button isLink onClick={() => startEditing(accordion)}>
							{accordion.title}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AccordionDashboard;
