import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({ value, onChange }) => {
	const [editorContent, setEditorContent] = useState(value || "");

	const handleEditorChange = (content, editor) => {
		setEditorContent(content);
		onChange(content); // Pass content back to parent component
	};

	return (
		<div>
			<Editor
				apiKey="your-tinymce-api-key" // You can generate your own free API key on TinyMCE website
				value={editorContent}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste code help wordcount",
					],
					toolbar:
						"undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
					placeholder: "Start typing here...",
				}}
				onEditorChange={handleEditorChange}
			/>
		</div>
	);
};

export default RichTextEditor;
