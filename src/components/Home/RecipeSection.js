import styled from 'styled-components';
import PropTypes from 'prop-types';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';

import RecipeBlock from './RecipeBlock';

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px auto 20px auto;
`;

const RecipeSection = ({ articles }) => {
  return (
    <ComponentWrapper id="recipes" maxWidth={''}>
      <StyledH2>Recipes</StyledH2>
      <RecipeContainer>
        {articles.map((article) => (
          <RecipeBlock recipe={article} key={article.node.handle} />
        ))}
      </RecipeContainer>
    </ComponentWrapper>
  );
};

RecipeSection.propTypes = {
  articles: PropTypes.array,
};

export default RecipeSection;
