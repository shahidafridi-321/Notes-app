import React, { useState } from "react";

export const Phonebook = ({ data }) => {
	const [persons, setPersons] = useState(data);
	const [searchPerson, setSearchPerson] = useState("");
	const [newPerson, setNewPerson] = useState({ id: 0, name: "", number: "" });

	const handleChange = (e) => {
		setSearchPerson(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newPerson.name || !newPerson.number) {
			return;
		}
		const isPersonPresent = persons.find(
			(person) => person.name === newPerson.name
		);
		if (isPersonPresent) {
			const updatedPerson = {
				id: isPersonPresent.id,
				name: newPerson.name,
				number: newPerson.number,
			};
			const confirm = window.confirm(
				`${isPersonPresent.name} is already in the list . Do you update The number?`
			);
			if (confirm) {
				setPersons((prev) =>
					prev.map((person) =>
						person.id == updatedPerson.id ? updatedPerson : person
					)
				);
				setNewPerson({ id: 0, name: "", number: "" });
				return;
			} else return;
		}
		setPersons([...persons, newPerson]);
		setNewPerson({ id: 0, name: "", number: "" });
	};

	const handleNameChange = (e) => {
		setNewPerson({
			...newPerson,
			name: e.target.value,
			id: persons.length + 1,
		});
	};

	const handleNumberChange = (e) => {
		setNewPerson({ ...newPerson, number: e.target.value });
	};
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().startsWith(searchPerson.toLowerCase())
	);
	return (
		<div>
			<h1>Phonebook</h1>
			<div>
				<p>Filter shown with</p>
				<input type="text" onChange={handleChange} value={searchPerson} />
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						Name{" "}
						<input
							type="text"
							onChange={handleNameChange}
							value={newPerson.name}
						/>
					</div>
					<div>
						Number{" "}
						<input
							type="number"
							onChange={handleNumberChange}
							value={newPerson.number}
						/>
					</div>
					<button type="submit">Add</button>
				</form>
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
