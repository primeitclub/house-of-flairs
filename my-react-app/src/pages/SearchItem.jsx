import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Vehicles",
  "ATM",
  "Docs",
  "Electronics",
  "Others",
];

function SearchItem() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemType, setItemType] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const [foundRes, lostRes] = await Promise.all([
          axios.get('http://localhost:5000/api/found-items'),
          axios.get('http://localhost:5000/api/lost-items')
        ]);
        // Add a type to each item for display
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

  useEffect(() => {
    let filtered = items;
    if (itemType !== "All") {
      filtered = filtered.filter(item => item.type === itemType);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [items, selectedCategory, searchTerm, itemType]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen mt-30 flex justify-center items-center">
          <p className="text-gray-600">Loading items...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen mt-30 flex justify-center items-center">
          <p className="text-red-600">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-lime-100 to-white py-10 font-inter">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-900">Search Items</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
            <input
              type="text"
              placeholder="Search by item name or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-md font-semibold border transition-colors duration-200 ${itemType === 'found' ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-700 border-green-300 hover:bg-green-50'}`}
              onClick={() => setItemType('found')}
            >
              Found
            </button>
            <button
              className={`px-6 py-2 rounded-md font-semibold border transition-colors duration-200 ${itemType === 'lost' ? 'bg-red-600 text-white border-red-700' : 'bg-white text-red-700 border-red-300 hover:bg-red-50'}`}
              onClick={() => setItemType('lost')}
            >
              Lost
            </button>
            <button
              className={`px-6 py-2 rounded-md font-semibold border transition-colors duration-200 ${itemType === 'All' ? 'bg-gray-200 text-gray-700 border-gray-400' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setItemType('All')}
            >
              All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center text-lg">Loading...</div>
            ) : error ? (
              <div className="col-span-3 text-center text-red-600">{error}</div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">No items found.</div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
                >
                  <img
                    src={item.image ? `http://localhost:5000${item.image}` : '/placeholder.png'}
                    alt={item.itemName}
                    className="rounded-lg h-40 object-cover mb-3"
                  />
                  <h4 className="text-lg font-semibold">{item.itemName}</h4>
                  <span className="text-sm text-gray-600">
                    Location: {item.location}
                  </span>
                  <span className="text-sm text-gray-600 mb-2">
                    {item.type === 'found' ? 'Found Date' : 'Lost Date'}: {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full w-fit mb-3 ${item.type === 'found' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {item.category}
                  </span>
                  <button
                    onClick={() => navigate(`/items/${item.type}/${item._id}`)}
                    className="mt-auto bg-[#86B049] hover:bg-[#476930] text-white px-4 py-2 rounded-md font-medium cursor-pointer"
                  >
                    Alert Finder
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SearchItem;
