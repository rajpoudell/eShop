import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderStatus = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  // Function to update the order status
  useEffect(() => {
    setStatus(order.status);  // Update the status when the order prop changes
  }, [order.status]);
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/orderstatus/${orderId}`,
        { status: newStatus }
      );

      console.log("Order status updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const handleClick = async () => {
    const newStatus = "Shipped";

    if (status === newStatus) {
      alert("The order is already shipped.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to change the status?"
    );
    if (!confirmed) {
      console.log("Status change canceled");
      return;
    }

    try {
      const updatedOrder = await updateOrderStatus(order._id, newStatus);
      setStatus(updatedOrder.status || newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  return (
    <>
      <strong>Status:</strong>{" "}
      <span
        onClick={handleClick}
        className={`px-3 py-1 text-sm rounded-full cursor-pointer ${getStatusStyles(
          status
        )}`}
      >
        {status}
      </span>
    </>
  );
};

export default OrderStatus;
