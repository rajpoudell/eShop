import React, { useEffect, useState } from 'react';
import { orderLists } from '../services/api';  // Adjust according to your file structure

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await orderLists(); // Fetch the list of orders
        setOrders(ordersData); // Set the orders state with all the fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <div>Loading...</div>; // Show loading if no orders are available
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Incoming Order </h2>

      {orders.map((order,index) => (
        <div key={order._id.$oid || index} className="bg-white shadow-2xl p-3 rounded-md  mb-6">
            
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Product Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">${item.price}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Buyer Information</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <p><strong>Name:</strong> {order.buyerName}</p>
              <p><strong>Email:</strong> {order.buyerEmail}</p>
              <p><strong>Phone:</strong> {order.buyerPhone}</p>
              <p><strong>Shipping Address:</strong> {order.buyerAddress}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold">${order.totalAmount}</span>
          </div>

          <div className="mt-4">
            <span className="font-semibold">Order Created Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          
        </div>

      ))}
    </div>
  );
};

export default OrderList;
