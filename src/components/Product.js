import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../utils/devices";

const Title = styled.h2`
  margin: 0;
  font-size: min(max(16px, 2vw), 24px);
  font-weight: normal;
  color: black;
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
  font-size: min(max(12px, 2vw), 16px);
  line-height: min(max(13px, 2vw), 18px);
  font-weight: normal;
  text-align: center;
  color: #666666;
`;

const Product = ({product}) => {

  return (
    <ProductContainer>
      <ProductLink to={`/product/${product.handle}`} >
        <ImageContainer>
          <Image src={`${product.images[0].src}`}
            alt={`${product.description}`}
          />
        </ImageContainer>
          <Title> {product.title.toUpperCase()} </Title>
      </ProductLink>
      <Info>
        5ml bottle <br /> 
        <strong> 
          ${product.variants[0].price}
        </strong>
      </Info>
    </ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.object
}

export default Product;