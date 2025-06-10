import React, { useEffect, useState } from "react";
import globalApi from "../utils/api/globalApi";

const UseGetTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [transLoading, setTransLoading] = useState(false);
  const [transErr, setTransErr] = useState(null);

   const formateStringView = (str) => {
    return str
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const suburl = "/api/v1/user/transactions/get-transactions";
    setTransLoading(true);
    globalApi
      .get(suburl)
      .then((res) => {
        if (res.error) {
          setTransactions([]);
          setTransLoading(false);
          return setTransErr(res.error);
        }
        const transactionData = res?.data?.data;
        // console.log("t", transactionData);
        const cleanData = transactionData
          ?.filter((d) => d.category) // Only include items where category exists
          .map((d) => ({
            ...d,
            category: {
              ...d.category,
              name: formateStringView(d.category.name),
              value: d.category.name,
            },
            mode:{
                ...d.mode,
                name:formateStringView(d.mode.name),
                value:d.mode.name
            }
          }));

        // console.log("c", cleanData);
        setTransactions(cleanData)
        setTransLoading(false);
        setTransErr(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return {transactions,transLoading,transErr}
};

export default UseGetTransactions;
