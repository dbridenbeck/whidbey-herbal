import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../utils/devices";
import * as CartActionCreators from "../state/actions/cart";

const Title = styled.h2`
  margin: 0;
  font-size: 1em;
  font-weight: normal;
  color: #787878;
  text-decoration: none;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: block;
  width: 35%;
  margin-bottom: 20px;
  &:hover ${Title} {
    color: #e3be42;
  }
  @media ${device.tablet} {
    width: 25%;
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

const Info = styled.p`
  margin: 0;
  font-size: 0.75em;
  line-height: 1.167em;
  font-weight: normal;
  text-align: center;
  color: #666666;
`;

const createProductLink = (product, clearHeroImg) => {
  const setHeroImg = () => clearHeroImg();
  return (
  <ProductLink to={`/product/${product.handle}`} onClick={setHeroImg}>
    <ImageContainer>
      <Image
        src={`${product.images.edges[0].node.src}`}
        alt={`${product.description}`}
      />
    </ImageContainer>
    <Title> {product.title.toUpperCase()} </Title>
  </ProductLink>
  )
}

const Product = ({product, clearHeroImg}) => {

  return (
    <ProductContainer>
      {createProductLink(product, clearHeroImg)}
      <Info>
        5ml bottle <br />
        <strong>${product.variants.edges[0].node.price}</strong>
      </Info>
    </ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg())
})

export default connect(null, mapDispatchToProps)(Product);