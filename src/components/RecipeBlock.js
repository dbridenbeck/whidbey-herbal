import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import { fluidText, fluidH2 } from "../utils/responsiveSCSS";

  const RecipeTitle = styled.h2`
    margin-bottom: 5px;
    padding: 0;
    font-weight: bold;
    ${fluidH2}
    text-align: center;
    letter-spacing: 0.01em;
    color: #787878;
    `;

  const RecipeContainer = styled.div`
      position: relative;
      width: 45%;
      margin: 0 20px 20px 0;
      &:hover ${RecipeTitle} {
        color: #e3be42;
      }
    `;

  const RecipeImage = styled.img`
    display: block;
    width: 75%;
    height: auto;
    margin: 0 auto 20px auto;
    border-radius: 10px;
  `;
  
  const RecipeText = styled.p`
    margin: 0;
    padding: 0;
    font-weight: normal;
    ${fluidText}
    text-align: center;
    letter-spacing: 0.01em;
    color: #787878;
  `;

const RecipeBlock = ({recipe}) => {

  return (
    <RecipeContainer recipeName={recipe.node.title}>
      <RecipeImage
        src={`${recipe.node.image.originalSrc}`}
      />
      <RecipeTitle>{recipe.node.title}</RecipeTitle>
      <RecipeText>{recipe.node.excerpt}</RecipeText>
    </RecipeContainer>
  );
}

RecipeBlock.propTypes = {
  recipe: PropTypes.object
}

export default RecipeBlock;