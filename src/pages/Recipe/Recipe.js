import React from "react";
import { ApolloConsumer, gql } from "@apollo/client";
import styled from "styled-components";
import { device } from "../../utils/devices";
import PageWrapper from "../../SharedComponents/PageWrapper";
import FeaturedProducts from "../../SharedComponents/FeaturedProducts";
import StyledH1 from "../../SharedComponents/StyledH1";
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
    margin: 10px 10px 10px 0px;
    float: right;
  }
`;

const ShopifyHTML = styled.div`
  color: #787878;
  @media ${device.tablet} {
    width: 60%;
    padding: 0 70px 0 50px;
  }
`;

const GET_ARTICLES = gql`
  {
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

// begin component
const Recipe = ({ match }) => {
  const createRecipe = (articles) => {
    const { handle } = match.params;
  
    // select the current product
    const selectRecipe = articles.filter(
      (recipe) => handle === recipe.node.handle
    );

    const selectedRecipe = selectRecipe[0];

    // handle direct navigation to recipe page
    if (selectedRecipe) {
      const {
        node: {
          title,
          image: { transformedSrc },
          contentHtml,
        },
      } = selectedRecipe;

      return (
        <>
          <StyledH1>{title}</StyledH1>
          <RecipeContainer>
            <RecipeImage src={transformedSrc} />
            <ShopifyHTML
              dangerouslySetInnerHTML={{
                __html: contentHtml,
              }}
            />
          </RecipeContainer>
        </>
      );
    } else {
      return null;
    }
  };

  // begin component's return
  return (
    <ApolloConsumer>
      {(client) => {
        const {
          articles: { edges: queriedArticles },
        } = client.readQuery({ query: GET_ARTICLES });
        return (
          <PageWrapper>
            {createRecipe(queriedArticles)}
            <FeaturedProducts title={"Explore the Shop"} />
            <Footer />
          </PageWrapper>
        );
      }}
    </ApolloConsumer>
  );
};

export default Recipe;
