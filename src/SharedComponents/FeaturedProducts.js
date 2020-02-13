import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import ComponentWrapper from "./ComponentWrapper";
import StyledH2 from "./StyledH2";
import Product from './Product';
import { queryFeaturedProductsCollection } from '../state/fetchShopifyData';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
`;

const ExploreShopLink = styled(Link)`
  display: block;
  width: 40%;
  min-width: 200px;
  max-width: 300px;
  margin: 30px auto 0 auto;
  padding: 10px 5px;
  color: #e3be42;
  border: 2px solid #e3be42;
  border-radius: 10px;
  text-align: center;
  font-size: 1.225em;
  font-weight: 300;
  text-decoration: none;
  &:hover {
    background-color: #e3be42;
    color: white;
  }
`;

const Products = ({ title, hasTopBottomBorders }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // TODO: figure out how to avoid re-fetching on route changes
  if (featuredProducts.length === 0) {
    // make query with items sorted by MANUAL order
    client.graphQLClient
      .send(queryFeaturedProductsCollection, { sortKey: "MANUAL" })
      .then(({ model, data }) => {
        // store products in local state
        setFeaturedProducts(data.collectionByHandle.products.edges);
      })
      .catch( error => console.log("Error fetching featured-products collection: ", error));
  }

  return (
    <ComponentWrapper hasTopBottomBorders={hasTopBottomBorders}>
      <StyledH2> {title} </StyledH2>
      <ProductsContainer>
        {featuredProducts
        .map(product => (
          <Product key={product.node.id} product={product} />
        ))}
      </ProductsContainer>
      <ExploreShopLink to="/shop">Explore the Shop</ExploreShopLink>
    </ComponentWrapper>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  title: PropTypes.string
}

export default Products;