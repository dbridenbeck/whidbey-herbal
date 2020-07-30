import React, { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCheckout } from "../queries/checkout";
import { client } from "../plugins/shopify.js";
import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
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

const GET_FEATURED_PRODUCTS_AND_ARTICLES = gql`
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
                images(first: 6) {
                  edges {
                    node {
                      transformedSrc(maxWidth: 400, maxHeight: 450)
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
          handle
          image {
            transformedSrc(maxWidth: 750, maxHeight: 750)
            altText
          }
        }
      }
    }
  }
`;

const GET_CHECKOUT = gql`
  query getCheckout($id: String!) {
    node(id: $id) {
      id
      webUrl
    }
  }
`;

const Layout = ({ children, clearCheckoutInState, checkoutId, storeCheckoutID }) => {
  const [createNewCheckout] = useMutation(createCheckout);

  useEffect(() => {
    createNewCheckout({ variables: { input: {} }, update: (cache, { data: { checkoutCreate } }) => {
      storeCheckoutID(checkoutCreate.checkout.id);
    } })
  }, []);

  const { loading, error } = useQuery(GET_FEATURED_PRODUCTS_AND_ARTICLES);
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

const mapStateToProps = ({ checkout: { checkoutId } }) => ({
  checkoutId,
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  storeCheckoutID: (id) =>
    dispatch(CartActionCreators.updateCheckoutId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
