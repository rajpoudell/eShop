import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CheckOutForm = ({ onCheckOut }) => {
  const user = useSelector((state) => state.user.userInfo);

  console.log(user);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const handleChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };
  // console.log(guestInfo);
  
  const handleCheckOut = () => {
    if (!user) {
      if (
        !guestInfo.name ||
        !guestInfo.phone ||
        !guestInfo.email ||
        !guestInfo.address
      ) {
        return toast.error("Please fill in the field");
      }
      console.log("!user",guestInfo)
      onCheckOut(guestInfo);
    } else {
      guestInfo.buyerId = "Auth";
      guestInfo.name = user?.name || user.user.name;
      guestInfo.phone = user?.phone || user.user.phone;
      guestInfo.email = user?.email || user.user.email;
      guestInfo.address = user?.address || user.user.address;
      console.log("checkyoutform", guestInfo);
      onCheckOut(guestInfo);
    }
  };
  return (
    <div className="mt-6 p-4 border text-center rounded">
      {user ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={handleCheckOut}
        >
          🛒 Checkout
        </button>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Guest Checkout</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={guestInfo.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={guestInfo.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={guestInfo.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={guestInfo.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mb-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleCheckOut}
          >
            🛒 Checkout as Guest
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOutForm;
