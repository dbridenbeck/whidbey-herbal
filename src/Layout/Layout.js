import React from "react";
import { gql, useQuery } from "@apollo/client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import {
  fetchShopifyArticlesAction,
  fetchProductCollectionAction,
  handleDispatchingProducts,
  handleUpdatingProducts,
  updateShopifyArticlesAction,
} from "../state/fetchShopifyData";
import styled from "styled-components";
import Header from "./Header";

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto 0px auto;
  overflow: hidden;
  /* Media screen keeps WelcomeSection's img 100% height on bigger screens */
  @media ${device.laptop} {
    max-width: 100vw;
  }
`;

const GET_PRODUCTS = gql`
  query GetProductsAndArticles {
    collections(
      query: "title:'Wholesale Products' OR title:'Featured Products'"
      first: 2
    ) {
      edges {
        node {
          title
          products(first: 5) {
            edges {
              node {
                id
                title
                handle
                availableForSale
                variants(first: 1) {
                  edges {
                    node {
                      price
                    }
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    articles(first: 20) {
      edges {
        node {
          title
          contentHtml
          excerpt
          image {
            id
            originalSrc
          }
        }
      }
    }
  }
`;

const Layout = ({
  children,
  clearCheckoutInState,
  fetchOnlineStoreCollection,
  fetchShopifyArticles,
  updateOnlineStoreCollection,
  updateShopifyArticles,
  updateShopifyFetchTimestamp,
  lastShopifyFetchTimestamp,
  checkoutId,
  onlineStore,
  articles,
}) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return "Loading...";
  if (error) return `ERROR!: ${error.message}`;

  const clearCheckoutIfCompleted = () => {
    checkoutId
      ? client.checkout.fetch(checkoutId).then((checkout) => {
          if (checkout.completedAt) {
            clearCheckoutInState();
          }
        })
      : console.log("checkout doesn't exist");
  };

  // if checkout exists, clear checkout in state if checkout was completed
  if (checkoutId) {
    clearCheckoutIfCompleted();
  }

  // if products or articles haven't been fetched, fetch them
  if (
    !onlineStore ||
    !articles ||
    !onlineStore.length ||
    !articles.length
  ) {
    fetchOnlineStoreCollection();
    fetchShopifyArticles();
  }

  // if 5 minutes passed and it's not the initial page load,
  // check for updates on products, articles, featured products collection, and update timestamp
  if (
    Date.now() > lastShopifyFetchTimestamp + 300000 &&
    lastShopifyFetchTimestamp !== 0
  ) {
    updateOnlineStoreCollection(onlineStore);
    updateShopifyArticles(articles);
    updateShopifyFetchTimestamp();
  }

  return (
    <>
      <MasterWrapper id="MasterWrapper">
        <Header />
        {children}
      </MasterWrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = ({
  onlineStore,
  articles,
  checkout: { checkoutId },
  lastShopifyFetchTimestamp,
}) => ({
  checkoutId,
  onlineStore,
  articles,
  lastShopifyFetchTimestamp,
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchOnlineStoreCollection: () =>
    dispatch(
      fetchProductCollectionAction(
        "online-store",
        10,
        handleDispatchingProducts
      )
    ),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
  updateShopifyFetchTimestamp: () =>
    dispatch(CartActionCreators.updateShopifyFetchTimestamp()),
  updateOnlineStoreCollection: (onlineStore) =>
    dispatch(
      fetchProductCollectionAction(
        "online-store",
        10,
        handleUpdatingProducts,
        onlineStore
      )
    ),
  updateShopifyArticles: (articlesFromRedux) =>
    dispatch(updateShopifyArticlesAction(articlesFromRedux)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
