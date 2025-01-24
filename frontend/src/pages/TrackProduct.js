import React, { useEffect, useState } from "react";
import { FaClipboardList, FaTruck, FaCheckCircle } from "react-icons/fa";

const TrackProduct = () => {
  const [inputValue, setInputValue] = useState("");
  const statusSteps = ["Pending", "Shipped", "Delivered"];
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackDiv, setTrackDiv] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  const orders = [
    {
      id: "1",
      buyerName: "Jenette Moran",
      status: "Pending",
      Address: "Kapilvastu",
      orderDate: "2025-01-21T16:19:39.817+00:00",
    },
    {
      id: "2",
      buyerName: "Jenette Moran",
      status: "Shipped",
      Address: "Kapilvastu",
      orderDate: "2025-01-21T16:19:39.817+00:00",
    },
    {
      id: "3",
      buyerName: " Moran Jenette",
      status: "Delivered",
      Address: "Kapilvastu",
      orderDate: "2025-01-23T16:19:39.817+00:00",
    },
  ];
  const currentStepIndex = statusSteps.indexOf(orders.status);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const result = orders.find((order) => order.id === inputValue);
    if (!result) {
      setTrackedOrder("Invalid Track Number");
    } else {
      setTrackedOrder(result);

      console.log(trackedOrder);
      setTrackDiv(true);
      console.log(currentStepIndex + 1);
    }
  };
  useEffect(() => {
    if (trackedOrder?.orderDate) {
      const orderDate = new Date(trackedOrder.orderDate);
      orderDate.setDate(orderDate.getDate() + 3); // Add 3 days
      setEstimatedDelivery(orderDate.toLocaleDateString()); // Format it as needed
    }
  }, [trackedOrder]);
  return (
    <div className=" mt-16  min-h-screen">
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-center mx-auto mt-20 w-[90vw] "
      >
        <h2 className="md:text-3xl my-6 w-[75%] text-xl text-gray-700 font-bold tracking-wider">
          Package tracking made easy,
          <hr /> you just need a tracking number!
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Tracking Number"
          required
          onChange={handleChange}
          value={inputValue}
          className="w-[90%] md:w-[75%] p-6 focus:shadow-2xl focus:shadow-slate-500 transition-all duration-700 mb-2  text-gray-600 md:text-xl text-base outline-none rounded-lg shadow-sm"
        />
        <div className="gap-3 flex">
          <button
            type="button"
            className="text-start mt-10 px-6 py-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:shadow-red-400 hover:shadow-lg"
            onClick={() => {
              setTrackedOrder(null);
              setTrackDiv((prevState) => !prevState);
              setInputValue("");
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="text-start mt-10 px-6 py-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:shadow-blue-400 hover:shadow-lg"
            // disabled={loading}
          >
            {/* {loading ? "Searching..." : "Search"} */}
            Search
          </button>
        </div>
      </form>

      {trackDiv && (
        <div className="max-w-screen-md mt-10 mx-auto p-6 bg-white rounded-lg shadow-2xl border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order for: {trackedOrder?.buyerName}
          </h2>
          <p className="text-sm text-gray-600">
            Address: {trackedOrder?.Address}
          </p>
          <p className="text-sm text-gray-600">
            Order Date: {new Date(trackedOrder?.orderDate).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Estimated Delivery By: {estimatedDelivery}
          </p>

          <div className="flex items-center justify-between mt-6">
            {/* Pending */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold 
            
            transition-all duration-300 ease-in-out`}
              >
                <FaClipboardList />
              </div>
            </div>

            {/* Shipped */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold 
            ${
              trackedOrder.status === "Shipped" ||
              trackedOrder.status === "Delivered"
                ? "bg-blue-600"
                : "bg-gray-600"
            } 
            transition-all duration-300 ease-in-out`}
              >
                <FaTruck />
              </div>
            </div>

            {/* Delivered */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold 
            ${
              trackedOrder.status === "Delivered"
                ? "bg-blue-600"
                : "bg-gray-600"
            } 
            transition-all duration-300 ease-in-out`}
              >
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-md"></div>
            <div
              className={`absolute top-1/2 h-1 bg-blue-600 transition-all duration-300 ease-in-out`}
              style={{
                width: `${
                  trackedOrder.status === "Pending" && "Shipped"
                    ? 0
                    : trackedOrder.status === "Shipped" && "Delivered"
                    ? 50
                    : trackedOrder.status === "Delivered"
                    ? 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackProduct;
