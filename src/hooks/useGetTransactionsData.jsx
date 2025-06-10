import React, { useEffect, useState } from "react";
import UseGetTransactions from "./useGetTransactions";

const UseGetTransactionsData = () => {
  const { transactions } = UseGetTransactions();

  const [totalIncome,setTotalIncome]=useState(0);
  const [totalExpense,setTotalExpense]=useState(0);
  const [totalTransfer,setTotalTransfer]=useState(0);
  const [totalBalance,setTotalBalance]=useState(0);

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

  return {totalIncome,totalExpense,totalTransfer,totalBalance}
};

export default UseGetTransactionsData;
