import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <AlertCircle className="text-white" size={64} />
      <h1 className="text-4xl font-bold mt-4 mb-2 text-white">Oops!</h1>
      <p className="text-white mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or something went wrong.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
