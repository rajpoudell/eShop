import React, { useState, useEffect } from "react";
import { fetchCategory } from "../services/api";

// Fetch categories from the backend

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  // Fetch categories when the component mounts
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await fetchCategory();
        setCategories(categoryData); // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    // Add API request logic here
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-2xl rounded-lg my-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div >
          <label className="block text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
            rows="3"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-600">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.length === 0 ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-600">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
