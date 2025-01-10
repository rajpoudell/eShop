import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  removeFromCart,
  addToCart,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import CheckOutForm from "../components/CheckOutForm";
import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem, cartLength, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleCheckout = async (guestInfo) => {
    // Prepare the order details from the cart and guest info
    const orderDetails = {
      buyerId: "guest",
      buyerName: guestInfo.name,
      buyerEmail: guestInfo.email,
      buyerPhone: guestInfo.phone,
      buyerAddress: guestInfo.address,
      items: cartItem.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      orderDate: new Date().toISOString(),
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkout",
        orderDetails
      );

      // Check if the backend returned a URL for the Stripe checkout session
      if (response.data.url) {
        // Redirect the user to the Stripe payment page
        window.location.href = response.data.url;
        toast.success("Redirecting to payment gateway!");
      } else {
        throw new Error("Payment session creation failed.");
      }
    } catch (error) {
      toast.error("Failed to initiate payment process.");
      console.error(error);
    }
  };
  useEffect(() => {
    // Check the URL parameters to see if payment was successful
    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get("status");

    if (paymentStatus === "success") {
      // Clear the cart upon successful payment
      dispatch(clearCart());
      toast.success("Payment successful! Your cart has been cleared.");
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 w-[90%]">

      {cartLength === 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h1>

          <p className="text-gray-600 text-center">Your cart is empty.</p>
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 ">🛒 Your Cart</h1>

          {cartItem.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="w-16 h-16 rounded"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    ➕
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                  >
                    ➖
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  dispatch(removeFromCart(item._id));
                  toast.error("Removed Product!");
                }}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          {/* Display total amount */}
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold">Total Amount:</h2>
            <p className="text-lg font-semibold">${totalAmount}</p>
          </div>

          {/* Checkout form */}
          <CheckOutForm onCheckOut={handleCheckout} />
        </div>
      )}
    </div>
  );
};

export default Cart;
