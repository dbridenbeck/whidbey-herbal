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
    font-size: 1.5em;
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
    font-size: 0.75em;
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

const CTABlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  border-bottom: 4px solid #e3be42;
  .price {
    display: block;
    width: 30%;
    text-align: center;
    font-size: 1.5em;
    color: #787878;
    font-weight: normal;
    @media ${device.tablet} {
      text-align: left;
      width: 100%;
    }
    @media ${device.laptop} {
      text-align: center;
      width: 30%;
    }
  }
`;

const ShopifyHTML = styled.div`
  margin-top: 30px;
`;

// begin component
const ProductDetails = ({
  selectedProduct,
  selectedProduct: {title, variants, descriptionHtml},
  doesItemExist,
  quantityButtonAmount,
  updateQuantityButton
}) => {
  
  // handle null values for quantityButtonAmount
  const quantity = quantityButtonAmount === "" ? 0 : quantityButtonAmount;

  // begin component's return
  return (
      <ProductDetailsWrapper>
        <StyledH1 colorIsGrey={false} centered={false}>{title}</StyledH1>
        {/* TODO replace AboutText's content with metafield via shopify once I have it whitelisted via graphql admin api */}
        <p>
          We are one of few distilleries creating Western Hemlock essential
          oil. When you smell it, you will understand why we had to have it in
          our collection, and why it’s the Washington state tree!
        </p>
        <CTABlock>
          <span className="price">${variants.edges[0].node.price}</span>
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
            __html: descriptionHtml
          }}
        />
      </ProductDetailsWrapper>
  );
};

ProductDetails.propTypes = {
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.bool,
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
