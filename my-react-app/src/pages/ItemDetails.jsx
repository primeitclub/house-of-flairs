import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';

const ItemDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !type) return;

    async function fetchItem() {
      try {
        setLoading(true);
        const endpoint = type === 'lost' ? 'lost-items' : 'found-items';
        const response = await axios.get(`http://localhost:5000/api/${endpoint}/${id}`);
        setItem({ ...response.data, type });
      } catch (err) {
        setError('Item not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-green-600">Loading item details...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Item Not Found</h1>
        <p className="text-green-600 mb-4">{error || 'The item may have been removed.'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-30 bg-green-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="text-green-700 mb-4 hover:underline"
          >
            ← Back
          </button>

          <div className="bg-white shadow rounded p-6">
            {item.image && (
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.itemName}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                item.type === 'lost'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
              </span>
              <span className="text-sm text-gray-500">
                Posted {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-green-900">{item.itemName}</h1>
            <p className="text-green-700 mb-6">{item.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm font-medium text-green-900">
                  {item.type === 'lost' ? 'Lost at' : 'Found at'}
                </p>
                <p className="text-green-600">{item.location}</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm font-medium text-green-900">
                  {item.type === 'lost' ? 'Date Lost' : 'Date Found'}
                </p>
                <p className="text-green-600">{item.date}</p>
              </div>
            </div>

            <hr className="my-6 border-green-200" />

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Contact Information</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm font-medium text-green-900">Name</p>
                  <p>{item.contactName}</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm font-medium text-green-900">Email</p>
                  <a
                    href={`mailto:${item.contactEmail}?subject=Regarding ${item.itemName}`}
                    className="text-green-600 hover:underline"
                  >
                    {item.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={`mailto:${item.contactEmail}?subject=Regarding ${item.itemName}`}
                className="bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700 flex-1"
              >
                Send Email
              </a>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800">
              <strong>Safety Tip:</strong> When meeting to exchange items, choose a public location
              and consider bringing a friend. Always verify the item's details before the meeting.
            </div>

            {/* Evidence Submission Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Evidence Submission</h2>
              <form
                className="space-y-4"
                onSubmit={e => {
                  e.preventDefault();
                  alert('Evidence submitted! (This is a demo. Backend integration needed for real upload.)');
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Evidence (Bills, photos that signify it's your belonging)
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (why this is your item)</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe any unique marks, purchase details, or other evidence..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#86B049] hover:bg-[#476930] text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-200"
                >
                  Submit Evidence
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemDetails;
