import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../utils/devices";
import * as CartActionCreators from "../state/actions/cart";
import StyledH5 from "./StyledH5";

const ProductContainer = styled.div`
  display: block;
  width: 35%;
  margin-bottom: 40px;
  :hover h5 {
    color: #e3be42;
  }
  .info {
    margin: 0;
    font-size: 0.75em;
    line-height: 1.167em;
    font-weight: normal;
    text-align: center;
    color: black;
  }
  :last-child {
    display: none;
    @media ${device.laptop} {
      display: block;
    }
  }
  @media ${device.tablet} {
    width: 25%;
    margin-bottom: 20px;
  }
  @media ${device.laptop} {
    width: 20%;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
`;

const ImageContainer = styled.div`
    display: block;
    max-width: 100%;
    margin-bottom: 20px;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
`

const createProduct = (product, clearHeroImg, updateQuantityButton) => {
  const clearHeroImgAndQuantityButton = () => {
    clearHeroImg();
    updateQuantityButton(1);
  }

  console.log("what is product in FeaturedProduct?: ", product)

  return (
    <ProductLink to={`/product/${product.handle}`} onClick={clearHeroImgAndQuantityButton}>
      <ImageContainer>
        <Image
          src={`${product.images.edges[0].node.src}`}
          alt={`${product.description}`}
        />
      </ImageContainer>
      <StyledH5 centered={true}> {product.title.toUpperCase()} </StyledH5>
      <p className="info">
        ${product.variants.edges[0].node.price}
      </p>
    </ProductLink>
  );
};

// begin component
const Product = ({product: {node}, clearHeroImg, updateQuantityButton}) => {
  return (
    <ProductContainer>
      {createProduct(node, clearHeroImg, updateQuantityButton)}
    </ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  clearHeroImg: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg()),
  updateQuantityButton: (amount) => dispatch(CartActionCreators.updateQuantityButton(amount))
})

export default connect(null, mapDispatchToProps)(Product);