import React from "react";
import styled from "styled-components";
import { ApolloConsumer, gql } from "@apollo/client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";

import RecipeBlock from "./RecipeBlock";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px auto 0;
`;

const GET_ARTICLES = gql`
  query getArticles {
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

const RecipeSection = () => {
  return (
    <ApolloConsumer>
      {(client) => {
        const data = client.readQuery({ query: GET_ARTICLES });
        const articles = data.articles.edges;
        return (
          <ComponentWrapper id="recipes" maxWidth={""}>
            <StyledH2>Recipes</StyledH2>
            <RecipeContainer>
              {articles.map((article) => (
                <RecipeBlock recipe={article} key={article.node.handle} />
              ))}
            </RecipeContainer>
          </ComponentWrapper>
        );
      }}
    </ApolloConsumer>
  );
};

RecipeSection.propTypes = {
  articles: PropTypes.array,
};

const mapStatetoProps = ({ articles }) => ({
  articles,
});

export default connect(mapStatetoProps, null)(RecipeSection);
