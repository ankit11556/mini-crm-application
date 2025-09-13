import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const addLeadApi = async (data) => {
  return axios.post(`${API_URL}/leads`,data,
    {withCredentials: true}
  )
}