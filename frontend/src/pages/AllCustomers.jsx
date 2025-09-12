import { useEffect, useState } from "react";
import { getCustomersApi } from "../services/CustomerApi";


const AllCustomers = () =>{
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // per page items
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomersApi(page, limit, search);  
      setCustomers(res.data.customers);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  return (
    <div className="p-6 md:ml-64 mt-16">
    
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">All Customers</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Company</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.company}</td>
                  <td className="p-3 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                      View
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: pagination.totalPages || 1 }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              page === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllCustomers