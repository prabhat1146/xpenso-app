import React, { useState, useEffect } from "react";
import axios from "axios";
import globalApi from "../../../utils/api/globalApi";
import { useAuth } from "../../../context/AuthContext";

const AddNewBorrowerLender = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [counterpartyId, setCounterpartyId] = useState("");
  const [role, setRole] = useState("borrower"); // logged-in user's role
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [remarks, setRemarks] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch all users except current logged-in user
    globalApi
      .get("/api/v1/user/get-all-users")
      .then((res) => {
        const filtered = res.data.filter((u) => u.id !== user.id);
        console.log(filtered,user);
        setUsers(filtered);
        setFilteredUsers(filtered);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // Search filter logic
  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers(users);
    } else {
      const lower = search.replace(/\s+/g, "").toLowerCase();
      const results = users.filter(
        (u) =>
          (u?.firstName+u?.middleName+u?.lastName)?.toLowerCase().includes(lower) ||
          u?.email.toLowerCase().includes(lower) ||
          u?.mobile.toString().includes(lower)
      );
      setFilteredUsers(results);
    }
  }, [search, users]);

  const handleSubmit = async () => {
    if (!counterpartyId || !amount) {
      alert("Please select a counterparty and enter an amount.");
      return;
    }

    try {
      const payload = {
        borrowerId: role === "borrower" ? user.id : counterpartyId,
        lenderId: role === "lender" ? user.id : counterpartyId,
        amount,
        currency,
        remarks,
      };

      const suburl =
        "/api/v1/user/borrower-lender-transactions/add-new-borrower-lender-transaction";

      setLoading(true);

      globalApi
        .post(suburl, payload)
        .then((res) => {
          if (res.error) {
            console.log(res)
            alert("Error: " + res.error);
            
          } else {
            alert("Borrower–Lender record added successfully!");
          }
          setLoading(false);
        })
        .finally(() => {
          console.log("Request completed.");
        });

      setCounterpartyId("");
      setAmount("");
      setCurrency("INR");
      setRemarks("");
      setSearch("");
    } catch (error) {
      console.error(error);
      alert("Error while adding record.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Add New Borrower–Lender
      </h2>

      {/* Role Selection */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">You are: *</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </select>
      </div>

      {/* Counterparty Search */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">
          Search {role === "borrower" ? "Lender *" : "Borrower *"}
        </label>
        <input
          type="text"
          placeholder="Search by name, email, or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-2 mb-2"
        />

        <div className="max-h-40 overflow-y-auto border rounded-lg">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-2 cursor-pointer ${
                  counterpartyId === user.id
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCounterpartyId(user.id)}
              >
                {user.firstName} {user?.middleName} {user?.lastName}- ({user.mobile}) – {user.email}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No user found</div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Amount *</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Currency */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Currency *</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="INR">INR – Indian Rupee</option>
          <option value="USD">USD – US Dollar</option>
          <option value="EUR">EUR – Euro</option>
          <option value="GBP">GBP – British Pound</option>
          <option value="JPY">JPY – Japanese Yen</option>
        </select>
      </div>

      {/* Remarks */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Remarks</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter any remarks..."
          className="w-full border rounded-lg p-2"
          rows="3"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </div>
  );
};

export default AddNewBorrowerLender;
