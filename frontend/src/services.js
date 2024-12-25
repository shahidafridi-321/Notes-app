import axios from "axios";
const baseURL = "http://localhost:3000/persons";

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

export default {
	getAllData,
	create,
};
