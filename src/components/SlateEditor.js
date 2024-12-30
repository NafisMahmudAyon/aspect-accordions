import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

export const SlateEditor = ({ value, onChange, placeholder }) => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [editorValue, setEditorValue] = useState(
		value || [{ type: "paragraph", children: [{ text: "" }] }]
	);

	const handleChange = (newValue) => {
		setEditorValue(newValue);
		onChange(JSON.stringify(newValue)); // Serialize the Slate JSON
	};

	return (
		<div style={{ border: "1px solid #ddd", padding: "10px" }}>
			<Slate editor={editor} value={editorValue} onChange={handleChange}>
				<Editable placeholder={placeholder} />
			</Slate>
		</div>
	);
};
