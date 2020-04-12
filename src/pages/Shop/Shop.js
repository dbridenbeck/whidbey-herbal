import React from "react";
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
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


const Shop = ({products}) => {

  // copy prodcuts and sort diffuser to end of array
  const sortDiffuserToEnd = [...products].sort((a,b) => 
    a.title.includes("&") 
      ? 0
      : -1
  );

  // then sort unavailable products to very end of array
  const sortedAvailableProducts = [...sortDiffuserToEnd].sort((a, b) =>
    a.availableForSale === b.availableForSale
      ? 0
      : a.availableForSale
      ? -1
      : 1
  );

  return (
    <PageWrapper>
      <StyledH1>
        Shop
      </StyledH1>
      <ProductsContainer>
        {sortedAvailableProducts
          .map(product => (
            <ShopProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
      <Footer />
    </PageWrapper>
  );
};

const mapStatetoProps = ({products}) => ({
  products
})

export default connect(mapStatetoProps)(Shop);
