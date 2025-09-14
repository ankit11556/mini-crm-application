import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerDetailApi } from "../services/CustomerApi";
import { Link } from "react-router-dom";
import { deleteLeadApi } from "../services/LeadApi";

const  CustomerDetailPage = ()=> {

  const navigate = useNavigate()

  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = async (id) => {
    try {
      const res = await deleteLeadApi(id)
      alert(res.data.message);

     const newLeads = leads.filter((lead)=>lead._id !==id)
      setLeads(newLeads)
    } catch (error) {
      console.log(res.data?.message);
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCustomerDetailApi(id);   
        setCustomer(res.data);
        setLeads(res.data.leads || []);
      } catch (err) {
        console.error("Error fetching customer detail:", err);
      }
    };
    fetchData();
  }, [id]);

  // Filtered leads by status
  const filteredLeads =
    statusFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  return (
    <div className="ml-64 p-6">
      {/* Customer Details */}
      {customer && (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Customer Details</h2>
          <p><span className="font-semibold">Name:</span> {customer.name}</p>
          <p><span className="font-semibold">Email:</span> {customer.email}</p>
          <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
          <p><span className="font-semibold">Company:</span> {customer.company}</p>
        </div>
      )}

      {/* Leads Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Leads</h2>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg p-2 text-sm"
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Add Lead Button */}
          <Link to={`/customer-detail-page/${customer?._id}/add-lead`}>
          <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            + Add Lead
          </button>
          </Link>
        </div>

        {/* Leads Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Value</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{lead.title}</td>
                  <td className="p-3 border">{lead.description}</td>
                  <td className="p-3 border">{lead.status}</td>
                  <td className="p-3 border">₹{lead.value}</td>
                  <td className="p-3 border">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border space-x-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={()=>navigate("/customer-detail-page/:id/add-lead",{state: {lead:lead}})}
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={()=>handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerDetailPage