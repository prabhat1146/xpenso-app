import { useEffect, useState } from "react";
import globalApi from "../../../utils/api/globalApi";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  List,
  Mail,
  MessageSquare,
  UserMinus,
  UserPlus,
} from "lucide-react";

const BorrowingAndLendingList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const suburl = `/api/v1/user/borrower-lender-transactions/get-borrower-lender-all-transactions`;
    globalApi.get(suburl).then((res) => {
      if (!res.error) {
        const userId = user.id; // current user ID

        const filteredTx = (res.data?.data?.transactions || []).filter(
          (tx) => tx.borrower?.id === userId || tx.lender?.id === userId
        );

        console.log(filteredTx);

        setTransactions(filteredTx);
      }
    });
  }, [user.id]);

  // Filtering logic
  const filteredTx = transactions?.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "borrower") return tx?.lender?.id === user?.id; // show where user is borrower
    if (filter === "lender") return tx?.borrower?.id === user?.id; // show where user is lender
    return true;
  });

  const handleSMSClick=()=>{
    alert("Coming soon.")
  }
  const handleEmailClick=()=>{
    alert("Coming soon.")
  }
  const handlePartialClick=()=>{
    alert("Coming soon.")
  }
  const handleFullClick=()=>{
    alert("Coming soon.")
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Borrowing & Lending List</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("borrower")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            filter === "borrower"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <UserMinus size={18} /> Borrowers
        </button>
        <button
          onClick={() => setFilter("lender")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            filter === "lender"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <UserPlus size={18} /> Lenders
        </button>
        <button
          onClick={() => navigate("/pages/user/in/add-new-borrower-lender")}
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-blue-600 text-white"
        >
          <UserPlus size={18} /> Add New
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredTx.length > 0 ? (
          filteredTx.map((tx) => {
            // show other party as counterpart
            const isUserBorrower = tx.borrower?.id === user?.id;
            const counterpart = isUserBorrower ? tx.lender : tx.borrower;

            return (
              <div
                key={tx.id}
                
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-md rounded-xl p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition"
              >
                <div>
                  <p className="text-lg font-semibold flex items-center whitespace-nowrap">
                    {/* Left side → Lender (always green) */}
                    <span className="text-green-600">
                      {tx?.lender?.firstName} {tx?.lender?.middleName}{" "}
                      {tx?.lender?.lastName}
                      (L{tx?.lender?.id === user?.id ? ", You" : ""})
                    </span>

                    <ArrowRight className="mx-2" />

                    {/* Right side → Borrower (always red) */}
                    <span className="text-red-600">
                      {tx?.borrower?.firstName} {tx?.borrower?.middleName}{" "}
                      {tx?.borrower?.lastName}
                      (B{tx?.borrower?.id === user?.id ? ", You" : ""})
                    </span>
                  </p>

                  {/* <p className="text-sm capitalize">Lender:</p> */}
                  <p className="text-gray-700 capitalize">
                    Amount: ₹{tx.amount}
                  </p>
                  {/* <p className="text-gray-500 capitalize">
                    Role: {isUserBorrower ? "Lender" : "Borrower"}
                  </p> */}
                  <p className="text-gray-400 text-sm">{counterpart?.mobile}</p>
                  <p className="text-gray-400 text-sm">{counterpart?.email}</p>
                  <p className="text-gray-400 text-sm">
                    Date-{" "}
                    {new Date(tx?.createdAt).toLocaleString("en-IN", {
                      timeZone: timezone,
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                  <button onClick={() =>
                  navigate("/pages/user/in/borrowing-lending-history", {
                    state: { transaction: tx },
                  })
                } className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
                    <List size={18} /> History 
                  </button>
                  <button onClick={handleSMSClick} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                    <MessageSquare size={18} /> SMS
                  </button>
                  <button onClick={handleEmailClick} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <Mail size={18} /> Email
                  </button>
                  <button onClick={handlePartialClick} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                    <CreditCard size={18} /> Partial
                  </button>
                  <button onClick={handleFullClick} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    <CheckCircle size={18} /> Full
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No records found for {filter}
          </p>
        )}
      </div>
    </div>
  );
};

export default BorrowingAndLendingList;
