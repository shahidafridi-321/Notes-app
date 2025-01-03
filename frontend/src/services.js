import axios from "axios";
const baseURL =
	import.meta.env.MODE === "development"
		? "/api/persons" // Local requests will be proxied to http://localhost:3001/api
		: "https://phonebook-backend-xi.vercel.app/api/persons"; // Production URL

const getAllData = async () => {
	try {
		const response = await axios.get(baseURL);
		return response.data;
	} catch (error) {
		return error;
	}
};

const create = async (newPerson) => {
	try {
		const response = await axios.post(baseURL, newPerson);
		return response.data;
	} catch (error) {
		return error;
	}
};

const update = async (id, updatedPerson) => {
	try {
		const response = await axios.put(`${baseURL}/${id}`, updatedPerson);
		return response.data;
	} catch (error) {
		return error;
	}
};

const deleteEntery = async (id) => {
	try {
		const response = await axios.delete(`${baseURL}/${id}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export default {
	getAllData,
	create,
	update,
	deleteEntery,
};
