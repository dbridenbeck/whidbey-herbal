import React from 'react';
import styled from "styled-components";
import RecipeBlock from './RecipeBlock';
import { device } from "../utils/devices";
import { laptopMargins, tabletMargins, mobileMargins, fluidH1 } from "../utils/responsiveSCSS";
import lilacHoney from '../images/lilacHoney.jpg';
import calendulaOil from '../images/calendulaOil.jpg';

const RecipesWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  ${mobileMargins};
  @media ${device.tablet} {
    ${tabletMargins};
  }
  @media ${device.laptop} {
    ${laptopMargins};
  }
`;

const ContainerTitle = styled.h1`
  margin: 20px auto;
  font-weight: bold;
  ${fluidH1}
  text-align: center;
  letter-spacing: 0.01em;
  color: #787878;
`;

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
`;

const RecipeSection = () => {

  const recipes = [
    {
      recipeName: "LILAC INFUSED HONEY",
      description: "Treat yourself to one of life’s great flavors!",
      img: `${lilacHoney}`,
    },
    {
      recipeName: "CALENDULA ROSE OIL",
      description: "A fantastic addition to your medicine cabinet",
      img: `${calendulaOil}`,
    }
  ];

  return (
    <RecipesWrapper id="recipes">
      <ContainerTitle>Recipes</ContainerTitle>
      <RecipeWrapper>
        {recipes.map(recipe => (
          <RecipeBlock 
            recipe={recipe} 
            key={recipe.recipeName} 
          />
        ))}
      </RecipeWrapper>
    </RecipesWrapper>
  );
}

export default RecipeSection;