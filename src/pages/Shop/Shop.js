import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import PageWrapper from "../../SharedComponents/PageWrapper";
import Product from "../../SharedComponents/Product";
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

  return (
    <PageWrapper>
      <StyledH1 centered={false} colorIsGrey={false}>
        Shop
      </StyledH1>
      <ProductsContainer>
        {products
          .map(product => (
            <Product key={product.id} product={product} />
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
