import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import apolloClient from '../../apolloClient';
import PropTypes from 'prop-types';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import PageWrapper from '../../SharedComponents/PageWrapper';
import Reviews from './Reviews';
import ProductDetails from './ProductDetails';
import Footer from '../../SharedComponents/Footer';
import { GET_PRODUCT } from '../../queries';

// begin component
const Product = ({
  checkout,
  data,
  handle,
  products,
  productByHandle: selectedProduct,
}) => {
  // determine if wholesaleProducts or onlineProducts should be loaded
  const featuredProductsTitle = handle.includes('wholesale')
    ? 'More Wholesale Products'
    : 'More Products';

  // check if item exists in checkout already
  const doesItemExist = () => {
    if (selectedProduct) {
      const filterItems = checkout.lineItems.filter(
        (lineItem) => lineItem.handle === selectedProduct.handle
      );
      return filterItems.length > 0 ? true : false;
    }
  };

  const createProductDetails = () => {
    const handleIfItemExists = doesItemExist();
    return selectedProduct ? (
      <div>
        <ProductDetails
          selectedProduct={selectedProduct}
          doesItemExist={handleIfItemExists}
        />
        <Reviews />
        <FeaturedProducts
          title={featuredProductsTitle}
          products={products}
          bottomPadding
        />
      </div>
    ) : null;
  };

  // begin component's return
  return (
    <PageWrapper>
      {selectedProduct && createProductDetails()}
      <Footer />
    </PageWrapper>
  );
};

Product.propTypes = {
  checkout: PropTypes.object,
};

const mapStateToProps = ({ checkout }) => ({
  checkout,
});

export default connect(mapStateToProps, null)(Product);

export async function getServerSideProps(context) {
  const {
    params: { handle },
  } = context;
  const { data } = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { productHandle: handle },
  });
  return {
    // TODO, handle error from apollo query
    props: {
      productByHandle: data.productByHandle,
      products: data?.collections?.edges,
      handle,
    },
  };
}
