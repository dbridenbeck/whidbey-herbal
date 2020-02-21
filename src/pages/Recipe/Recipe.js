import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../../utils/devices";
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import StyledH1 from '../../SharedComponents/StyledH1';
import Footer from "../../SharedComponents/Footer";

// Begin Styled Components
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
  console.log("articles: ", articles)
  
  const createRecipe = () => {
    const { handle } = match.params;
  
    // select the current product
    const selectRecipe = articles.filter(
      recipe => handle === recipe.node.handle
    );

    const selectedRecipe = selectRecipe[0];

    // handle direct navigation to recipe page
    if (selectedRecipe) {
      const {
        node: {
          title,
          image: {originalSrc},
          contentHtml
        }
      } = selectedRecipe;
  
      return (
        <>
          <StyledH1 centered={false} colorIsGrey={false}>{title}</StyledH1>
          <RecipeContainer>
            <RecipeImage src={originalSrc} />
            <ShopifyHTML dangerouslySetInnerHTML=
            {{
              __html: contentHtml
            }}
            />
          </RecipeContainer>
        </>
      )
    } else {
      return null
    }
  }

  // begin component's return
  return (
    <>
      {createRecipe()}
      <FeaturedProducts title={"Explore the Shop"} />
      <Footer />
    </>
  );
};

Recipe.propTypes = {
  articles: PropTypes.array,
};

const mapStateToProps = ({articles}) => ({
  articles,
});

export default connect(mapStateToProps, null)(Recipe);
