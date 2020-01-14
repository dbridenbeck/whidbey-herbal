import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';


import RecipeBlock from './RecipeBlock';

import { device } from "../utils/devices";
import { laptopMargins, tabletMargins, mobileMargins, fluidH1 } from "../utils/responsiveSCSS";

import lilacHoney from '../images/lilacHoney.jpg';
import calendulaOil from '../images/calendulaOil.jpg';

const RecipesWrapper = styled.div`
  position: relative;
  width: 100%;
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

const recipes = [
  {
    recipeName: "LILAC INFUSED HONEY",
    description: "Treat yourself to one of life’s great flavors!",
    img: `${lilacHoney}`,
    width: "600",
    height: "600",
    alt:
      "A photo of lilac flowers in a canning jar in front of a backdrop trees, the farm and a tractor."
  },
  {
    recipeName: "CALENDULA ROSE OIL",
    description: "A fantastic addition to your medicine cabinet",
    img: `${calendulaOil}`,
    width: "600",
    height: "600",
    alt:
      "Overhead photo of a bowl of flowers, a pair of scissors and two zucchinis"
  }
];

const RecipeSection = () => {

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