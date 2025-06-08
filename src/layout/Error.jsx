import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <AlertCircle className="text-red-600" size={64} />
      <h1 className="text-4xl font-bold mt-4 mb-2 text-gray-800">Oops!</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
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
