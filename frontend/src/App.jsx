import React from "react";
import { Phonebook } from "./Phonebook";
function App() {
	const persons = [
		{
			id: "1",
			name: "shahid",
			number: "89742748",
		},
		{ id: "2", name: "shaheen", number: "89742748" },
		{ id: "3", name: "kamran", number: "89742748" },
	];

	return (
		<>
			<Phonebook data={persons} />
		</>
	);
}

export default App;
