import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addCustomerApi = async (data) => {
  return axios.post(`${API_URL}/customers`, data, { withCredentials: true });
};

export const getCustomersApi = async (page = 1, limit = 10, search = "") => {
  return axios.get(`${API_URL}/customers`, {
    params: { page, limit, search },
    withCredentials: true,
  });
};

export const getCustomerDetailApi = async (id) => {
  return axios.get(`${API_URL}/customers/${id}`, { withCredentials: true });
};

export const deleteCustomerApi = async (id) => {
  return axios.delete(`${API_URL}/customers/${id}`, { withCredentials: true });
};

export const editCustomerApi = async (id, data) => {
  return axios.put(`${API_URL}/customers/${id}`, data, {
    withCredentials: true,
  });
};
