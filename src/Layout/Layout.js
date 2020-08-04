import React from "react";
import { gql, useQuery, ApolloConsumer } from "@apollo/client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  opacity: ${(props) => props.isLoading ? "0" : "1"};
  transition: opacity 500ms ease-in-out;
  transition-delay: 200ms;
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
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        completedAt
        id
      }
    }
  }
`;

const Layout = ({ children, clearCheckoutInState, checkoutId }) => {
  const { data: checkoutData } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
  });

  const { loading, error } = useQuery(GET_FEATURED_PRODUCTS_AND_ARTICLES);
  // if (loading) return "Loading...";
  console.log(typeof loading);
  if (error) return `ERROR!: ${error.message}`;

  return (
    <ApolloConsumer>
      {(client) => {
        // if checkout exists, clear checkout in state if checkout was completed
        if (checkoutData?.node?.completedAt) {
          clearCheckoutInState();
        }

        return (
          <MasterWrapper id="MasterWrapper" isLoading={loading}>
            <Header />
            {!loading && children}
          </MasterWrapper>
        );
      }}
    </ApolloConsumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
};

const mapStateToProps = ({ checkout: { checkoutId } }) => ({
  checkoutId,
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
