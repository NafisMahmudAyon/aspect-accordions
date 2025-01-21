import React from "react";

const RichTextViewer = ({ savedContent }) => {
	if (!savedContent) {
		return <p>No content available</p>;
	}

	return (
		<div
			className="rich-text-viewer"
			dangerouslySetInnerHTML={{ __html: savedContent }}
		/>
	);
};

export default RichTextViewer;
