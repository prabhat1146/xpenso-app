import React from "react";
import { ArrowDownCircle, ArrowUpCircle, Clock, CheckCircle, XCircle } from "lucide-react";

const BorrowerLenderHistory = ({ transactions }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Borrower–Lender History</h2>

      {transactions && transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-2xl border border-gray-100"
            >
              {/* Borrower + Lender */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Borrower</span>
                <span className="font-semibold text-gray-800">{tx.borrower?.name || "Unknown"}</span>
              </div>

              <div className="text-gray-400">⇆</div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Lender</span>
                <span className="font-semibold text-gray-800">{tx.lender?.name || "Unknown"}</span>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-2">
                {tx.type === "borrow" ? (
                  <ArrowDownCircle className="text-red-500" size={22} />
                ) : (
                  <ArrowUpCircle className="text-green-500" size={22} />
                )}
                <span className="font-bold text-gray-700">
                  {tx.currency || "INR"} {Number(tx.amount).toFixed(2)}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1">
                {tx.status === "active" && <Clock className="text-yellow-500" size={20} />}
                {tx.status === "completed" && <CheckCircle className="text-green-600" size={20} />}
                {tx.status === "cancelled" && <XCircle className="text-red-600" size={20} />}
                <span className="capitalize text-gray-600">{tx.status}</span>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleDateString()} <br />
                <span className="text-xs text-gray-400">
                  {new Date(tx.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No borrower–lender history found.</div>
      )}
    </div>
  );
};

export default BorrowerLenderHistory;
