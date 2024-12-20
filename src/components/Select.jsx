import React from "react";
import { cn } from "./utils/cn";

const Select = ({
	options,
	className="",
  selectClassName="",
  labelClassName="",
	name = "",
	id = "",
	onChange,
	disabled = false,
	label,
}) => {
	return (
		<fieldset className={cn("flex items-center justify-between", className)}>
			{label && (
				<label
					htmlFor={id}
					className={cn(
						"break-all text-body1",
						"text-primary-900 dark:text-primary-900",
						labelClassName
					)}>
					{label}
				</label>
			)}
			<select
				name={name}
				id={id}
				className={cn(
					"text-body1",
					"text-primary-900 dark:text-primary-900",
					selectClassName
				)}
				onChange={onChange}
				disabled={disabled}>
				{options.map((option, i) => (
					<option value={option.value} key={i}>
						{option.label}
					</option>
				))}
			</select>
		</fieldset>
	);
};

export default Select;
