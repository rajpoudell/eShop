import React, { useState, useEffect } from "react";
import { addProduct, fetchCategory } from "../services/api";

// Fetch categories from the backend

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
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
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setImage(file); // Store file in state
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store file in formData
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);

    if (image) {
      formDataToSend.append("image", image); // Append file
    }

    try {
      const response = await addProduct(formDataToSend);
      console.log("Product added successfully:", response);

      // Reset form after successful submission
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
      });

      setImage(null);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-2xl rounded-lg my-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
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
            type="file"
            name="image"
            onChange={handleChange} // Keep this
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Upload a Image"
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
              categories.map((cat, i) => (
                <option key={i} value={cat}>
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
