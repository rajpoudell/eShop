import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk("orders/fetch", async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/orderLists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      alert("Unauthorized access! Please log in again.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching order lists:", error);
    throw error;
  }
});

const orderSlice = createSlice({
  name: "orderlist",
  initialState: {
    orderItem: [],
    orderLength: 0,
    shippedLength: 0,
    pendingLength: 0,
    filteredProduct: [],
    shippedItem: [],
    pendingItem: [],
    categories: ["All", "Pending", "Shipped"],
    selectedCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      
      if (action.payload === "All") {
        state.filteredProduct = [...state.orderItem];  // Ensure it resets to all items
      } else {
        state.filteredProduct = state.orderItem.filter(
          (product) => product.status === action.payload
        );
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orderItem = action.payload;
        state.filteredProduct = [...action.payload];  
        state.orderLength = state.orderItem.length;

        state.shippedItem = state.orderItem.filter(
          (item) => item.status === "Shipped"
        );
        state.pendingItem = state.orderItem.filter(
          (item) => item.status === "Pending"
        );

        state.shippedLength = state.shippedItem.length;
        state.pendingLength = state.pendingItem.length;
      })

      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setCategory } = orderSlice.actions;

export default orderSlice.reducer;
