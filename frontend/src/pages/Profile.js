import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="bg-gray-200 text-black pt-8 pb-10 px-6 rounded-lg max-w-3xl mx-auto mt-8 shadow-xl">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
        User Profile
      </h1>
      {user ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Name:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user.name || user.user.name}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Email:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user.email || user.user.email}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Phone:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user.phone || user.user.phone}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Address:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user.address || user.user.address}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Role:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user?.isAdmin || user?.user?.isAdmin ? "Admin" : "User"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Account Created At:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : new Date(user.user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <strong className="text-base md:text-lg">Last Updated:</strong>
            <span className="text-gray-900 text-sm md:text-base">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : new Date(user.user.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-center md:justify-end text-red-800 cursor-pointer text-sm md:text-base">
            Edit ✍️
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center text-sm md:text-base">
          Loading user data...
        </p>
      )}
    </div>
  );
};

export default Profile;
