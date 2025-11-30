import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../services/AuthApi";
import { useAuth } from "../contexts/AuthContext";

const Login = () =>{

  const navigate = useNavigate()

  const {setIsAutheticated,setUser} = useAuth();

  const [formData, setFormData] = useState({ email: "", passwordHash: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await  loginApi(formData)
      alert(res.data.message)
      setIsAutheticated(true)
      setUser(res.data.user)
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message)
    }
  };

  return (
    <div className="flex  items-center h-screen bg-gray-100 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md  max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="passwordHash"
          placeholder="password"
          value={formData.passwordHash}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-black mt-5">
         Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline ">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login