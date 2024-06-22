import React, { useContext } from "react";
import { useParams } from "react-router-dom"; // Corrected import
import { ShopContext } from "../context/ShopContext";
import Breadcrums from "../components/Breadcrums/Breadcrums";
import Productdisplay from './../components/Productdisplay/Productdisplay';
import DescriptionBox from './../components/DescriptionBox/DescriptionBox';
import RelatedProducts from './../components/RelatedProducts/RelatedProducts';

const Products = (props) => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId)); // Use lowercase 'product' for variable

  return (
    <div>
      <Breadcrums product={product} />
      <Productdisplay product={product}/>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Products;
