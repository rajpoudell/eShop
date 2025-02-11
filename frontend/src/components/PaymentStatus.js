import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';  // Import the clearCart action
import toast from 'react-hot-toast';
import { createOrder } from '../services/api';

const PaymentStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = new URLSearchParams(window.location.search).get('status');
  console.log("Status:", status);
  useEffect(() => {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    
    if (status === 'success') {
      if (orderDetails) {
        createOrder(orderDetails)
        localStorage.removeItem("orderDetails")
      }
      dispatch(clearCart());
      toast.success("Payment successful! , Your cart has been cleared.");
      navigate('/payment-success?status=success', { replace: true });
    } else if (status === 'cancel') {
     
      toast.error("Payment was canceled. Please try again.");
      navigate('/payment-failed', { replace: true });
    }
  }, [status]);

  return (
    <div className="container mx-auto p-6 max-w-xl">
    {/* Conditionally render based on payment status */}
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-4">
        {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {status === 'success'
          ? 'Thank you for your purchase! We are processing your order.'
          : 'We encountered an issue while processing your payment. Please try again or contact support.'}
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => navigate(status === 'success' ? '/' : '/cart')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          {status === 'success' ? 'Go to Home' : 'Return to Cart'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default PaymentStatus;
