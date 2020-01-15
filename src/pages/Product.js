import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import QuantityButton from '../components/QuantityButton';

import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";


// Start Styled Components

const ProductInfo = styled.div`
  width: 100%;
  margin: 50px auto 0 auto;
  height: auto;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    }
`;

const Images = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
  @media ${device.tablet} {
    width: 45%;
  }
`;

const HeroImage = styled.img`
  display: block;
  margin-bottom: 30px;
  width: 100%;
  height: auto;
  border: 4px solid #e3be42;
  border-radius: 10px;
`;

const AltImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  height: auto;
  margin: 0 auto;
`;

const AltImage = styled.img`
  display: block;
  width: 46%;
  height: auto;
  margin: 0 10px;
  border: 1px solid #e3be42;
  border-radius: 10px;
`;

const ProductDetails = styled.div`
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
`;

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: bold;
  @media ${device.tablet} {
    margin-top: -20px;
  }
`;

const AboutText = styled.p`
    margin: 0 auto;
    padding: 0;
    font-size: min(max(15px, 3vw), 18px);
    line-height: min(max(18px, 3vw), 32px);
    text-align: left;
    font-style: normal;
    letter-spacing: 0.01em;
    color: #787878;
`;

const CTABlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 4px solid #E3BE42;
`;

const Price = styled.p`
  display: block;
  width: 30%;
  text-align: center;
  font-size: 28px;
  color: #787878;
  font-weight: normal;
`;

const BuyButton = styled.button`
  display: block;
  width: 25%;
  max-width: 300px;
  height: 40%;
  padding: 5px;
  color: #e3be42;
  text-align: center;
  font-size: min(max(16px, 2vw), 18px);
  font-weight: normal;
  border: 1px solid #e3be42;
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    background-color: #e3be42;
    color: white;
  }
`;

const ShopifyHTML = styled.div`
  margin-top: 30px;
`;

const Product = ( { checkout, products, updateItemQuantity, addLineItem, match } ) => {
  const { handle } = match.params;

  const selectProduct = products.filter( product => handle === product.handle );
  const selectedProduct = selectProduct[0];

  const doesItemExist = checkout.lineItems.filter(
    lineItem => lineItem.id === selectedProduct.id
  );

const createBuyButton = (product, quantity, buttonText) => {
  const addItem = () => addLineItem(product, quantity);
  const updateQuantity = () => updateItemQuantity(product, quantity);
  
  return (
    <BuyButton
      className="buyButton"
      onClick={doesItemExist.length ? updateQuantity : addItem}
    >
      {buttonText}
    </BuyButton>
  );
}

  return (
    <div>
      <ProductInfo>
        <Images>
          <HeroImage
            src={selectedProduct.images.edges[0].node.src}
            alt={selectedProduct.images.edges[0].node.altText}
          />
          <AltImages>
            {selectedProduct.images.edges.map(image => (
              <AltImage src={image.node.src} alt={image.node.altText} />
            ))}
          </AltImages>
        </Images>
        <ProductDetails>
          <Title>{selectedProduct.title}</Title>
          {/* TODO replace AboutText's content with metafield via shopify */}
          <AboutText>
            {" "}
            We are one of few distilleries creating Western Hemlock essential
            oil. When you smell it, you will understand why we had to have it in
            our collection, and why it’s the Washington state tree!{" "}
          </AboutText>
          <CTABlock>
            <Price>${selectedProduct.variants.edges[0].node.price}</Price>
            <QuantityButton />
            {createBuyButton(
              selectedProduct,
              1,
              `Add to Cart`
            )}
          </CTABlock>
          <ShopifyHTML dangerouslySetInnerHTML={{__html: selectedProduct.descriptionHtml}} />
        </ProductDetails>
      </ProductInfo>

      <Reviews />

      <Products title={"View More Products"} />
    </div>
  );
};

Product.propTypes = {
  checkout: PropTypes.object,
  products: PropTypes.array,
  updateItemQuantity: PropTypes.func,
  addLineItem: PropTypes.func,
};

const mapStateToProps = ({checkout, products}) => ({
  checkout,
  products
});

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (product, quantityToUpdate) =>
    dispatch(CartActionCreators.updateItemQuantity(product, quantityToUpdate)),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
