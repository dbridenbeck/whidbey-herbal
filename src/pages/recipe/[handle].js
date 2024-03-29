import apolloClient from '../../apolloClient';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import PageWrapper from '../../SharedComponents/PageWrapper';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import StyledH1 from '../../SharedComponents/StyledH1';
import { GET_FEATURED_PRODUCTS_AND_ARTICLES } from '../../queries';
import Image from 'next/image';
import HeadTags from '../../SharedComponents/HeadTags';

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
  display: block;
  position: relative;
  padding-top: 100%;
  img {
    border-radius: 10px;
  }
  @media ${device.tablet} {
    padding-top: 0;
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
const Recipe = ({ selectedRecipe, products, ogUrl }) => {
  const {
    node: {
      title,
      image: { url },
      contentHtml,
    },
  } = selectedRecipe;

  const createRecipe = () => {
    return (
      <>
        <StyledH1>{title}</StyledH1>
        <RecipeContainer>
          <RecipeImage>
            <Image
              src={url}
              layout="fill"
              sizes="(max-width: 768px) 100vw,
                (max-width: 1024px) 275px,
                (max-width: 1200px) 377px,
                448px
              "
              priority
            />
          </RecipeImage>
          <ShopifyHTML
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />
        </RecipeContainer>
      </>
    );
  };

  return (
    <>
      <HeadTags title={title} ogUrl={ogUrl} ogImage={url} />
      <PageWrapper>
        {createRecipe()}
        <FeaturedProducts
          title={'Explore the Shop'}
          products={products}
          bottomPadding
        />
      </PageWrapper>
    </>
  );
};

export default Recipe;

export async function getServerSideProps({ req, query, resolvedUrl }) {
  const protocol = req.headers?.referer?.split('/')[0] || '';
  const { data } = await apolloClient.query({
    query: GET_FEATURED_PRODUCTS_AND_ARTICLES,
  });
  const handle = query.handle;
  // select the current product
  const selectRecipe = data.articles.edges.filter(
    (recipe) => handle === recipe.node.handle
  );

  const selectedRecipe = selectRecipe[0];

  return {
    // TODO, handle error from apollo query
    props: {
      selectedRecipe,
      products: data?.collections?.edges,
      ogUrl: `${protocol}//${req.headers.host}${resolvedUrl}`,
    },
  };
}
