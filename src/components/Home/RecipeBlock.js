import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { device } from '../../utils/devices';
import Image from 'next/image';

const RecipeLink = styled.div`
  display: block;
  text-decoration: none;
  margin-bottom: 20px;
  padding-left: 20px;
  /* position last item aligned left if last item is odd */
  :last-child:nth-child(odd) {
    align-self: flex-start;
    // margin-right: auto;
  }
  @media ${device.tablet} {
    :last-child:nth-child(odd) {
      align-self: flex-start;
    }
  }
`;

const RecipeContainer = styled.div`
  position: relative;
  /* use relative positioning to make margin for :last-child:nth-child(odd) on RecipeLink work */
  &:hover h5 {
    color: #e3be42;
  }
  &:hover svg path {
    fill: #e3be42;
  }
  width: 134px;

  @media ${device.tablet} {
    width: 202px;
  }
  @media ${device.laptop} {
    width: 270px;
  }
  @media ${device.largeScreen} {
    width: 316px;
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

const RecipeImage = styled.div`
  position: relative;
  display: block;
  width: 134px;
  height: 134px;
  margin-bottom: 20px;
  @media ${device.tablet} {
    width: 202px;
    height: 202px;
  }
  @media ${device.laptop} {
    width: 270px;
    height: 270px;
  }
  @media ${device.largeScreen} {
    width: 316px;
    height: 316px;
  }
`;

const RecipeBlock = ({
  recipe: {
    node: {
      title,
      handle,
      excerpt,
      image: { transformedSrc, altText },
    },
  },
}) => {
  return (
    <Link href={`/recipe/${handle}`}>
      <RecipeLink>
        <RecipeContainer recipeName={title}>
          <RecipeImage>
            <Image src={transformedSrc} alt={altText} layout="fill" />
          </RecipeImage>
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
                fillOpacity="0.54"
              />
            </svg>

            <p className="recipeText">{excerpt}</p>
          </RecipeInfo>
        </RecipeContainer>
      </RecipeLink>
    </Link>
  );
};

RecipeBlock.propTypes = {
  title: PropTypes.string,
  handle: PropTypes.string,
  excerpt: PropTypes.string,
  originalSrc: PropTypes.string,
};

export default RecipeBlock;
