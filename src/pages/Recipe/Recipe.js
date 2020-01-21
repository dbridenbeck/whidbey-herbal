import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../../SharedComponents/Products';
import styled from "styled-components";
import { device } from "../../utils/devices";

// Begin Styled Components
const RecipeWrapper = styled.div`
  width: 100%;
  margin: 120px auto 0 auto;
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

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  @media ${device.tablet} {
    display: block;
    flex-direction: none;
    flex-wrap: none;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  border-radius: 10px;
  @media ${device.tablet} {
    width: 40%;
    margin: 10px 10px 10px 50px;
    float: right;
  }
`;

const ShopifyHTML = styled.div`
  color: #787878;
  @media ${device.tablet} {
  }
`;

// begin component
const Recipe = ({
  articles,
  match,
}) => {

  const { handle } = match.params;

  // select the current product
  const selectRecipe = articles.filter(
    recipe => handle === recipe.node.handle
  );
  const selectedRecipe = selectRecipe[0];

  // begin component's return
  return (
    <RecipeWrapper>
      <Title>{selectedRecipe.node.title}</Title>
      <RecipeContainer>
        <RecipeImage src={selectedRecipe.node.image.originalSrc} />
        <ShopifyHTML dangerouslySetInnerHTML=
        {{
          __html: selectedRecipe.node.contentHtml
        }}
        />
        
        
      </RecipeContainer>
      <Products title={"Explore the Shop"} />
    </RecipeWrapper>
  );
};

Recipe.propTypes = {
  articles: PropTypes.array,
  checkout: PropTypes.object,
};

const mapStateToProps = ({articles, checkout}) => ({
  articles,
  checkout
});

export default connect(mapStateToProps, null)(Recipe);
