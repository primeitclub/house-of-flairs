import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import NavBar from '../components/navbar'; // Commented out due to resolution error

const ReportFound = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    category: '', // Added category to form data
  });
  const [image, setImage] = useState(null); // State for image file
  const [errors, setErrors] = useState({}); // State for validation errors
  const [loading, setLoading] = useState(false); // State for loading during submission
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for the field being changed
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.itemName) newErrors.itemName = 'Item Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.contactName) newErrors.contactName = 'Your name is required';
    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    if (!formData.category) newErrors.category = 'Category is required'; // Validation for category
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append('image', image);
    }
    data.append('createdAt', new Date().toISOString());

    setLoading(true);
    try {
      // NOTE: Replace 'https://your-api-endpoint.com/found-items' with your actual API endpoint.
      // This is a placeholder.
      const res = await axios.post('https://your-api-endpoint.com/found-items', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // In a real application, you might want to show a success message before navigating
      navigate(`/item/${res.data.id}`);
    } catch (err) {
      console.error("Submission error:", err);
      // Log the error for debugging. Avoid using `alert()` in Canvas applications.
      console.log('Error submitting form. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NavBar component was commented out due to a resolution error. */}
      {/* If you have a NavBar component, ensure its path is correct or define it in this file. */}
      {/* <NavBar /> */}

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6 font-inter">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Report Found Item</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select category</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Personal Items">Personal Items</option>
                <option value="Clothes">Clothes</option>
                <option value="Backpacks">Backpacks</option>
                <option value="Wallets">Wallets</option>
                <option value="Keys">Keys</option>
                <option value="ATM">ATM</option>
                <option value="Instruments">Instruments</option>
                <option value="Sports">Sports</option>
                <option value="Tools">Tools</option>
                <option value="Documents">Documents</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && <p className="text-green-600 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Item Name */}
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name *</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="e.g., iPhone 12"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {errors.itemName && <p className="text-green-600 text-xs mt-1">{errors.itemName}</p>}
            </div>

            {/* Date Found */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date Found *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {errors.date && <p className="text-green-600 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the item in detail (e.g., color, brand, condition, any distinctive features)"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 resize-y"
              ></textarea>
              {errors.description && <p className="text-green-600 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Location Found */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location Found *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Central Park bench, Main Street Coffee Shop, Downtown Mall parking lot"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {errors.location && <p className="text-green-600 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Your Name *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.contactName && <p className="text-green-600 text-xs mt-1">{errors.contactName}</p>}
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                {errors.contactEmail && <p className="text-green-600 text-xs mt-1">{errors.contactEmail}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Image (optional)</label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-green-50 file:text-green-700
                           hover:file:bg-green-100"
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-4 w-40 h-40 object-cover rounded-lg border-2 border-green-300 shadow-md"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Report Found Item'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportFound;
