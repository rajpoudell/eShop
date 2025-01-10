import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
    try {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : { cartItem: [], cartLength: 0, totalAmount: 0 };
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return { cartItem: [], cartLength: 0, totalAmount: 0 };
    }
  };
  const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    // initialState:{
    //     cartItem: [],
    //     cartLength: 0,
    //     totalAmount:0,
    // },
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const existingProduct = state.cartItem.find(item=>item._id===action.payload._id)
            if(existingProduct){
                existingProduct.quantity += 1;
            }else{
                state.cartItem.push({ ...action.payload, quantity: 1 });
            }
            state.cartLength = state.cartItem.length ;
            state.totalAmount = state.cartItem.reduce((sum,item)=> sum +item.price * item.quantity,0);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart:(state,action) =>{
            
            state.cartItem= state.cartItem.filter(item => item._id !== action.payload)
            state.cartLength = state.cartItem.length;
            state.totalAmount = state.cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);
            localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage

        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.cartItem.find(item => item._id === action.payload);

            if (existingProduct && existingProduct.quantity > 1) {
              existingProduct.quantity -= 1;
            }
            state.cartLength = state.cartItem.length + existingProduct.quantity;
            state.totalAmount = state.cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);
            localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
          },
          clearCart: (state) => {
            state.cartItem = [];
            state.cartLength = 0;
            state.totalAmount = 0;
            localStorage.removeItem("cart")
          },
          
    },
})

export const {addToCart,removeFromCart,decreaseQuantity,clearCart} =cartSlice.actions;
export default cartSlice.reducer;