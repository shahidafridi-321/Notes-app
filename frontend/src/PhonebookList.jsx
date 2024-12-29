import React from "react";
import { Button } from "./Button";
export const PhonebookList = ({ items, handleDelete }) => {
	return (
		<div>
			<ul>
				{items.map((person) => (
					<li key={person.id}>
						{person.name} {person.number}{" "}
						<Button
							type="button"
							text="Delete"
							onClick={() => handleDelete(person.id)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
