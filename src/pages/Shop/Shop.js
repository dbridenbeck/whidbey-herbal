import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import PageWrapper from "../../SharedComponents/PageWrapper";
import ShopProduct from "./ShopProduct";
import StyledH1 from "../../SharedComponents/StyledH1";
import Footer from "../../SharedComponents/Footer";
import { GET_SHOP_PRODUCTS } from "../../queries";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  margin: 70px 0;
`;

const Shop = () => {

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
