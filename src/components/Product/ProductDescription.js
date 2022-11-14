import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCurrencyFormat } from '../../utils/createCurrencyFormat';
import QuantityButton from '../../SharedComponents/QuantityButton';
import BuyButton from './BuyButton';
import StyledH1 from '../../SharedComponents/StyledH1';

import { device } from '../../utils/devices';

import * as CartActionCreators from '../../state/actions/cart';
import styled from 'styled-components';

// Begin Styled Components
const ProductDetailsWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
  padding: 0;
  color: #787878;
  h2 {
    margin: 25px 0 0 0;
    font-size: 1.5em;
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
    font-size: 0.75em;
    color: #787878;
  }
  @media ${device.tablet} {
    margin-left: 20px;
    width: 45%;
  }
  @media ${device.laptop} {
    margin-left: 40px;
    width: 55%;
  }
`;

const CTABlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
  width: 100%;
  padding: 20px 0 35px 0;
  border-bottom: 4px solid #e3be42;
  .price {
    display: block;
    align-self: flex-start;
    width: 30%;
    text-align: center;
    font-size: 1.5em;
    color: #787878;
    font-weight: normal;
    @media ${device.tablet} {
      text-align: left;
      width: 100%;
    }
    @media ${device.laptop} {
      text-align: center;
      width: 30%;
    }
  }
  .soldOutWarning {
    position: absolute;
    width: 100%;
    span {
      display: block;
      width: 100%;
      margin: 0 auto;
      padding: 0px;
      color: #525252;
      font-size: 1.5em;
      font-weight: 300;
      text-align: right;
    }
  }
`;

const ShopifyHTML = styled.div`
  margin-top: 30px;
`;

const createCTABlock = (
  selectedProduct,
  doesItemExist,
  updateQuantityButton,
  quantityButtonAmount,
  lineItemQuantity
) => {
  const { variants, availableForSale, totalInventory } = selectedProduct;

  // handle null values for quantityButtonAmount
  const quantity = quantityButtonAmount === '' ? 0 : quantityButtonAmount;
  const price = createCurrencyFormat(variants.edges[0].node.priceV2.amount);
  const quantityAllowed = totalInventory - lineItemQuantity;

  const lineItemPlusQuantityButton =
    parseInt(quantity, 10) + parseInt(lineItemQuantity, 10);
  return availableForSale ? (
    <CTABlock>
      <span className="price">{price}</span>
      <QuantityButton
        selectedProduct={selectedProduct}
        labelTitle={'Quantity: '}
        quantity={quantityButtonAmount}
        shouldAddQuantities={true}
        onChangeFunction={updateQuantityButton}
        maxQuantity={totalInventory}
      />
      <BuyButton
        selectedProduct={selectedProduct}
        quantity={quantity}
        doesItemExist={doesItemExist}
        quantityAllowed={quantityAllowed}
        maxQuantity={totalInventory}
        lineItemPlusQuantityButton={lineItemPlusQuantityButton}
      />
    </CTABlock>
  ) : (
    <CTABlock>
      <span className="price">{price}</span>
      <div className="soldOutWarning">
        {' '}
        <span>SOLD OUT</span>{' '}
      </div>
    </CTABlock>
  );
};

// begin component
const ProductDetails = ({
  selectedProduct,
  lineItems,
  selectedProduct: { title, descriptionHtml, metafield },
  doesItemExist,
  quantityButtonAmount,
  updateQuantityButton,
}) => {
  const getLineItemQuantity = () => {
    if (lineItems.length > 0) {
      return lineItems
        .filter((lineItem) => lineItem.handle === selectedProduct.handle)
        .reduce((total, lineItem) => lineItem.quantity, 0);
    } else {
      return 0;
    }
  };

  const lineItemQuantity = getLineItemQuantity();

  // begin component's return
  return (
    <ProductDetailsWrapper>
      <StyledH1>{title}</StyledH1>
      {/* below HTML is for "about" section */}
      <ShopifyHTML
        dangerouslySetInnerHTML={{
          __html: metafield?.value || '',
        }}
      />
      {/* CTA block is conditionally rendered depending on availableForSale */}
      {createCTABlock(
        selectedProduct,
        doesItemExist,
        updateQuantityButton,
        quantityButtonAmount,
        lineItemQuantity
      )}
      {/* below HTML is for Characteristics, Uses, and Common-Sense Caution */}
      <ShopifyHTML
        dangerouslySetInnerHTML={{
          __html: descriptionHtml || '',
        }}
      />
    </ProductDetailsWrapper>
  );
};

ProductDetails.propTypes = {
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.bool,
  quantityButtonAmount: PropTypes.number,
  updateQuantityButton: PropTypes.func,
};

const mapStateToProps = ({
  quantityButtonAmount,
  checkout: { lineItems },
}) => ({
  quantityButtonAmount,
  lineItems,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuantityButton: (quantity) =>
    dispatch(CartActionCreators.updateQuantityButton(quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
