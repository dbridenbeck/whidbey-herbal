import React from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";

import RecipeBlock from './RecipeBlock';

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px auto 0;
`;

const RecipeSection = ({articles}) => {
  return (
    <ComponentWrapper id="recipes" maxWidth={""}>
      <StyledH2>
        Recipes
      </StyledH2>
      <RecipeContainer>
        {articles.map(article => (
          <RecipeBlock recipe={article} key={article.node.id} />
        ))}
      </RecipeContainer>
    </ComponentWrapper>
  );
}

RecipeSection.propTypes = {
  articles: PropTypes.array
};

const mapStatetoProps = ({articles}) => ({
  articles
})

export default connect(mapStatetoProps, null)(RecipeSection);