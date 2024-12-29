import axios from "axios";
const baseURL =
	"https://phonebook-dmjyqb9yl-shahidafridi-321s-projects.vercel.app/api/persons";

const getAllData = async () => {
	try {
		const response = await axios.get(baseURL, { withCredentials: true });
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
