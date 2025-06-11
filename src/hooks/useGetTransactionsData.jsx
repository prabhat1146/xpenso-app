import React, { useEffect, useState } from "react";
import UseGetTransactions from "./useGetTransactions";

const UseGetTransactionsData = () => {
  const { transactions } = UseGetTransactions();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [perMonthTrans, setPerMonthTrans] = useState([]);
  const [perDayTrans, setPerDayTrans] = useState([]);

  useEffect(() => {
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

    setTotalIncome(totalIncome);
    setTotalExpense(totalExpense);
    setTotalTransfer(totalTransfer);
    setTotalBalance(totalBalance);
  }, [transactions]);

  useEffect(() => {
    function getMonthlySummary(transactions) {
      const summaryMap = new Map();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      transactions?.forEach((tx) => {
        const year = tx.year;
        const month = tx.month;
        const key = `${year}-${String(month).padStart(2, "0")}`;
        const amount = parseFloat(tx.amount);
        const type = tx.category?.type || "unknown";

        if (!summaryMap.has(key)) {
          summaryMap.set(key, {
            month,
            year,
            monthName: monthNames[month - 1], // Add month name
            income: 0,
            expense: 0,
            transfer: 0,
          });
        }

        const record = summaryMap.get(key);

        if (type === "income") {
          record.income += amount;
        } else if (type === "expense") {
          record.expense += amount;
        } else if (type === "transfer") {
          record.transfer += amount;
        }

        summaryMap.set(key, record);
      });

      // Convert to array and sort by year-month (latest first)
      return [...summaryMap.values()].sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    }

    if (transactions?.length > 0) {
      const summary = getMonthlySummary(transactions);
      // setPerMonthTrans(summary);

      const summaryWithBalance = summary?.map((s) => ({
        ...s,
        balance: Number(s?.income || 0) - Number(s?.expense || 0),
      }));
      setPerMonthTrans(summaryWithBalance);
      // console.log("m", summaryWithBalance);
    }
  }, [transactions]);

  useEffect(() => {
    function getDailySummary(transactions) {
      const summaryMap = new Map();

      transactions.forEach((tx) => {
        const key = tx.transactionDate; // Format: "10-06-2025"
        const amount = parseFloat(tx.amount);
        const type = tx.category?.type || "unknown";

        if (!summaryMap.has(key)) {
          summaryMap.set(key, {
            date: tx.transactionDate,
            day: tx.day,
            dayName: tx.dayName,
            month: tx.month,
            monthName: tx.monthName || "", // If available
            year: tx.year,
            income: 0,
            expense: 0,
            transfer: 0,
          });
        }

        const record = summaryMap.get(key);

        if (type === "income") {
          record.income += amount;
        } else if (type === "expense") {
          record.expense += amount;
        } else if (type === "transfer") {
          record.transfer += amount;
        }

        summaryMap.set(key, record);
      });

      // Convert to array and sort by date descending
      return [...summaryMap.values()].sort((a, b) => {
        const dateA = new Date(`${a.year}-${a.month}-${a.day}`);
        const dateB = new Date(`${b.year}-${b.month}-${b.day}`);
        return dateB - dateA;
      });
    }

    if (transactions?.length > 0) {
      const summary = getDailySummary(transactions);
      setPerDayTrans(summary); // You should define `setPerDayTrans` in state
      const summaryWithBalance = summary?.map((s) => ({
        ...s,
        balance: Number(s?.income || 0) - Number(s?.expense || 0),
      }));
      setPerDayTrans(summaryWithBalance);
      // console.log('d',summaryWithBalance);
    }
  }, [transactions]);

  return {
    totalIncome,
    totalExpense,
    totalTransfer,
    totalBalance,
    perMonthTrans,
    perDayTrans,
  };
};

export default UseGetTransactionsData;
