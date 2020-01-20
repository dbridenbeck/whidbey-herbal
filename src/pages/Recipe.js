import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import { client } from "../plugins/shopify.js";
import { initialState } from '../state/App';
import {
  fetchShopifyProductsAction,
  fetchShopifyArticlesAction
} from "../state/fetchShopifyData";
import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";
import { device } from "../utils/devices";

// Begin Styled Components
const RecipeWrapper = styled.div`
  display: block;
  height: auto;
  width: 100%;
  margin: 90px auto 0 auto;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: bold;
  @media ${device.tablet} {
    margin-top: -4%;
  }
`;

const RecipeImage = styled.img`

`;

const ShopifyHTML = styled.div`

`;


// begin component
const Recipe = ({
  articles,
  match,
  checkout,
  clearCheckoutInState,
  fetchShopifyProducts,
  fetchShopifyArticles
}) => {
  // if shopify says the checkout happened successfully, clear checkout in state
  const clearCheckoutIfCompleted = () => {
    checkout.checkoutId
      ? client.checkout.fetch(checkout.checkoutId).then(checkout => {
          if (checkout.completedAt) {
            clearCheckoutInState();
          }
        })
      : console.log("checkout doesn't exist");
  };

  useEffect(() => {
    if (checkout === initialState) {
      // if checkout has been completed, clear checkout in state
      clearCheckoutIfCompleted();
      // populate state with products from shopify
      fetchShopifyProducts();
      // populate state with articles from shopify
      fetchShopifyArticles();
    }
  }, []);

  const { handle } = match.params;

  // select the current product
  const selectRecipe = articles.filter(
    recipe => handle === recipe.node.handle
  );
  const selectedRecipe = selectRecipe[0];

  // begin component's return
  return (
    <RecipeWrapper>
      <RecipeImage src={selectedRecipe.node.image.originalSrc} />
      <Title>{selectedRecipe.node.title}</Title>
      <ShopifyHTML dangerouslySetInnerHTML=
      {{
        __html: selectedRecipe.node.contentHtml
      }}
      />
      <Products title={"Explore the Shop"} />
    </RecipeWrapper>
  );
};

Recipe.propTypes = {
  articles: PropTypes.array,
  checkout: PropTypes.object,
  clearCheckoutInState: PropTypes.func,
  fetchShopifyProducts: PropTypes.func,
  fetchShopifyArticles: PropTypes.func
};

const mapStateToProps = ({articles, checkout}) => ({
  articles,
  checkout
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
