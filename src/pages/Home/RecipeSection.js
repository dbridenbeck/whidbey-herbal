import React from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import RecipeBlock from './RecipeBlock';

import { device } from "../../utils/devices";
import { laptopMargins, tabletMargins, mobileMargins, fluidH1 } from "../../utils/responsiveSCSS";

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

const RecipeSection = ({articles}) => {
  return (
    <RecipesWrapper id="recipes">
      <ContainerTitle>Recipes</ContainerTitle>
      <RecipeWrapper>
        {articles.map(article => (
          <RecipeBlock 
            recipe={article} 
            key={article.node.id} 
          />
        ))}
      </RecipeWrapper>
    </RecipesWrapper>
  );
}

RecipeSection.propTypes = {
  articles: PropTypes.array
};

const mapStatetoProps = ({articles}) => ({
  articles
})

export default connect(mapStatetoProps, null)(RecipeSection);