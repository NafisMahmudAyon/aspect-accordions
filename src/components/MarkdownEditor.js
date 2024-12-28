import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify"; // Import DOMPurify
import "react-quill/dist/quill.snow.css"; // Import styles

const MarkdownEditor = ({ value, onChange }) => {
	const [editorValue, setEditorValue] = useState(value || "");
	const quillRef = useRef(null);

	const handleChange = (value) => {
		// Sanitize the value
		const sanitizedValue = DOMPurify.sanitize(value);
    // console.log("sanitizedValue: ",sanitizedValue);
    // console.log("stringifyValue: ",JSON.stringify(sanitizedValue));
		setEditorValue(value);
    console.log("markdown: ",value)
		onChange(value); // Notify the parent component of the sanitized content
	};

	const handleImageUpload = (file) => {
		// You can upload the image to a server or use base64 for local images
		const reader = new FileReader();
		reader.onload = () => {
			const imageUrl = reader.result; // Get base64 image URL (can replace with server URL)
			const quill = quillRef.current.getEditor();
			const range = quill.getSelection();
			quill.insertEmbed(range.index, "image", imageUrl); // Insert the image at cursor position
		};
		reader.readAsDataURL(file); // Convert file to base64
	};

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["bold", "italic", "underline", "strike"],
			["blockquote"],
			["link"],
			[{ align: [] }],
			["image"], // Add image to the toolbar for inserting images
			["clean"], // Clear formatting
		],
	};

	const handleImageClick = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = (e) => {
			const file = e.target.files[0];
			if (file) {
				handleImageUpload(file);
			}
		};
		input.click();
	};

	return (
		<div>
			<ReactQuill
				ref={quillRef}
				value={editorValue}
				onChange={handleChange}
				modules={modules}
				theme="snow"
			/>
			{/* <button onClick={handleImageClick}>Upload Image</button> */}
		</div>
	);
};

export default MarkdownEditor;
