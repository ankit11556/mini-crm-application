import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addLeadApi = async (data) => {
  return axios.post(`${API_URL}/leads`, data, { withCredentials: true });
};

export const deleteLeadApi = async (id) => {
  return axios.delete(`${API_URL}/leads/${id}`, { withCredentials: true });
};

export const editLeadApi = async (id, data) => {
  return axios.put(`${API_URL}/leads/${id}`, data, { withCredentials: true });
};
