import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../utils/devices';
import * as CartActionCreators from '../state/actions/cart';
import StyledH5 from './StyledH5';
import Image from 'next/image';

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
  }
  /* 
    :last-child allows 5 featured products to be shown on laptop, but on Mobile/Tablet
    the last product in the Featured-Products collection will be hidden. 
    If you are on the /shop route, ignore this rule altogether and show all products in shop.
  */
  ${(props) =>
    props.pathname !== '/shop'
      ? `
      :last-child {
        display: none;
        @media ${device.laptop} {
          display: block;
        }
      }
      `
      : null}
  @media ${device.tablet} {
    width: 22.5%;
    margin-bottom: 20px;
  }
  @media ${device.laptop} {
    width: 17.5%;
  }
`;

const ProductLink = styled.div`
  cursor: pointer;
  a {
    text-decoration: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
  max-width: 100%;
  margin-bottom: 20px;
`;

const StyledImage = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  height: 128px;
  width: 114px;
  @media ${device.tablet} {
    height: 194px;
    width: 172px;
  }
  @media ${device.laptop} {
    height: 201px;
    width: 180px;
  }
  @media ${device.largeScreen} {
    height: 236px;
    width: 210px;
  }
  ${(props) => (!props.isAvailable ? 'opacity: .5' : 'opacity: 1')};
`;

const SoldOutWarning = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 99;
  span {
    display: block;
    width: 100%;
    margin: 50% auto 0 auto;
    padding: 10px;
    color: #525252;
    font-size: 1em;
    font-weight: 300;
    text-align: center;
    background: rgba(230, 197, 100, 0.5);
  }
  @media ${device.tablet} {
    span {
      font-size: 1.25em;
    }
  }
`;

const createProduct = (product, clearHeroImg, updateQuantityButton) => {
  const clearHeroImgAndQuantityButton = () => {
    clearHeroImg();
    updateQuantityButton(1);
  };
  return (
    <Link href={`/product/${product.handle}`}>
      <ProductLink>
        <ImageContainer onClick={clearHeroImgAndQuantityButton}>
          <StyledImage isAvailable={product.availableForSale}>
            {!product.availableForSale ? (
              <SoldOutWarning>
                {' '}
                <span>SOLD OUT</span>{' '}
              </SoldOutWarning>
            ) : null}
            <Image
              src={`${product.images.edges[0].node.transformedSrc}`}
              alt={`${product.description}`}
              layout="fill"
            />
          </StyledImage>
        </ImageContainer>
        <StyledH5> {product.title.toUpperCase()} </StyledH5>
        <p className="info">${product.variants.edges[0].node.price}</p>
      </ProductLink>
    </Link>
  );
};

// begin component
const Product = ({ product, clearHeroImg, updateQuantityButton }) => {
  const { pathname } = useRouter();
  return (
    <ProductContainer pathname={pathname}>
      {createProduct(product, clearHeroImg, updateQuantityButton)}
    </ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  clearHeroImg: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg()),
  updateQuantityButton: (amount) =>
    dispatch(CartActionCreators.updateQuantityButton(amount)),
});

export default connect(null, mapDispatchToProps)(Product);
