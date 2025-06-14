import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Vehicles",
  "Personal Items",
  "Clothes",
  "Backpacks",
  "Wallets",
  "Keys",
  "ATM",
  "Instruments",
  "Sports",
  "Tools",
  "Documents",
  "Others",
];

function SearchItem() {
  const [selectedCategory, setSelectedCategory] = useState("Vehicle");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const filtered =
      selectedCategory === "All"
        ? items
        : items.filter(
            (item) =>
              item.category &&
              item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
          );
    setFilteredItems(filtered);
  }, [selectedCategory, items]);

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
      <div className="min-h-screen mt-30 bg-lime-50 p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2 text-gray-800">
          Search your belonging
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Built to bring your lost items back—smart, secure, and stress-free.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-medium mb-4">Category</h3>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`px-4 py-2 rounded cursor-pointer mb-1 ${
                      selectedCategory === cat
                        ? "bg-[#86B049] text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No items found in this category.
              </p>
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
                    className="mt-auto bg-[#86B049] hover:bg-[#476930] cursor-pointer text-white px-4 py-2 rounded-md font-medium"
                  >
                    Alert Finder
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchItem;
