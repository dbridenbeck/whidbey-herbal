import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

  const RecipeLink = styled(Link)`
    display: block;
    width: 33.33%;
    text-decoration: none;
  `;

const RecipeContainer = styled.div`
  position: relative;
  margin: 0 0px 20px 0;
  &:hover .recipeTitle {
    color: #e3be42;
  }
  .recipeTitle {
    margin-bottom: 5px;
    padding: 0;
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    letter-spacing: 0.01em;
    color: #787878;
  }
  .recipeText {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 0.875em;
    text-align: center;
    letter-spacing: 0.01em;
    color: #787878;
  }
`;

  const RecipeImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto 20px auto;
    border-radius: 10px;
  `;

const RecipeBlock = ({
  recipe: {
    node: {
      title,
      handle,
      excerpt,
      image: {
        originalSrc
      }
    }
  }
}) => {

  return (
    <RecipeLink to={`/recipe/${handle}`}>
      <RecipeContainer recipeName={title}>
        <RecipeImage src={`${originalSrc}`} />
        <h2 className="recipeTitle">{title}</h2>
        <p className="recipeText">{excerpt}</p>
      </RecipeContainer>
    </RecipeLink>
  );
}

RecipeBlock.propTypes = {
  title: PropTypes.string,
  handle: PropTypes.string,
  excerpt: PropTypes.string,
  originalSrc: PropTypes.string,
}

export default RecipeBlock;