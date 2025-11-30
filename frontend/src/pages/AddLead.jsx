import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { addLeadApi, editLeadApi } from "../services/LeadApi";
import { useEffect } from "react";

const AddLead = () => {
  const { id } = useParams(); // customerId from route

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "New",
    value: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEditMode = location.state?.lead || null;

  useEffect(() => {
    if (isEditMode) {
      setFormData(isEditMode);
    }
  }, [isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, customerId: id };
    try {
      if (isEditMode) {
        const res = await editLeadApi(isEditMode._id, payload);
        alert(res.data.message);
        navigate("/");
      } else {
        const res = await addLeadApi(payload);
        alert(res.data.message);
        navigate(`/customer-detail-page/${id}`); // redirect back to customer detail page
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="ml-64 p-6 mt-16">
      <div className="bg-white shadow rounded-xl p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Value</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
          >
            Add Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
