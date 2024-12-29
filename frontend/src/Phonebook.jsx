import React, { useEffect, useState } from "react";
import phoneBookServices from "./services";
import { PhonebookList } from "./PhonebookList";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { Button } from "./Button";

export const Phonebook = () => {
	const [persons, setPersons] = useState([]);
	const [searchPerson, setSearchPerson] = useState("");
	const [newPerson, setNewPerson] = useState({ id: 0, name: "", number: "" });
	const [error, setError] = useState({ isError: false, message: "" });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await phoneBookServices.getAllData();
				setPersons(data);
			} catch (error) {
				setError({ ...error, isError: true, message: error.message });
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	const handleChange = (e) => setSearchPerson(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newPerson.name || !newPerson.number) return;

		const isPersonPresent = persons.find(
			(person) => person.name === newPerson.name
		);
		if (isPersonPresent) {
			const updatedPerson = { ...newPerson, id: isPersonPresent.id };
			const confirm = window.confirm(
				`${isPersonPresent.name} is already in the list. Do you want to update their number?`
			);
			if (confirm) {
				try {
					const response = await phoneBookServices.update(
						isPersonPresent.id,
						updatedPerson
					);
					setPersons((prev) =>
						prev.map((person) =>
							person.id === updatedPerson.id ? response : person
						)
					);
					setNewPerson({ id: 0, name: "", number: "" });
					return;
				} catch (error) {
					setError({ ...error, isError: true, message: error.message });
				}
			}
		} else {
			try {
				const response = await phoneBookServices.create(newPerson);
				setPersons((prev) => [...prev, response]);
				setNewPerson({ id: 0, name: "", number: "" });
			} catch (error) {
				setError({ ...error, isError: true, message: error.message });
			}
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Do you want to delete this record?")) {
			try {
				await phoneBookServices.deleteEntery(id);
				setPersons((prev) => prev.filter((person) => person.id !== id));
			} catch (error) {
				setError({ ...error, isError: true, message: error.message });
			}
		}
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().startsWith(searchPerson.toLowerCase())
	);

	if (loading) return <Loading />;
	if (error.isError) return <Error message={error.message} />;

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
							onChange={(e) =>
								setNewPerson({ ...newPerson, name: e.target.value })
							}
							value={newPerson.name}
						/>
					</div>
					<div>
						Number{" "}
						<input
							type="text"
							onChange={(e) =>
								setNewPerson({ ...newPerson, number: e.target.value })
							}
							value={newPerson.number}
						/>
					</div>
					<Button type="submit" text="Add" />
				</form>
			</div>
			<h2>Numbers</h2>
			{filteredPersons.length ? (
				<PhonebookList items={filteredPersons} handleDelete={handleDelete} />
			) : (
				<p>No contacts matched</p>
			)}
		</div>
	);
};
