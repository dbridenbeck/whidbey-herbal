import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../../utils/devices";
import * as CartActionCreators from "../../state/actions/cart";
import StyledH5 from "../../SharedComponents/StyledH5";

const ProductContainer = styled.div`
  display: block;
  position: relative;
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
  .soldOutWarning {
    position: absolute;
    width: 100%;
    height: 80%;
    z-index: 99;
    span {
      display: block;
      width: 100%;
      margin: 50% auto 0 auto;
      padding: 10px;
      color: #525252;
      font-size: 1.25em;
      font-weight: 300;
      text-align: center;
      background: rgba(230, 197, 100, 0.5);
    }
  }
  @media ${device.tablet} {
    width: 33%;
    margin-bottom: 50px;
  }
  @media ${device.laptop} {
    width: 33%;
    margin-bottom: 70px;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
  max-width: 100%;
  margin-bottom: 20px;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
${props => !props.isAvailable ? "opacity: .5" : "opacity: 1"};
`

const createProduct = (product, clearHeroImg, updateQuantityButton) => {
  const clearHeroImgAndQuantityButton = () => {
    clearHeroImg();
    updateQuantityButton(1);
  }

  return (
    <ProductLink
      to={`/product/${product.handle}`}
      onClick={clearHeroImgAndQuantityButton}
    >
      <ImageContainer>
        {!product.availableForSale ? (
          <div className="soldOutWarning">
            {" "}
            <span>SOLD OUT</span>{" "}
          </div>
        ) : null}
        <Image
          src={`${product.images.edges[0].node.src}`}
          alt={`${product.description}`}
          isAvailable={product.availableForSale}
        />
      </ImageContainer>
      <StyledH5 > {product.title.toUpperCase()} </StyledH5>
      <p className="info">${product.variants.edges[0].node.price}</p>
    </ProductLink>
  );
};

// begin component
const ShopProduct = ({location: {pathname}, product, clearHeroImg, updateQuantityButton}) => {
  return (
    <ProductContainer pathname={pathname}>
      {createProduct(product, clearHeroImg, updateQuantityButton)}
    </ProductContainer>
  );
};

ShopProduct.propTypes = {
  product: PropTypes.object,
  clearHeroImg: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg()),
  updateQuantityButton: (amount) => dispatch(CartActionCreators.updateQuantityButton(amount))
})

export default connect(null, mapDispatchToProps)(withRouter(ShopProduct));