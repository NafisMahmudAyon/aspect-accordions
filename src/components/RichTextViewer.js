import React from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const RichTextViewer = ({ savedContent }) => {
	let editorState;

	try {
		// Parse saved content and convert it to EditorState
		const contentState = convertFromRaw(JSON.parse(savedContent));
		editorState = EditorState.createWithContent(contentState);
	} catch (error) {
		console.error("Error parsing saved content:", error);
		// Fallback to an empty state if there's an error
		editorState = EditorState.createEmpty();
	}

	return (
		<div style={{ border: "1px solid #ddd", padding: "10px" }}>
			<Editor
				editorState={editorState}
				toolbarHidden={true} // Hide the toolbar for read-only mode
				readOnly={true} // Make the editor read-only
			/>
		</div>
	);
};

export default RichTextViewer;
