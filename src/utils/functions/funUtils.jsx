import React from 'react';
const formateStringView = (str) => {
    return str
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

const FunUtils = () => {
    return (
        <div>
            
        </div>
    );
}
export {formateStringView}
export default FunUtils;
