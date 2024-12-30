import React, { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({ value, onChange, placeholder }) => {
	const [editorState, setEditorState] = useState(() => {
		if (value) {
			try {
				const contentState = convertFromRaw(JSON.parse(value));
				return EditorState.createWithContent(contentState);
			} catch (error) {
				console.error("Failed to parse editor content:", error);
				return EditorState.createEmpty();
			}
		}
		return EditorState.createEmpty();
	});

	const handleEditorChange = (state) => {
		setEditorState(state);
		const content = convertToRaw(state.getCurrentContent());
		onChange?.(JSON.stringify(content)); // Serialize the content to JSON
	};

	return (
		<div style={{ border: "1px solid #ddd", padding: "10px" }}>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorChange}
				placeholder={placeholder || "Start writing..."}
				toolbar={{
					options: [
						"inline",
						"blockType",
						"fontSize",
						"list",
						"textAlign",
						"link",
						"embedded",
						"emoji",
						"image",
						"remove",
						"history",
					],
					inline: { options: ["bold", "italic", "underline", "strikethrough"] },
					list: { options: ["unordered", "ordered"] },
					textAlign: { options: ["left", "center", "right", "justify"] },
				}}
			/>
		</div>
	);
};

export default DraftEditor;
