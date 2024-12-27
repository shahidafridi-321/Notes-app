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
				setPersons(prev=> [...prev,data]);
			} catch (error) {
				setError({
					...error,
					isError: true,
					message: error.message || "An unknown error occurred",
				});
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	const handleChange = (e) => {
		setSearchPerson(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newPerson.name || !newPerson.number) return;

		const newPersonLocal = { name: newPerson.name, number: newPerson.number };

		const isPersonPresent = persons.find(
			(person) => person.name === newPersonLocal.name
		);
		if (isPersonPresent) {
			const updatedPerson = { id: isPersonPresent.id, ...newPersonLocal };
			const confirm = window.confirm(
				`${isPersonPresent.name} is already in the list. Do you want to update the number?`
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
					setError({
						isError: true,
						message: error.message || "Failed to update contact",
					});
				}
			}
			return;
		}

		try {
			const response = await phoneBookServices.create(newPersonLocal);
			setPersons((prev) => [...prev, response]);
			setNewPerson({ id: 0, name: "", number: "" });
		} catch (error) {
			setError({
				isError: true,
				message: error.message || "Failed to add contact",
			});
		}
	};

	const handleNameChange = (e) => {
		setNewPerson({
			...newPerson,
			name: e.target.value,
		});
	};

	const handleNumberChange = (e) => {
		setNewPerson({ ...newPerson, number: e.target.value });
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm(`Do you really want delete this record?`);
		if (confirm) {
			try {
				await phoneBookServices.deleteEntery(id);
				setPersons((prev) => prev.filter((person) => person.id !== id));
			} catch (error) {
				setError({
					...error,
					isError: true,
					message: error.message || "An unknown error occurred",
				});
			} finally {
				setLoading(false);
			}
		}
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().startsWith(searchPerson.toLowerCase())
	);
	if (loading) {
		return <Loading />;
	}
	return error.isError ? (
		<Error message={error.message} />
	) : (
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
					<Button type="submit" text="Add" />
				</form>
			</div>
			<h2>Numbers</h2>
			{filteredPersons.length > 0 ? (
				<PhonebookList items={filteredPersons} handleDelete={handleDelete} />
			) : (
				<p>No contact mached</p>
			)}
		</div>
	);
};
