import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { device } from "../../utils/devices";


const RecipeLink = styled(Link)`
  display: block;
  width: 47%;
  text-decoration: none;
    /* position last item aligned left if last item is odd */
  :last-child:nth-child(odd) {
    margin: 0 auto 0 2%;
  }
  @media ${device.tablet} {
    width: 30%;
    :last-child:nth-child(odd) {
      margin: 0;
    }
  }
`;

const RecipeContainer = styled.div`
  position: relative;
  /* use relative positioning to make margin for :last-child:nth-child(odd) on RecipeLink work */
  margin: 0 6% 70px 6%;
  &:hover h5 {
    color: #e3be42;
  }
  &:hover svg path {
    fill: #e3be42;
  }
`;

const RecipeInfo = styled.div`
  position: relative;
  h5 {
    display: block;
    margin-bottom: 5px;
    padding-right: 8%;
    font-weight: bold;
    font-size: 0.825rem;
    color: #2e2e2e;
    @media ${device.tablet} {
      font-size: 1rem;
    }
    @media ${device.laptop} {
      font-size: 1.124rem;
    }
  }
  .recipeText {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-style: normal;
    font-size: 0.825rem;
    color: #2e2e2e;
    @media ${device.tablet} {
      font-size: 0.925rem;
    }
    @media ${device.laptop} {
      font-size: 1rem;
    }
  }
  svg {
    position: absolute;
    top: 2px;
    right: 0px;
    width: 8%;
    @media ${device.tablet} {
      top: 5px;
    }
  }
`;

  const RecipeImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto 20px auto;
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
        <RecipeInfo>
          <h5>{title}</h5>
          {/* SVG for right arrow icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
              fill="black"
              fill-opacity="0.54"
            />
          </svg>

          <p className="recipeText">{excerpt}</p>
        </RecipeInfo>
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