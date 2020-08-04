import React from "react";
import { connect } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import FeaturedProducts from "../../SharedComponents/FeaturedProducts";
import PageWrapper from "../../SharedComponents/PageWrapper";
import Reviews from "./Reviews";
import ProductDetails from "./ProductDetails";
import Footer from "../../SharedComponents/Footer";

const GET_PRODUCT = gql`
  query getProduct($productHandle: String!) {
    productByHandle(handle: $productHandle) {
      title
      handle
      availableForSale
      totalInventory
      descriptionHtml
      metafield(namespace: "about", key: "about") {
        value
      }
      variants(first: 1) {
        edges {
          node {
            id
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 6) {
        edges {
          node {
            altText
            transformedSrc(maxWidth: 400, maxHeight: 450)
          }
        }
      }
    }
  }
`;

// begin component
const Product = ({ match, checkout }) => {
  const { handle } = match.params;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productHandle: handle },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const selectedProduct = data.productByHandle;

  // determine if wholesaleProducts or onlineProducts should be loaded
  const featuredProductsTitle = handle.includes("wholesale")
    ? "More Wholesale Products"
    : "More Products";

  // check if item exists in checkout already
  const doesItemExist = () => {
    const filterItems = checkout.lineItems.filter(
      (lineItem) => lineItem.handle === selectedProduct.handle
    );
    return filterItems.length > 0 ? true : false;
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
        <FeaturedProducts title={featuredProductsTitle} />
      </div>
    ) : null;
  };

  // begin component's return
  return (
    <PageWrapper>
      {createProductDetails()}
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
