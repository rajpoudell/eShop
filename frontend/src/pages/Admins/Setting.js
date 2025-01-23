import React from "react";
import { AiFillLock, AiOutlineDelete } from "react-icons/ai";

const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Account Settings
        </h2>

        {/* Change Password Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <AiFillLock className="text-2xl text-blue-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Change Password
            </h3>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              className="block w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your old password"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="block w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="block w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Confirm your new password"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center justify-center font-bold rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg h-10 px-5 py-5 mt-4"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6"></div>

        {/* Notification Settings Section */}
        <div className="mt-8 flex-1">
          <p className="text-lg font-medium text-gray-800">
            Notification Settings
          </p>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">All notifications</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Notify me on new Internship post</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Notify me on new event post</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Notify me on Application Invitation</span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6"></div>

        <div className="border-t border-gray-200 mb-6"></div>

        {/* Delete Account Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <AiOutlineDelete className="text-2xl text-red-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Delete Account
            </h3>
          </div>
          <button className="inline-flex items-center justify-center font-bold rounded-lg text-sm ring-offset-background duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 hover:shadow-lg h-10 px-5 py-5 sm:w-auto w-full">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
