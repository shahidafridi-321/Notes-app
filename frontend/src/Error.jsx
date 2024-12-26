import React from "react";

export const Error = ({ message }) => {
	return (
		<div>
			<h2>Some thing when wrong</h2>
			<p>{message}</p>
		</div>
	);
};
