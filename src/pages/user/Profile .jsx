import React from "react";

const Profile = ({ user }) => {
  // `user` prop is an object with user data, e.g.:
  // { avatar, firstName, lastName, email, mobile, role, joinedAt }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <img
            className="h-24 w-24 rounded-full object-cover border-2 border-cyan-500"
            src={user.avatar || "https://i.pravatar.cc/150?img=10"}
            alt={`${user.firstName} ${user.lastName}`}
          />
          {/* User Basic Info */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-cyan-600 font-medium">{user.role || "User"}</p>
            <p className="text-gray-600 mt-1">Member since: {new Date(user.joinedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Info</h2>
            <p className="text-gray-800"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-800 mt-2"><span className="font-medium">Mobile:</span> {user.mobile}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Details</h2>
            <p className="text-gray-800"><span className="font-medium">Username:</span> {user.username || "N/A"}</p>
            <p className="text-gray-800 mt-2"><span className="font-medium">Status:</span> {user.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold shadow-md
              transition duration-300 transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
