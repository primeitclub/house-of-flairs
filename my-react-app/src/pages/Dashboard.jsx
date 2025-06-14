import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const [foundRes, lostRes] = await Promise.all([
          axios.get('http://localhost:5000/api/found-items'),
          axios.get('http://localhost:5000/api/lost-items')
        ]);
        const foundItems = foundRes.data.map(item => ({ ...item, type: 'found' }));
        const lostItems = lostRes.data.map(item => ({ ...item, type: 'lost' }));
        setItems([...foundItems, ...lostItems]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items.');
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const handleDelete = async (item) => {
    const endpoint = item.type === 'lost' ? 'lost-items' : 'found-items';
    try {
      await axios.delete(`http://localhost:5000/api/${endpoint}/${item._id}`);
      setItems(items.filter(i => i._id !== item._id));
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto mt-32 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-[#476930] text-center">Admin Dashboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gradient-to-r from-[#EDFFD3] to-[#B7E397] text-[#315200]">
                <th className="p-3 rounded-tl-lg text-left">Type</th>
                <th className="p-3 text-left">Item Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No items found.</td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr
                    key={item._id}
                    className={
                      idx % 2 === 0
                        ? 'bg-[#F7FAEF] hover:bg-[#E6F4D7] transition'
                        : 'bg-[#F1F8E8] hover:bg-[#E6F4D7] transition'
                    }
                  >
                    <td className="p-3 font-semibold capitalize rounded-l-lg">{item.type}</td>
                    <td className="p-3">{item.itemName}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="p-3 rounded-r-lg">
                      <button
                        onClick={() => handleDelete(item)}
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded shadow transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 