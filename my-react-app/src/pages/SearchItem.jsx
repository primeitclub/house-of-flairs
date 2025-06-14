import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import girlImg from "../assets/bag.png";

const dummyItems = [
  {
    id: "1",
    itemName: "Tata model 3",
    description: "Silver color, found near Kalanki",
    location: "Kathmandu",
    date: "2060/03/34",
    category: "Vehicle",
    contactName: "Ram",
    contactEmail: "ram@example.com",
    contactPhone: "9800000000",
    createdAt: new Date().toISOString(),
    type: "found",
    imageUrl: girlImg,
  },
  {
    id: "2",
    itemName: "Splendor Hero",
    description: "Black bike with scratches",
    location: "Kathmandu",
    date: "2060/03/34",
    category: "Vehicle",
    contactName: "Shyam",
    contactEmail: "shyam@example.com",
    contactPhone: "9811111111",
    createdAt: new Date().toISOString(),
    type: "found",
    imageUrl: "https://via.placeholder.com/200x120?text=Splendor+Hero",
  },
  {
    id: "3",
    itemName: "Splendor",
    description: "White scooter parked roadside",
    location: "Kathmandu",
    date: "2060/03/34",
    category: "Vehicle",
    contactName: "Hari",
    contactEmail: "hari@example.com",
    contactPhone: "9822222222",
    createdAt: new Date().toISOString(),
    type: "found",
    imageUrl: "https://via.placeholder.com/200x120?text=Splendor",
  },
];

const categories = [
  "All",
  "Vehicle",
  "Keys",
  "atm",
  "docs",
  "wallets",
  "Personal Items",
  "sports",
  "clothes",
  "Backpacks",
  "Tools & Utilities",
  "Instrument",
  "Others"
];

function SearchItem() {
  const [selectedCategory, setSelectedCategory] = useState("Vehicle");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('foundItems');
    if (!saved) {
      localStorage.setItem('foundItems', JSON.stringify(dummyItems));
    }
    setItems(JSON.parse(localStorage.getItem('foundItems')));
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory.toLowerCase() === "all"
        ? items
        : items.filter(
            (item) =>
              item.category.toLowerCase() === selectedCategory.toLowerCase()
          );
    setFilteredItems(filtered);
  }, [selectedCategory, items]);

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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
              >
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="rounded-lg h-40 object-cover mb-3"
                />
                <h4 className="text-lg font-semibold">{item.itemName}</h4>
                <span className="text-sm text-gray-600">
                  Location: {item.location}
                </span>
                <span className="text-sm text-gray-600 mb-2">
                  Found Date: {item.date}
                </span>
                <span className="inline-block text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full w-fit mb-3">
                  {item.category}
                </span>
                <button
                  onClick={() => navigate(`/items/${item.id}`)}
                  className="mt-auto bg-[#86B049] hover:bg-[#476930] cursor-pointer text-white px-4 py-2 rounded-md font-medium"
                >
                  Alert Finder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchItem;