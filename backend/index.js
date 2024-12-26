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
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
