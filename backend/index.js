let persons = [
	{
		id: "3",
		name: "Dan Abramov",
		number: "878887788",
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: "4",
	},
	{
		id: "6371",
		name: "khan",
		number: "888",
	},
];

const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (resquest, response) => {
	response.send("<h2>Heloo shahid</h2>");
});

app.get("/api/persons", (request, response) => {
	if (!persons) {
		response.status(404).end();
	}
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);
	person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

const generateID = () => {
	return String(Math.floor(Math.random() * 10000 + persons.length + 1));
};

app.post("/api/persons/", (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "Name or number is missing",
		});
	}
	const isPersonPresent = persons.find((person) => person.name == body.name);

	if (isPersonPresent) {
		return response.status(400).json({
			error: "This person is already in list",
		});
	}
	const newPerson = {
		name: body.name,
		number: body.number,
		id: generateID(),
	};
	persons = persons.concat(newPerson);
	response.json(newPerson);
});
app.put("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const body = request.body;
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "Name or number is missing",
		});
	}
	const isPersonPresent = persons.find((person) => person.id === id);
	if (isPersonPresent) {
		const updatedPerson = {
			id: id,
			name: body.name,
			number: body.number,
		};
		persons = persons.map((person) =>
			person.id === id ? updatedPerson : person
		);
		return response.json(updatedPerson);
	}
	return response.status(400).json({
		error: "No match found , create now person",
	});
});
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});