import React from "react";

export const Button = ({
	text = "Button",
	type = "text",
	onClick = () => {},
}) => {
	return (
		<button type={type} onClick={onClick}>
			{text}
		</button>
	);
};
