import React from "react";
import Products from '../../SharedComponents/Products';
import Wrapper from "../../SharedComponents/Wrapper";
import StyledH1 from "../../SharedComponents/StyledH1";

const Shop = () => {

  return (
    <Wrapper>
      <StyledH1 centered={false} colorIsGrey={false}>Shop</StyledH1>
      <Products title={''} />
    </Wrapper>
  );
};

export default Shop;
