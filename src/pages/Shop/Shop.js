import React from "react";
import Products from '../../SharedComponents/Products';
import PageWrapper from "../../SharedComponents/PageWrapper";
import StyledH1 from "../../SharedComponents/StyledH1";
import Footer from "../../SharedComponents/Footer";

const Shop = () => {

  return (
    <PageWrapper>
      <StyledH1 centered={false} colorIsGrey={false}>Shop</StyledH1>
      <Products title={''} />
      <Footer />
    </PageWrapper>
  );
};

export default Shop;
