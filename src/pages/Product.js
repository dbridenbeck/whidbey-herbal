import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import QuantityButton from '../components/QuantityButton';

import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";


// Begin Styled Components
const ProductWrapper = styled.div`
  display: block;
  height: auto;
  width: 100%;
  margin: 90px auto 0 auto;
`;

const ProductInfo = styled.div`
  width: 100%;
  margin: 0 auto;
  height: auto;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    }
`;

const Images = styled.div`
  width: 60%;
  margin: 0 auto;
  @media ${device.tablet} {
    width: 45%;
  }
  @media ${device.laptop} {
    width: 35%;
    margin: 0 7.5%;
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
  align-content: center;
  height: auto;
  width: 100%;
  margin: 0 auto;
`;

const AltImage = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  align-self: center;
  margin: 0 10px;
  border: ${props => 
    (props.isSelected ? "2px solid #e3be42" : "2px solid white")};
  border-radius: 10px;
  :hover {
    border: ${props =>
      props.isSelected ? "2px solid #e3be42" : "2px solid #DADADA"};
  }
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
    width: 50%;
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
    margin-top: -4%;
  }
`;

const AboutText = styled.p`

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
  :focus {
    outline-width: 0;
  }
`;

const ShopifyHTML = styled.div`
  margin-top: 30px;
`;

// begin component
const Product = ({
    checkout,
    products,
    updateItemQuantity,
    addLineItem,
    match,
    heroImgSrc,
    heroImgId,
    handleHeroImg
  }) => {

  console.log("is the products page re-rendering?")
  const { handle } = match.params;

  // select the current product
  const selectProduct = products.filter(
    product => handle === product.handle
  );
  const selectedProduct = selectProduct[0];

  // check if item exists in checkout already
  const doesItemExist = checkout.lineItems.filter(
    lineItem => lineItem.id === selectedProduct.id
  );

  // create buy button
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
  };

  // when clicked, AltImage updates state and sets heroImg's src to AltImage
  const createAltImage = image => {
   const setHeroImg = () =>
     handleHeroImg(image.node.src, image.node.id);
   return (
     <AltImage
       key={image.node.id}
       src={image.node.src}
       alt={image.node.altText}
       isSelected={image.node.id === heroImgId}
       onClick={setHeroImg}
     />
   );
 };

  // begin component's return
  return (
    <ProductWrapper>
      <ProductInfo>
        <Images>
          <HeroImage
            src={
              heroImgSrc
                ? heroImgSrc
                : selectedProduct.images.edges[0].node.src
            }
            alt="Product Photo"
          />
          <AltImages>
            {selectedProduct.images.edges.map(image =>
              createAltImage(image)
            )}
          </AltImages>
        </Images>
        <ProductDetails>
          <Title>{selectedProduct.title}</Title>
          {/* TODO replace AboutText's content with metafield via shopify once I have it whitelisted via graphql admin api */}
          <AboutText>
            {" "}
            We are one of few distilleries creating Western Hemlock
            essential oil. When you smell it, you will understand why
            we had to have it in our collection, and why it’s the
            Washington state tree!{" "}
          </AboutText>
          <CTABlock>
            <Price>
              ${selectedProduct.variants.edges[0].node.price}
            </Price>
            <QuantityButton />
            {createBuyButton(selectedProduct, 1, `Add to Cart`)}
          </CTABlock>
          <ShopifyHTML
            dangerouslySetInnerHTML={{
              __html: selectedProduct.descriptionHtml
            }}
          />
        </ProductDetails>
      </ProductInfo>

      <Reviews />

      <Products title={"More Products"} />
    </ProductWrapper>
  );
}

Product.propTypes = {
  checkout: PropTypes.object,
  products: PropTypes.array,
  updateItemQuantity: PropTypes.func,
  addLineItem: PropTypes.func,
  heroImg: PropTypes.string,
  heroImgHandle: PropTypes.string,
  handleHeroImg: PropTypes.func
};

const mapStateToProps = ({checkout, products, heroImgSrc, heroImgId}) => ({
  checkout,
  products,
  heroImgSrc,
  heroImgId
});

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (product, quantityToUpdate) =>
    dispatch(CartActionCreators.updateItemQuantity(product, quantityToUpdate)),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity)),
  handleHeroImg: (imageSrc, imageId) =>
    dispatch(CartActionCreators.handleHeroImg(imageSrc, imageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
