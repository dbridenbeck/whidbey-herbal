import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { connect } from "react-redux";
import { device } from "../utils/devices";
import { laptopMargins, tabletMargins } from "../utils/responsiveSCSS";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto 0 auto;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  width: 100%;
  max-width: 1000px;
  @media ${device.tablet} {
    ${tabletMargins};
  }
  @media ${device.laptop} {
    ${laptopMargins};
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.h2`
  margin: 0;
  font-size: min(max(16px, 2vw), 24px);
  font-weight: normal;
  color: black;
  text-decoration: none;
  text-align: center;
  `;

  const Product = styled.div`
    display: block;
    margin-bottom: 20px;
    width: 35%;
    &:hover ${Title} {
      color: #e3be42;
    }
    @media ${device.tablet} {
      width: 25%;
    }
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
  font-size: min(max(12px, 2vw), 16px);
  line-height: min(max(13px, 2vw), 18px);
  color: #666666;
  font-weight: normal;
  text-align: center;
  margin: 0;
`;

const ExploreShopLink = styled(Link)`
  display: block;
  margin: 30px auto 0 auto;
  padding: 5px;
  width: 40%;
  max-width: 300px;
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

const Products = ({Reducer1}) => {

  const availableProducts = Reducer1.products.filter(product => product.availableForSale)

  return (
    <div>
      <ProductsContainer>
        {availableProducts.map((product) => (
          <Product key={product.id}>
            <ProductLink to={`/product/${product.handle}`} >
              <ImageContainer>
                <Image src={`${product.images[0].src}`}
                  alt="this is a product photo"
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
          </Product>
        ))}
      </ProductsContainer>
      <ExploreShopLink to="/">
        Explore the Shop
      </ExploreShopLink>
    </div>
  );
};

const mapStateToProps = ( Reducer1 ) => ({
  Reducer1
});

export default connect(mapStateToProps)(Products);