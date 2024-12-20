import { Button } from "aspect-ui/Button";
import React from "react";

const AccordionDashboard = ({ accordions, startCreating, startEditing }) => {
	return (
		<div>
			<h2>Accordion Dashboard</h2>
			<Button onClick={startCreating}>
				Create New Accordion
			</Button>
			<ul>
				{accordions.map((accordion,index) => (
					<li key={index}>
						<Button onClick={() => startEditing(accordion)}>
							{accordion.title}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AccordionDashboard;
