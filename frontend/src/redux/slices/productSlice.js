import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/api";

// Fetch products from API
export const getProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await fetchProducts();
    if (!Array.isArray(response)) {
      throw new Error("Invalid response format");
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProduct: [],
    categories: ["All"],
    selectedCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProduct =
        action.payload === "All"
          ? state.products
          : state.products.filter(
              (product) => product.category === action.payload
            );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProduct = action.payload;
        state.categories = [
          "All",
          ...new Set(action.payload.map((p) => p.category).filter(Boolean)),
        ];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;
