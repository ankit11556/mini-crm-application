import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerApi } from "../services/AuthApi";

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await registerApi(formData)
     alert(res.data.message)
     navigate("/login")
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

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
          type="passwordHash"
          name="passwordHash"
          placeholder="Password"
          value={formData.passwordHash}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>
        <p className="text-sm text-black mt-5">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline ">Login here</Link>
        </p>
      </form>
    </div>
  );
}
