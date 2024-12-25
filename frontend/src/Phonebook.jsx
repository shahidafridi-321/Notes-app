import React, { useEffect, useState } from "react";
import phoneBookServices from "./services";

export const Phonebook = () => {
	const [persons, setPersons] = useState([]);
	const [searchPerson, setSearchPerson] = useState("");
	const [newPerson, setNewPerson] = useState({ id: 0, name: "", number: "" });

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await phoneBookServices.getAllData();
				setPersons(data);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, []);

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

	const generateID = () => {
		return Math.floor(Math.random() * 100000 + persons.length + 1);
	};

	const handleNameChange = (e) => {
		setNewPerson({
			...newPerson,
			name: e.target.value,
			id: generateID(),
		});
	};

	const handleNumberChange = (e) => {
		setNewPerson({ ...newPerson, number: e.target.value });
	};

	const handleDelete = (id) => {
		const confirm = window.confirm(`Do you really want delete this record?`);
		if (confirm) {
			setPersons((prev) => prev.filter((person) => person.id !== id));
		}
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
			<h2>Numbers</h2>
			{filteredPersons.length > 0 ? (
				<ul>
					{filteredPersons.map((person) => (
						<li key={person.id}>
							{person.name} {person.number}{" "}
							<button type="button" onClick={() => handleDelete(person.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>No contact mached</p>
			)}
		</div>
	);
};
