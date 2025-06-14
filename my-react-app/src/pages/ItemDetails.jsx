import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer
 from '../components/Footer';
const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const lostItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
    const foundItems = JSON.parse(localStorage.getItem('foundItems') || '[]');
    const allItems = [...lostItems, ...foundItems];
    const foundItem = allItems.find((item) => item.id === id || item.id === Number(id));

    setItem(foundItem || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="text-center py-8 text-green-600">Loading item details...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4 text-green-800">Item Not Found</h1>
          <p className="mb-6 text-green-600">
            The item you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <NavBar/>
    <div className="min-h-screen mt-30 bg-green-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-green-700 mb-4 hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white shadow rounded p-6">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="w-full h-64 object-cover rounded mb-4"
            />
          )}

          <div className="flex justify-between items-center mb-4">
            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${
                item.type === 'lost'
                  ? 'bg-red-100 text-red-700' // I kept lost items red for clarity
                  : 'bg-green-100 text-green-700'
              }`}
            >
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
              {item.contactPhone && (
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm font-medium text-green-900">Phone</p>
                  <a
                    href={`tel:${item.contactPhone}`}
                    className="text-green-600 hover:underline"
                  >
                    {item.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href={`mailto:${item.contactEmail}?subject=Regarding ${item.itemName}`}
              className="bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700 flex-1"
            >
              Send Email
            </a>
            {item.contactPhone && (
              <a
                href={`tel:${item.contactPhone}`}
                className="border border-green-600 text-green-600 text-center px-4 py-2 rounded hover:bg-green-50 flex-1"
              >
                Call
              </a>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800">
            <strong>Safety Tip:</strong> When meeting to exchange items, choose a public location{' '}
            and consider bringing a friend. Always verify the item's details before the meeting.
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ItemDetails;
