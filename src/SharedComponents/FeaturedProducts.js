import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import ComponentWrapper from "./ComponentWrapper";
import StyledH2 from "./StyledH2";

import FeaturedProduct from './FeaturedProduct';
import { connect } from "react-redux";

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

  // create variable to use sortKey
  const sortKey = client.graphQLClient.variable(
    "sortKey",
    "ProductCollectionSortKeys"
  );
  // query to get collection with handle === "featured-products"
  const queryFeaturedProductsCollection = client.graphQLClient.query([sortKey], root => {
    root.add(
      "collectionByHandle",
      { args: { handle: "featured-products" } },
      collection => {
        collection.add("id");
        collection.addConnection(
          "products",
          { args: { sortKey: sortKey, first: 5} },
          product => {
            product.add("title");
            product.add("descriptionHtml");
            product.add("handle");
            product.add("availableForSale");
            product.addConnection(
              "collections",
              { args: { first: 2 } },
              collection => {
                collection.add("handle");
              }
            );
            product.addConnection(
              "metafields",
              { args: { first: 2 } },
              metafield => {
                metafield.add("key");
                metafield.add("value");
              }
            );
            product.addConnection("images", { args: { first: 10 } }, image => {
              image.add("id");
              image.add("src");
              image.add("altText");
            });
            product.addConnection(
              "variants",
              { args: { first: 1 } },
              variant => {
                variant.add("id");
                variant.add("price");
              }
            );
          }
        );
      }
    );
  });

  useEffect(() => {
    // make query with items sorted by MANUAL order
    client.graphQLClient
      .send(queryFeaturedProductsCollection, { sortKey: "MANUAL" })
      .then(({ model, data }) => {
        // store products in local state
        setFeaturedProducts(data.collectionByHandle.products.edges);
      });
    }, []);

  return (
    <ComponentWrapper hasTopBottomBorders={hasTopBottomBorders}>
      <StyledH2> {title} </StyledH2>
      <ProductsContainer>
        {featuredProducts
        .map(product => (
          <FeaturedProduct key={product.id} product={product} />
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