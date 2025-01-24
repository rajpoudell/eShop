import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, setCategory } from "../../redux/slices/orderSlice";
import OrderStatus from "../../components/OrderStatus";


const ManageOrder = () => {
  const user = useSelector((state) => state.user.userInfo);
  const { filteredProduct, categories, selectedCategory, loading, error } =
    useSelector((state) => state.orders);

  const token = `${user.token || user.user.token}`;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getOrders(token));
    }
  }, [dispatch, token]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Category Filter */}
      <div className="flex justify-center md:justify-start mb-6">
        <select
          className="p-2 border rounded-md w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loading and Error Messages */}
      {loading && (
        <p className="text-center text-lg font-semibold">Loading...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Order Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[...filteredProduct]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((product, index) => (
            <div
              key={product._id.$oid || index}
              className="bg-white shadow-lg  p-2 sm:p-3  rounded-md hover:shadow-xl transition duration-300"
            >
              <h1 className="text-blue-700 text-lg sm:text-xl font-bold">
                S.No: {index + 1}
              </h1>

              <table className="w-full table border-collapse mt-2 text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-3 text-left">Product</th>
                    <th className="py-2 px-3 text-left">Price</th>
                    <th className="py-2 px-3 text-left">Qty</th>
                    <th className="py-2 px-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {product.items.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3">${item.price}</td>
                      <td className="py-2 px-3">{item.quantity}</td>
                      <td className="py-2 px-3 font-semibold">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Buyer Information */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  Buyer Info
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg mt-2 text-sm sm:text-base">
                  <p>
                    <strong>Account:</strong> {product.buyerId}
                  </p>
                  <p>
                    <strong>Name:</strong> {product.buyerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {product.buyerEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {product.buyerPhone}
                  </p>
                  <p>
                    <strong>Address:</strong> {product.buyerAddress}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <OrderStatus order={product} />

                  
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center bg-blue-100 p-4 rounded-lg text-sm sm:text-base">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-blue-800">
                  ${product.totalAmount}
                </span>
              </div>

              {/* Order Date */}
              <div className="mt-4 text-sm sm:text-base">
                <span className="font-semibold text-gray-600">Order Date:</span>
                <span className="ml-2 text-gray-800">
                  {new Date(product.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageOrder;
