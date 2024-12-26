import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const MarkdownEditor = ({ value, onChange }) => {
	const [editorValue, setEditorValue] = useState(value || "");

	const handleChange = (value) => {
		setEditorValue(value);
		onChange(value); // Notify the parent component of the content change
	};

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["bold", "italic", "underline", "strike"],
			["blockquote"],
			["link"],
			[{ align: [] }],
			["clean"], // Clear formatting
		],
	};

	return (
		<div>
			<ReactQuill
				value={editorValue}
				onChange={handleChange}
				modules={modules}
				theme="snow"
			/>
		</div>
	);
};

export default MarkdownEditor;
