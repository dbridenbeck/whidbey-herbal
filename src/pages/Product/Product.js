import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import PageWrapper from '../../SharedComponents/PageWrapper';
import Reviews from './Reviews';
import ProductDetails from './ProductDetails';
import Footer from "../../SharedComponents/Footer";

// begin component
const Product = ({
  onlineStore,
  match,
  checkout,
}) => {

  const { handle } = match.params;

  // select the current product
  const selectProduct = onlineStore.filter(
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
    return selectedProduct ? (
      <div>
        <ProductDetails
          selectedProduct={selectedProduct}
          doesItemExist={handleIfItemExists}
        />
        <Reviews />
        <FeaturedProducts title={"More Products"} />
      </div>
    ) : null
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

const mapStateToProps = ({onlineStore, checkout}) => ({
  onlineStore,
  checkout,
});

export default connect(mapStateToProps, null)(Product);
