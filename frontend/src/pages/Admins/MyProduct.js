import React, { useEffect, useState } from "react";
import { myProduct, deleteMyProduct } from "../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import EditProduct from "./EditProduct";
import CustomModal from "../../components/CustomModel";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await myProduct(user.token);
        // Pass the token here
        if (data === "No products found") {
          setProducts([]);
          setError(data); // Set the error state if no products are found
        } else {
          setProducts(data); // Otherwise, set the products
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.token]);

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      await deleteMyProduct(productId, user.token);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product Deleted Successfully !");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  return (
    <div className="py-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Products
      </h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-lg p-4 shadow-md bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={`${process.env.REACT_APP_URL}/uploads/${product.image}`} // Concatenate the base URL with image filename
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                {product.name.split(" ")[0]}{" "}
                {/* Show first word of the product name */}
              </h2>
              <p className="text-gray-600 text-sm font-medium mb-4">
                ${product.price}
              </p>

              <div className="">
                <div
                  onClick={() => handleDelete(product._id)} // Delete product when clicked
                  className="cursor-pointer bg-red-500 text-white px-6 py-2 mt-4 rounded-md shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out"
                >
                  Delete
                </div>

                <div
                  onClick={() => {
                    setIsEditing((prev) => !prev);

                    setEditProduct(product);
                  }}
                  className="cursor-pointer bg-blue-500 text-white px-6 py-2 mt-4 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out"
                >
                  Edit
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
      <CustomModal show={isEditing} onClose={() => setIsEditing(false)}>
        <EditProduct
          product={editProduct}
          onSuccess={() => setIsEditing(false)} // Close modal after update
        />
      </CustomModal>{" "}
    </div>
  );
};

export default MyProduct;
