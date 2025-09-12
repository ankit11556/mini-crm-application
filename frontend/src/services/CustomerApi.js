import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const addCustomerApi = async (data) => {
  return axios.post(`${API_URL}/customers`,data,
   {withCredentials: true}
  )
}