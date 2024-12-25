import React, { useState } from "react";

export const Phonebook = ({ data }) => {
	const [persons, setPersons] = useState(data);
	const [searchPerson, setSearchPerson] = useState("");

	const handleChange = (e) => {
		setSearchPerson(e.target.value);
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().startsWith(searchPerson.toLowerCase())
	);
	return (
		<div>
			<h1>Phonebook</h1>
			<div>
				Search{" "}
				<input type="text" onChange={handleChange} value={searchPerson} />
			</div>
			<ul>
				{filteredPersons.map((person) => (
					<li key={person.id}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};
