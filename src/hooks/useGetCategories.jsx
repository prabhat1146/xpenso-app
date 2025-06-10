import React, { useEffect, useState } from 'react';
import globalApi from '../utils/api/globalApi';

const UseGetCategories = () => {
    const [categories,setCategories]=useState(null);
    const [catLoading,setCatLoading]=useState(null);
    const [catErr,setCatErr]=useState(null);

    useEffect(() => {
    const subUrl = `/api/v1/user/categories/get-categories`;
    setCatLoading(true)
    globalApi
      .get(subUrl)
      .then((res) => {
        if(res.error){
            setCategories([]);
            setCatLoading(false);
            return setCatErr(res.error)
        }
        const catData = res.data?.data;
        const cleanedCatData = catData.map((d) => ({
          ...d,
          value: d.name,
          name: d.name
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }));

        setCategories(cleanedCatData);
        setCatErr(null);
        setCatLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    
    return {categories,catLoading,catErr}
}

export default UseGetCategories;
