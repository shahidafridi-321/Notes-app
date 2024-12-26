const express = require("express");
const app = express();

app.get("/", (resquest, response) => {
	response.send("<h2>Heloo shahid</h2>");
});


const PORT = 3001;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
