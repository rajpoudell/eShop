import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchCategory = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

// for details page

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/${id}`); // Pass product ID in the URL
    return response.data; // Return the fetched product data
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // You can throw or handle error as needed
  }
};

export const addProduct = async (productDetails) => {
  try {
    const response = await axios.post(`${API_URL}/addproduct`, productDetails, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // You can throw or handle error as needed
  }
};

export const checkoutOrder = async (orderDetails) => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, orderDetails);
    return response.data;
  } catch (error) {
    console.error("Error processing checkout:", error);
    throw error; // Handle error as needed
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orderCreated`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Handle the error as needed
  }
};

export const myProduct = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/myproduct`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in headers
      },
    }); // Pass product ID in the URL
    if (response.data === 0) {
      return "No products found"; // Return a message or handle it in another way
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // You can throw or handle error as needed
  }
};

export const deleteMyProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/myproduct/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { productId }, // Send productId in the request body
    });
    return response.data; // Success message from the server
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const registerUser = async (UserDetails) => {
  try {
    const response = await axios.post(`${API_URL}/register`, UserDetails);
    return response.data;
  } catch (error) {
    console.error("Error", error.message);

    throw error;
  }
};

export const loginUser = async (UserDetails) => {
  try {
    const response = await axios.post(`${API_URL}/login`, UserDetails);

    return response.data;
  } catch (error) {
    console.error("Error", error.message);

    throw error;
  }
};
