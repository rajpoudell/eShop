import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.userInfo);

    return (
        <div className="bg-slate-800 text-white pt-8 pb-10 px-6 rounded-lg max-w-3xl mx-auto mt-8 shadow-lg">
            <h1 className="text-4xl font-bold text-teal-400 mb-6">User Profile</h1>
            {user  ? (
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <strong className="text-xl">Name:</strong>
                        <span className="text-gray-300">{user.name || user.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Email:</strong>
                        <span className="text-gray-300">{user.email|| user.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Phone:</strong>
                        <span className="text-gray-300">{user.phone || user.user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Address:</strong>
                        <span className="text-gray-300">{user.address || user.user.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Role:</strong>
                        <span className="text-gray-300">{user?.isAdmin || user?.user?.isAdmin ? "Admin" : "User"}</span>
                        </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Account Created At:</strong>
                        <span className="text-gray-300">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : new Date(user.user.createdAt).toLocaleDateString() }</span>
                    </div>
                    <div className="flex justify-between">
                        <strong className="text-xl">Last Updated:</strong>
                        <span className="text-gray-300">{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : new Date(user.user.updatedAt).toLocaleDateString()}</span>
                        </div>
                    <div className="flex text-red-800 cursor-pointer">
                       Edit✍️
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
