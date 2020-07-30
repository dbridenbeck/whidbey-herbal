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
  query GetProductsAndArticles($id: ID!) {
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
    node(id: $id) {
      ... on Checkout {
        id
        webUrl
        completedAt
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

const Layout = ({
  children,
  clearCheckoutInState,
  checkoutId,
  completedAt,
  storeCheckoutDetails,
}) => {
  const [createNewCheckout] = useMutation(createCheckout);

  useEffect(() => {
    if (completedAt || completedAt === "") {
      createNewCheckout({
        variables: { input: {} },
        update: (cache, { data: { checkoutCreate } }) => {
          storeCheckoutDetails(checkoutCreate.checkout.id);
          console.log("creating checkout");
        },
      });
    } else {
      console.log("Checkout already exists!")
    }
  }, []);

  const { loading, error, data } = useQuery(
    GET_FEATURED_PRODUCTS_AND_ARTICLES,
    { variables: { id: checkoutId } }
  );
  if (loading) return "Loading...";
  if (error) return `ERROR!: ${error.message}`;
  const {
    node: { webUrl, completedAtFromQuery },
  } = data;
  
  storeCheckoutDetails(checkoutId, completedAtFromQuery, webUrl);

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

const mapStateToProps = ({ checkout: { checkoutId, completedAt } }) => ({
  checkoutId,
  completedAt,
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  storeCheckoutDetails: (id, checkoutCompleted, webUrl) =>
    dispatch(CartActionCreators.storeCheckoutDetails(id, checkoutCompleted, webUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
