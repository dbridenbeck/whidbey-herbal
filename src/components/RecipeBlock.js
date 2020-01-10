import React from 'react';
import styled from "styled-components";
import { fluidText, fluidH2 } from "../utils/responsiveSCSS";

const RecipeBlock = ({recipe}) => {

  const RecipeName = styled.h2`
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
      width: 40%;
      margin: 0 20px 20px 0;
      &:hover ${RecipeName} {
        color: #e3be42;
      }
    `;

  const RecipieImage = styled.img`
    width: 75%;
    display: block;
    margin: 0 auto 20px auto;
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

  return (
    <RecipeContainer>
      <RecipieImage src={`${recipe.img}`} />
      <RecipeName>{recipe.recipeName}</RecipeName>
      <RecipeText>{recipe.description}</RecipeText>
    </RecipeContainer>
  );
}

export default RecipeBlock;