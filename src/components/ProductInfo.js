import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProductDetails from "../components/ProductDetails";
import ProductImages from "../components/ProductImages";

import { device } from "../utils/devices";

// Begin Styled Components

const ProductInfoWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: auto;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

// begin component
const ProductInfo = ({
  selectedProduct,
  doesItemExist,
}) => {
  return (
    <ProductInfoWrapper>
      <ProductImages selectedProduct={selectedProduct}/>
      <ProductDetails 
        selectedProduct={selectedProduct} 
        doesItemExist={doesItemExist}
      />
    </ProductInfoWrapper>
  );
};

ProductInfo.propTypes = {
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.array
};

export default ProductInfo;
