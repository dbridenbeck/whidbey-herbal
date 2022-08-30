import React, { useEffect } from 'react';
import apolloClient from '../../apolloClient';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import PageWrapper from '../../SharedComponents/PageWrapper';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import StyledH1 from '../../SharedComponents/StyledH1';
import Footer from '../../SharedComponents/Footer';
import { GET_FEATURED_PRODUCTS_AND_ARTICLES } from '../../queries';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Begin Styled Components
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  @media ${device.tablet} {
    display: block;
    flex-direction: none;
    flex-wrap: none;
  }
`;

const RecipeImage = styled.div`
  position: relative;
  width: 245px;
  height: 245px;
  img {
    border-radius: 10px;
  }
  @media ${device.tablet} {
    width: 275px;
    height: 275px;
    margin: 10px 10px 10px 0px;
    float: right;
  }
  @media ${device.laptop} {
    width: 377px;
    height: 377px;
  }
  @media ${device.largeScreen} {
    width: 448px;
    height: 448px;
  }
`;

const ShopifyHTML = styled.div`
  color: #787878;
  @media ${device.tablet} {
    width: 60%;
    padding: 0 70px 0 50px;
  }
`;

// begin component
const Recipe = ({ articles, products }) => {
  const createRecipe = (articles) => {
    const router = useRouter();
    const { handle } = router.query;

    // select the current product
    const selectRecipe = articles.filter(
      (recipe) => handle === recipe.node.handle
    );

    const selectedRecipe = selectRecipe[0];

    // handle direct navigation to recipe page
    if (selectedRecipe) {
      const {
        node: {
          title,
          image: { transformedSrc },
          contentHtml,
        },
      } = selectedRecipe;

      return (
        <>
          <StyledH1>{title}</StyledH1>
          <RecipeContainer>
            <RecipeImage>
              <Image src={transformedSrc} layout="fill" />
            </RecipeImage>
            <ShopifyHTML
              dangerouslySetInnerHTML={{
                __html: contentHtml,
              }}
            />
          </RecipeContainer>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <PageWrapper>
      {createRecipe(articles)}
      <FeaturedProducts
        title={'Explore the Shop'}
        products={products}
        bottomPadding
      />
      <Footer />
    </PageWrapper>
  );
};

export default Recipe;

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_FEATURED_PRODUCTS_AND_ARTICLES,
  });
  return {
    // TODO, handle error from apollo query
    props: {
      articles: data?.articles?.edges,
      products: data?.collections?.edges,
    },
  };
}
