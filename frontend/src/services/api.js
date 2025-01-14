import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchCategory = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

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
        "Content-Type": "multipart/form-data",
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
    const response = await axios.post(`${API_URL}/checkout`, orderDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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


export const orderLists = async () => {
  const response = await axios.get(`${API_URL}/orderLists`);
  return response.data;
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
    if (response.data.token) {
      // localStorage.setItem("token", response.data.token);
    }
    console.log("login api react: response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error.message);

    throw error;
  }
};
