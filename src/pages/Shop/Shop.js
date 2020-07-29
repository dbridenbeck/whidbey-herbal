import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PageWrapper from "../../SharedComponents/PageWrapper";
import ShopProduct from "./ShopProduct";
import StyledH1 from "../../SharedComponents/StyledH1";
import Footer from "../../SharedComponents/Footer";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  margin: 70px 0;
`;

const Shop = () => {
  const GET_SHOP_PRODUCTS = gql`
    query getShopProducts($collectionName: String!) {
      collections(query: $collectionName, first: 2) {
        edges {
          node {
            title
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  availableForSale
                  variants(first: 1) {
                    edges {
                      node {
                        price
                      }
                    }
                  }
                  images(first: 6) {
                    edges {
                      node {
                        altText
                        transformedSrc(maxWidth: 400, maxHeight: 450)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const location = useLocation();

  const collectionToQuery =
    location.pathname === "/shop" ? "Online Store" : "Wholesale Products";

  const { loading, error, data } = useQuery(GET_SHOP_PRODUCTS, {
    variables: { collectionName: collectionToQuery },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const products = data.collections.edges[0].node.products.edges;

  return (
    <PageWrapper>
      <StyledH1>
        {location.pathname === "/shop" ? "Shop" : "Wholesale Shop"}
      </StyledH1>
      <ProductsContainer>
        {products.map((product) => (
          <ShopProduct key={product.node.id} product={product.node} />
        ))}
      </ProductsContainer>
      <Footer />
    </PageWrapper>
  );
};

export default Shop;
