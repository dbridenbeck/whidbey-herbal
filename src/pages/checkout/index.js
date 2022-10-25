import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { CHECKOUT_LINEITEMS_ADD, CREATE_CHECKOUT } from '../../queries';
import PageWrapper from '../../SharedComponents/PageWrapper';
import StyledH1 from '../../SharedComponents/StyledH1';
import { device } from '../../utils/devices';
import { createCurrencyFormat } from '../../utils/createCurrencyFormat';
import * as CartActionCreators from '../../state/actions/cart';
import LineItems from '../../components/Checkout/LineItems';
import LineItemHeaders from '../../components/Checkout/LineItemHeaders';
import SubtotalSection from '../../components/Checkout/SubtotalSection';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import { GET_FEATURED_PRODUCTS } from '../../queries';
import apolloClient from '../../apolloClient';

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
`;

const RemoveWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  width: 16.7%;
  button {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    max-width: 30px;
    height: 30px;
    font-size: 1rem;
    color: #e34267;
    border: 1px solid #787878;
    border-radius: 50%;
    background: none;
    :focus {
      outline-width: 0;
    }
    :hover {
      background: #e34267;
      color: white;
      border: 1px solid #e34267;
    }
    @media ${device.tablet} {
      height: 35px;
      max-width: 35px;
    }
  }
`;

const CheckoutButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  min-width: 222px;
  margin: 20px 0;
  padding: 0 11%;
  font-size: 1.125em;
  text-align: left;
  border: 1px solid #e3be42;
  color: ${(props) => (props.loadingCheckout ? `#787878` : `#E3BE42`)};
  background-color: white;
  border-radius: 10px;
  :focus {
    outline-width: 0;
  }
  :hover {
    color: ${(props) => (props.loadingCheckout ? `#787878` : `white`)};
    background-color: ${(props) =>
      props.loadingCheckout ? `white` : `#E3BE42`};
  }
`;

const StyledH2 = styled.h2`
  color: #787878;
  font-weight: normal;
`;

const Checkout = ({
  lineItems,
  removeLineItem,
  storeCheckoutDetails,
  products,
}) => {
  const [createNewCheckout] = useMutation(CREATE_CHECKOUT);

  const [addCheckoutItems] = useMutation(CHECKOUT_LINEITEMS_ADD);

  const [checkoutButtonText, changeCheckoutButtonText] = useState(
    'Proceed to Checkout'
  );
  const [loadingCheckout, setLoadingCheckoutTrue] = useState(false);

  const createRemoveButton = (id, index) => {
    const remove = () => {
      removeLineItem(id, index);
    };
    return (
      <RemoveWrapper>
        <button className="remove" onClick={remove}>
          <span>x</span>
        </button>
      </RemoveWrapper>
    );
  };

  const showCheckoutLoading = () => {
    const loadingCheckoutTextProgress = [
      `Loading Checkout`,
      `Loading Checkout.  `,
      `Loading Checkout.. `,
      `Loading Checkout...`,
    ];
    changeCheckoutButtonText('Loading Checkout');
    let i = 0;
    setInterval(() => {
      const text = loadingCheckoutTextProgress[i];
      changeCheckoutButtonText(text);
      i++;
      return i === 4 ? (i = 0) : null;
    }, 250);
  };

  const goToCheckout = (lineItemsToAdd) => async () => {
    showCheckoutLoading();
    setLoadingCheckoutTrue(true);
    try {
      const checkoutResponse = await createNewCheckout({
        variables: { input: {} },
      });

      const {
        data: {
          checkoutCreate: {
            checkout: { id: checkoutId },
          },
        },
      } = checkoutResponse;

      const checkoutItemsResponse = await addCheckoutItems({
        variables: { checkoutId, lineItems: lineItemsToAdd },
      });

      storeCheckoutDetails(checkoutId);
      window.location.assign(
        checkoutItemsResponse.data.checkoutLineItemsAdd.checkout.webUrl
      );
    } catch (error) {
      console.log('Error creating checkout: ', error);
    }
  };

  const createCheckoutButton = () => {
    const createLineItemObject = (item) => ({
      variantId: item.variants.edges[0].node.id,
      quantity: item.quantity,
    });
    const lineItemsToAdd = lineItems.map(createLineItemObject);
    const checkout = goToCheckout(lineItemsToAdd);

    return (
      <CheckoutButton loadingCheckout={loadingCheckout} onClick={checkout}>
        {checkoutButtonText}
      </CheckoutButton>
    );
  };

  const createCheckoutContainer = () => {
    const hasItems = lineItems.length && lineItems.length > 0;
    const roughCalculatedCartSubtotal = lineItems
      .map(
        (lineItem) =>
          lineItem.quantity * lineItem.variants.edges[0].node.priceV2.amount
      )
      .filter(Boolean)
      .reduce(
        (cartSubtotal, currentItemSubtotal) =>
          currentItemSubtotal + cartSubtotal,
        0
      )
      .toFixed(2);
    const currencyCalculatedCartSubtotal = createCurrencyFormat(
      roughCalculatedCartSubtotal
    );

    return hasItems ? (
      <CheckoutContainer>
        <LineItemHeaders />
        <LineItems items={lineItems} createRemoveButton={createRemoveButton} />
        <SubtotalSection
          calculatedCartSubtotal={currencyCalculatedCartSubtotal}
          createCheckoutButton={createCheckoutButton}
        />
        <FeaturedProducts
          title={'Continue Shopping'}
          products={products}
          bottomPadding
        />
      </CheckoutContainer>
    ) : (
      <CheckoutContainer>
        <StyledH2>Your Shopping Cart is empty.</StyledH2>
        <FeaturedProducts
          title={'Explore the Shop'}
          products={products}
          bottomPadding
        />
      </CheckoutContainer>
    );
  };

  return (
    <PageWrapper>
      <StyledH1>Checkout</StyledH1>
      {createCheckoutContainer()}
    </PageWrapper>
  );
};

Checkout.propTypes = {
  lineItems: PropTypes.array,
  removeLineItem: PropTypes.func,
  storeCheckoutDetails: PropTypes.func,
  products: PropTypes.array,
};

const mapStateToProps = ({ checkout: { lineItems } }) => ({
  lineItems,
});

const mapDispatchToProps = (dispatch) => ({
  removeLineItem: (id, index) =>
    dispatch(CartActionCreators.removeLineItem(id, index)),
  storeCheckoutDetails: (id) =>
    dispatch(CartActionCreators.storeCheckoutDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_FEATURED_PRODUCTS,
  });
  return {
    // TODO, handle error from apollo query
    props: {
      products: data?.collections?.edges,
    },
  };
}

GET_FEATURED_PRODUCTS;
