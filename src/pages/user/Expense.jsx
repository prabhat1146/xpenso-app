import React, { useEffect, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  Wallet,
  Plus,
  Funnel,
  ListFilter,
  List,
} from "lucide-react";
import * as lucideIcon from 'lucide-react'

import useGetModes from "../../hooks/useGetModes";
import UseGetCategories from "../../hooks/useGetCategories";
import UseGetTransactions from "../../hooks/useGetTransactions";
import FullScreenLoader from "../../components/FullScreenLoader";
import { LucideIcon } from "../../utils/functions/funUtils";

// const transactionsData = [
//   {
//     id: "1",
//     title: "Groceries",
//     amount: 500,
//     category: "Food",
//     date: "2025-06-01",
//     type: "expense",
//   },
//   {
//     id: "2",
//     title: "Salary",
//     amount: 30000,
//     category: "Income",
//     date: "2025-06-01",
//     type: "income",
//   },
//   {
//     id: "3",
//     title: "Bank Transfer",
//     amount: 2000,
//     category: "Transfer",
//     date: "2025-06-02",
//     type: "transfer",
//   },
//   {
//     id: "4",
//     title: "Movie",
//     amount: 300,
//     category: "Entertainment",
//     date: "2025-06-03",
//     type: "expense",
//   },
//   {
//     id: "5",
//     title: "Freelance",
//     amount: 8000,
//     category: "Income",
//     date: "2025-06-04",
//     type: "income",
//   },
//   {
//     id: "6",
//     title: "Rent",
//     amount: 7000,
//     category: "Housing",
//     date: "2025-06-05",
//     type: "expense",
//   },
// ];

// const categories = [
//   { name: "All", icon: List },
//   { name: "Food", icon: Funnel },
//   { name: "Income", icon: ArrowDownCircle },
//   { name: "Transfer", icon: ArrowLeftRight },
//   { name: "Entertainment", icon: ListFilter },
//   { name: "Housing", icon: Funnel },
// ];

const transactionTypes = [
  { name: "All", icon: List },
  { name: "income", icon: ArrowDownCircle },
  { name: "expense", icon: ArrowUpCircle },
  { name: "transfer", icon: ArrowLeftRight },
];

const dateFilters = [
  { name: "All", icon: List },
  { name: "Last 7 Days", icon: Funnel },
  { name: "Last 30 Days", icon: Funnel },
];

export default function TransactionsTab({ onAddTransaction }) {
  const { paymentModes, modeLoading, err } = useGetModes();
  const { categories, catLoading } = UseGetCategories();
  const { transactions, transLoading } = UseGetTransactions();

  const [selectedType, setSelectedType] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  if (modeLoading || catLoading || transLoading) {
    return <FullScreenLoader />;
  }

  // Filtering logic
  const filteredTransactions = transactions?.filter((tx) => {
    const typeMatch =
      selectedType === "All" || tx?.category.type === selectedType;
    const categoryMatch =
      selectedCategory === "All" || tx?.category.value === selectedCategory;
    const modeMatch = selectedMode === "All" || tx?.mode.value === selectedMode;
    // const searchMatch =
    //   tx.title.toLowerCase().includes(searchText.toLowerCase()) ||
    //   (tx.note && tx.note.toLowerCase().includes(searchText.toLowerCase()));

    let dateMatch = true;
    if (selectedDateFilter === "Last 7 Days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      dateMatch = new Date(tx?.createdAt) >= sevenDaysAgo;
    } else if (selectedDateFilter === "Last 30 Days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateMatch = new Date(tx?.createdAt) >= thirtyDaysAgo;
    }

    return typeMatch && categoryMatch && modeMatch && dateMatch;
    // return categoryMatch && typeMatch && dateMatch && searchMatch;
  });

  // Summaries
  const totalIncome = transactions
    ?.filter((t) => t.category.type === "income")
    ?.reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    ?.filter((t) => t.category.type === "expense")
    ?.reduce((sum, t) => sum + Number(t.amount), 0);

  const totalTransfer = transactions
    ?.filter((t) => t.category.type === "transfer")
    ?.reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = Number(totalIncome) - Number(totalExpense);

  const formateStringView = (str) => {
    return str
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 relative">
      {/* Summary Cards */}

      <div className="mb-6">
        <div className="flex gap-4 mb-3">
          <div className="flex-1 bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <Wallet className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-sm text-gray-500">Total Balance</div>
              <div className="mt-1 text-xl font-semibold text-green-600">
                ₹{totalBalance?.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <ArrowDownCircle className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-sm text-gray-500">Total Income</div>
              <div className="mt-1 text-xl font-semibold text-blue-600">
                ₹{totalIncome?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <ArrowUpCircle className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-sm text-gray-500">Total Expense</div>
              <div className="mt-1 text-xl font-semibold text-red-600">
                ₹{totalExpense?.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <ArrowLeftRight className="w-8 h-8 text-orange-500" />
            <div>
              <div className="text-sm text-gray-500">Total Transfer</div>
              <div className="mt-1 text-xl font-semibold text-orange-600">
                ₹{totalTransfer?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Transactions"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white p-3 rounded mb-3 shadow w-full"
        />

        <div className="mb-2 font-semibold text-md flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-blue-500" />
          Filter by Type
        </div>
        <div className="w-full flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {transactionTypes.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedType(name)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                selectedType === name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>

        <div className="mb-2 font-semibold text-md flex items-center gap-2">
          <Funnel className="w-5 h-5 text-blue-500" />
          Filter by payment mode
        </div>
        <div className="w-full flex gap-2 mb-4 flex-wrap overflow-x-auto scrollbar-hide">
          <button
            key={"all"}
            onClick={() => setSelectedMode("All")}
            className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
              selectedMode === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {/* {pm.icon && <pm.icon className="w-4 h-4" />} */}
            {"All"}
          </button>
          {paymentModes?.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setSelectedMode(pm?.value)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                selectedMode === pm?.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {pm?.icon && <LucideIcon name={pm?.icon} color={pm?.color} className="w-4 h-4" />}
              {pm?.name}
            </button>
          ))}
        </div>

        <div className="mb-2 font-semibold text-md flex items-center gap-2">
          <Funnel className="w-5 h-5 text-blue-500" />
          Filter by Category
        </div>

        <div className="w-full scrollbar-hide overflow-x-auto scrollbar-hide flex gap-2 mb-4 flex-wrap">
          <button
            key={"All"}
            onClick={() => setSelectedCategory("All")}
            className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {/* {cat.icon && <cat.icon className="w-4 h-4" />} */}
            {"All"}
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat?.value)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                selectedCategory === cat?.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat?.icon && <LucideIcon name={cat?.icon} color={cat?.color} className="w-4 h-4" />}
              {cat?.name}
            </button>
          ))}
        </div>

        <div className="mb-2 font-semibold text-md flex items-center gap-2">
          <List className="w-5 h-5 text-blue-500" />
          Filter by Date
        </div>
        <div className="w-full overflow-x-auto scrollbar-hide flex gap-2 mb-4">
          {dateFilters?.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedDateFilter(name)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                selectedDateFilter === name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div>
        {filteredTransactions?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between bg-white rounded-lg p-4 mb-3 shadow"
          >
            <div>
              <div className="font-semibold text-gray-900">
                {item.category.name}
              </div>
              <div className="text-sm text-gray-500">
                {formateStringView(item.category.type)} | {item.mode.name}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-lg font-semibold ${
                  item.category.type === "income"
                    ? "text-green-600"
                    : item.category.type === "expense"
                    ? "text-red-600"
                    : "text-orange-600"
                } flex items-center gap-1`}
              >
                {item.category.type === "income" && (
                  <ArrowDownCircle className="w-5 h-5" />
                )}
                {item.category.type === "expense" && (
                  <ArrowUpCircle className="w-5 h-5" />
                )}
                {item.category.type === "transfer" && (
                  <ArrowLeftRight className="w-5 h-5" />
                )}
                ₹{item.amount && Number(item.amount || 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">{item?.date}</div>
            </div>
          </div>
        ))}
        {filteredTransactions?.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No transactions found.
          </div>
        )}
      </div>

      {/* Add Transaction Button */}
      <button
        onClick={onAddTransaction}
        className="fixed bottom-8 right-8 bg-blue-600 rounded-full p-5 shadow-lg text-white"
        style={{ zIndex: 10 }}
        aria-label="Add Transaction"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
