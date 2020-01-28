import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../../SharedComponents/Products';
import Reviews from './Reviews';
import ProductDetails from './ProductDetails';
import PageWrapper from "../../SharedComponents/PageWrapper";
import Footer from "../../SharedComponents/Footer";

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
  const doesItemExist = () => {
    const filterItems = checkout.lineItems
      .filter(lineItem => lineItem.id === selectedProduct.id);
    return (
      filterItems.length > 0 ? true : false
    )
  }

  const createProductDetails = () => {
    const handleIfItemExists = doesItemExist();
    return (
      <div>
        <ProductDetails
          selectedProduct={selectedProduct}
          doesItemExist={handleIfItemExists}
        />
        <Reviews />
        <Products title={"More Products"} />
      </div>
    )
  }
  
  // begin component's return
  return (
    <PageWrapper>
      {createProductDetails()}
      <Footer />
    </PageWrapper>
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
