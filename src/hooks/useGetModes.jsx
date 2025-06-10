import React, { useEffect, useState } from "react";
import globalApi from "../utils/api/globalApi";

const useGetModes = () => {
  const [paymentModes, setPaymentModes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const subRul = `/api/v1/user/modes/get-modes`;
    setLoading(true);
    globalApi
      .get(subRul)
      .then((res) => {
        if (res.error) {
            setLoading(false);
            setPaymentModes([]);
          return setErr(res.error);
        }
        const modeData = res.data?.data;
        const cleanData = modeData.map((d) => ({
            ...d,
            value: d.name,
            name: d.name
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }));

        setPaymentModes(cleanData);
        // console.log(cleanData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((final) => {});
  }, []);
  return { paymentModes, loading, err };
};

export default useGetModes;
