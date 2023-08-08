import React from 'react';

const ProductDetails = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="product-details w-96 border border-black h-auto flex flex-col">
      <h2 className="font-bold">{product.title}</h2>
      
    </div>
  );
};

export default ProductDetails;
