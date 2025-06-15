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
  const [evidence, setEvidence] = useState({
    description: '',
    files: []
  });
  const [evidencePreview, setEvidencePreview] = useState([]);
  const [evidenceError, setEvidenceError] = useState('');
  const [evidenceSuccess, setEvidenceSuccess] = useState('');
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  useEffect(() => {
    if (!id || !type) return;

    async function fetchItem() {
      try {
        setLoading(true);
        const endpoint = type === 'lost' ? 'lost-items' : 'found-items';
        const response = await axios.get(`http://localhost:5000/api/${endpoint}/${id}`);
        console.log('Fetched item:', response.data); // Debug log
        setItem({ ...response.data, type });
      } catch (err) {
        console.error('Error fetching item:', err); // Debug log
        setError('Item not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id, type]);

  const handleEvidenceChange = (e) => {
    setEvidence({
      ...evidence,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidence({
      ...evidence,
      files
    });
    // Generate previews for image files
    setEvidencePreview(files.filter(f => f.type.startsWith('image/')).map(f => URL.createObjectURL(f)));
  };

  const handleEvidenceSubmit = async (e) => {
    e.preventDefault();
    setEvidenceError('');
    setEvidenceSuccess('');

    if (!evidence.description && evidence.files.length === 0) {
      setEvidenceError('Please provide either a description or files');
      return;
    }

    const formData = new FormData();
    formData.append('description', evidence.description);
    evidence.files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const endpoint = type === 'lost' ? 'lost-items' : 'found-items';
      const res = await axios.post(`http://localhost:5000/api/${endpoint}/${id}/evidence`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setEvidenceSuccess('Evidence submitted successfully');
      setEvidence({ description: '', files: [] });
      setEvidencePreview([]);
      setShowEvidenceModal(true);
      
      // Refresh the item data to show the new evidence
      const updatedItem = await axios.get(`http://localhost:5000/api/${endpoint}/${id}`);
      setItem({ ...updatedItem.data, type });
    } catch (err) {
      console.error('Error submitting evidence:', err);
      setEvidenceError(err.response?.data?.message || 'Failed to submit evidence');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EDFFD3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EDFFD3] flex items-center justify-center">
        <div className="text-red-600 text-xl font-semibold">{error}</div>
        <button
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/search-item')}
        >
          Go to Search
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#EDFFD3] flex items-center justify-center">
        <div className="text-gray-600 text-xl font-semibold">Item not found</div>
        <button
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/search-item')}
        >
          Go to Search
        </button>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#EDFFD3] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => navigate(-1)}
              className="text-green-700 mb-4 hover:underline cursor-pointer"
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

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800">
                <strong>Safety Tip:</strong> When meeting to exchange items, choose a public location
                and consider bringing a friend. Always verify the item's details before the meeting.
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Evidence Submission</h2>
                <form onSubmit={handleEvidenceSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Describe the object you lost, when it was lost, how old it is, and any unique identifiers (e.g., marks, engravings, serial numbers, etc.)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={evidence.description}
                      onChange={handleEvidenceChange}
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="E.g. Black wallet, lost on 12th May 2024, about 2 years old, has a sticker inside with my initials."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Files</label>
                    <div className="flex items-center gap-4">
                      <label className="inline-block px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors">
                        Choose Files
                        <input
                          type="file"
                          id="files"
                          name="files"
                          onChange={handleFileChange}
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          className="hidden"
                        />
                      </label>
                      {evidence.files.length > 0 && (
                        <span className="text-sm text-gray-700">
                          {evidence.files.map(f => f.name).join(', ')}
                        </span>
                      )}
                    </div>
                    {evidencePreview.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {evidencePreview.map((src, idx) => (
                          <img key={idx} src={src} alt="Preview" className="h-20 rounded shadow" />
                        ))}
                      </div>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Upload any relevant files (receipts, photos, etc.)
                    </p>
                  </div>
                  {evidenceError && (
                    <p className="text-red-600 text-sm">{evidenceError}</p>
                  )}
                  {evidenceSuccess && (
                    <p className="text-green-600 text-sm">{evidenceSuccess}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                  >
                    Submit Evidence
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEvidenceModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Evidence Submitted</h2>
            <p className="mb-6">Your evidence has been submitted successfully. The item owner will review your submission.</p>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              onClick={() => setShowEvidenceModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ItemDetails;
