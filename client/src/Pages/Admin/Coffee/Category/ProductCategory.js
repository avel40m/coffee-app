import React from "react";

const ProductCategory = ({ category }) => {
  return (
    <ol>
      {category &&
        category.map((cat, index) => <li key={index}>{cat.name}</li>)}
    </ol>
  );
};

export default ProductCategory;
