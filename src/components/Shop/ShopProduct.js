import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import * as CartActionCreators from '../../state/actions/cart';
import StyledH5 from '../../SharedComponents/StyledH5';
import { useRouter } from 'next/router';
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
  .soldOutWarning {
    position: absolute;
    width: 100%;
    height: 80%;
    z-index: 99;
    top: 0;
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

const ProductLink = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  a {
    text-decoration: none;
  }
`;

const createProduct = (product, clearHeroImg, updateQuantityButton) => {
  const clearHeroImgAndQuantityButton = () => {
    clearHeroImg();
    updateQuantityButton(1);
  };

  return (
    <Link
      href={{
        pathname: '/product/[handle]',
        query: { handle: product.handle },
      }}
    >
      <ProductLink>
        <div
          onClick={clearHeroImgAndQuantityButton}
          // using style to work nicely with next's Image component
          style={{
            display: 'block',
            position: 'relative',
            marginBottom: '20px',
            paddingTop: 'calc((450 / 400) * 100%)',
          }}
        >
          {!product.availableForSale ? (
            <div className="soldOutWarning">
              {' '}
              <span>SOLD OUT</span>{' '}
            </div>
          ) : null}
          <Image
            src={`${product.images.edges[0].node.transformedSrc}`}
            alt={`${product.description}`}
            layout="fill"
            // using style to work nicely with next's Image component
            style={{ opacity: product.availableForSale ? '1' : '0.5' }}
            sizes={`(max-width: 768px) 36vw,
                      33vw,
                    `}
            priority
          />
        </div>

        <StyledH5> {product.title.toUpperCase()} </StyledH5>
        <p className="info">${product.variants.edges[0].node.price}</p>
      </ProductLink>
    </Link>
  );
};

// begin component
const ShopProduct = ({ product, clearHeroImg, updateQuantityButton }) => {
  const { pathname } = useRouter();
  return (
    <ProductContainer pathname={pathname}>
      {createProduct(product, clearHeroImg, updateQuantityButton)}
    </ProductContainer>
  );
};

ShopProduct.propTypes = {
  product: PropTypes.object,
  clearHeroImg: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg()),
  updateQuantityButton: (amount) =>
    dispatch(CartActionCreators.updateQuantityButton(amount)),
});

export default connect(null, mapDispatchToProps)(ShopProduct);
