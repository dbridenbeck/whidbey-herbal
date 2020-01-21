import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import ProductInfo from '../components/ProductInfo';
import styled from "styled-components";

// Begin Styled Components
const ProductWrapper = styled.div`
  display: block;
  height: auto;
  width: 100%;
  margin: 90px auto 0 auto;
`;

// begin component
const Product = ({
  products,
  match,
  checkout,
}) => {

  const { handle } = match.params;

  // select the current product
  const selectProduct = products.filter(
    product => handle === product.handle
  );
  const selectedProduct = selectProduct[0];

  // check if item exists in checkout already
  const doesItemExist = checkout.lineItems.filter(
    lineItem => lineItem.id === selectedProduct.id
  );

  // begin component's return
  return (
    <ProductWrapper>
      <ProductInfo
        selectedProduct={selectedProduct}
        doesItemExist={doesItemExist}
      />
      <Reviews />
      <Products title={"More Products"} />
    </ProductWrapper>
  );
};

Product.propTypes = {
  products: PropTypes.array,
  checkout: PropTypes.object,
};

const mapStateToProps = ({products, checkout}) => ({
  products,
  checkout,
});

export default connect(mapStateToProps, null)(Product);
