import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductDescription from './ProductDescription';
import ProductImages from './ProductImages';

import { device } from '../../utils/devices';

// Begin Styled Components
const ProductInfoWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: auto;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

// begin component
const ProductDetails = ({ selectedProduct, doesItemExist }) => {
  return (
    <ProductInfoWrapper>
      <ProductImages
        images={selectedProduct.images}
        selectedProduct={selectedProduct}
      />
      <ProductDescription
        selectedProduct={selectedProduct}
        doesItemExist={doesItemExist}
      />
    </ProductInfoWrapper>
  );
};

ProductDetails.propTypes = {
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.bool,
};

export default ProductDetails;
