import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import PageWrapper from "../../SharedComponents/PageWrapper";
import FeaturedProduct from "../../SharedComponents/FeaturedProduct";
import StyledH1 from "../../SharedComponents/StyledH1";

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
          .filter(product => product.availableForSale)
          .map(product => (
            <FeaturedProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </PageWrapper>
  );
};

const mapStatetoProps = ({products}) => ({
  products
})

export default connect(mapStatetoProps)(Shop);
