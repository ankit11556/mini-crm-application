import { useEffect, useState } from "react";
import { addCustomerApi, editCustomerApi } from "../services/CustomerApi";
import { useLocation, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEditMode = location.state?.customer || null;

  useEffect(() => {
    if (isEditMode) {
      setFormData(isEditMode);
    }
  }, [isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const res = await editCustomerApi(isEditMode._id, formData);
        alert(res.data.message);
        navigate("/all-customer");
      } else {
        const res = await addCustomerApi(formData);
        alert(res.data.message);
        navigate("/all-customer");
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 md:ml-64 mt-12">
      <h2 className="text-2xl font-bold text-indigo-600  text-center pt-4">
        Add Customer
      </h2>

      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 w-full  max-w-lg space-y-4"
        >
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            {isEditMode ? "Edit Customer" : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
