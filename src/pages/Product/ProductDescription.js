import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QuantityButton from "../../SharedComponents/QuantityButton";
import BuyButton from "../../SharedComponents/BuyButton";
import StyledH1 from "../../SharedComponents/StyledH1";

import { device } from "../../utils/devices";

import * as CartActionCreators from "../../state/actions/cart";
import styled from "styled-components";

// Begin Styled Components
const ProductDetailsWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 50px auto 0 auto;
  color: #787878;
  h2 {
    margin: 25px 0 0 0;
    font-size: 32px;
    font-weight: normal;
  }
  h4 {
    margin: 25px 0 0 0;
    font-weight: normal;
  }
  p {
    margin: 0;
  }
  p.caution {
    font-size: 12px;
    color: #787878;
  }
  @media ${device.tablet} {
    width: 45%;
    margin: 0 auto;
  }
  @media ${device.laptop} {
    width: 55%;
    margin: 0 auto;
  }
`;

const AboutText = styled.p``;

const CTABlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 4px solid #e3be42;
`;

const Price = styled.p`
  display: block;
  width: 30%;
  text-align: center;
  font-size: 28px;
  color: #787878;
  font-weight: normal;
`;

const ShopifyHTML = styled.div`
  margin-top: 30px;
`;

// begin component
const ProductDetails = ({
  selectedProduct,
  doesItemExist,
  quantityButtonAmount,
  updateQuantityButton
}) => {
  const quantity = quantityButtonAmount === "" ? 0 : quantityButtonAmount;
  console.log("what is quantity?: ", quantity);

  // begin component's return
  return (
      <ProductDetailsWrapper>
        <StyledH1 colorIsGrey={false} centered={false}>{selectedProduct.title}</StyledH1>
        {/* TODO replace AboutText's content with metafield via shopify once I have it whitelisted via graphql admin api */}
        <AboutText>
          {" "}
          We are one of few distilleries creating Western Hemlock essential
          oil. When you smell it, you will understand why we had to have it in
          our collection, and why it’s the Washington state tree!{" "}
        </AboutText>
        <CTABlock>
          <Price>${selectedProduct.variants.edges[0].node.price}</Price>
          <QuantityButton
            selectedProduct={selectedProduct}
            labelTitle={"Quantity: "}
            quantity={quantityButtonAmount}
            shouldAddQuantities={true}
            onChangeFunction={updateQuantityButton}
          />
          <BuyButton
            selectedProduct={selectedProduct}
            quantity={quantity}
            doesItemExist={doesItemExist}
          />
        </CTABlock>
        <ShopifyHTML
          dangerouslySetInnerHTML={{
            __html: selectedProduct.descriptionHtml
          }}
        />
      </ProductDetailsWrapper>
  );
};

ProductDetails.propTypes = {
  selectedProduct: PropTypes.object,
doesItemExist: PropTypes.number,
  quantityButtonAmount: PropTypes.number,
  updateQuantityButton: PropTypes.func
};

const mapStateToProps = ({
  quantityButtonAmount
}) => ({
  quantityButtonAmount
});

const mapDispatchToProps = dispatch => ({
  updateQuantityButton: quantity =>
    dispatch(CartActionCreators.updateQuantityButton(quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
