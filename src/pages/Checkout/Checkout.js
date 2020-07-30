import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { checkoutLineItemsAdd, createCheckout } from "../../queries/checkout";
import PageWrapper from "../../SharedComponents/PageWrapper";
import StyledH1 from "../../SharedComponents/StyledH1";
import { device } from "../../utils/devices";
import { createCurrencyFormat } from "../../utils/createCurrencyFormat";
import { client } from "../../plugins/shopify.js";
import * as CartActionCreators from "../../state/actions/cart";
import LineItems from "./LineItems";
import LineItemHeaders from "./LineItemHeaders";
import SubtotalSection from "./SubtotalSection";
import FeaturedProducts from "../../SharedComponents/FeaturedProducts";
import Footer from "../../SharedComponents/Footer";

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
`;

const RemoveWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  width: 8.37%;
  button {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    padding: 0;
    height: 30px;
    width: 100%;
    max-width: 30px;
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

const Checkout = ({ lineItems, removeLineItem, storeCheckoutDetails }) => {
  const [createNewCheckout] = useMutation(createCheckout);

  const [addCheckoutItems] = useMutation(checkoutLineItemsAdd);

  const [checkoutButtonText, changeCheckoutButtonText] = useState(
    "Proceed to Checkout"
  );
  const [loadingCheckout, setLoadingCheckoutTrue] = useState(false);

  const createRemoveButton = (id, index) => {
    const remove = () => removeLineItem(id, index);
    return (
      <RemoveWrapper>
        <button className="remove" onClick={remove}>
          x
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
    changeCheckoutButtonText("Loading Checkout");
    let i = 0;
    // setInterval(() => {
    //   const text = loadingCheckoutTextProgress[i];
    //   changeCheckoutButtonText(text);
    //   i++;
    //   return i === 4 ? (i = 0) : null;
    // }, 250);
  };

  const goToCheckout = (lineItemsToAdd) => async () => {
    showCheckoutLoading();
    setLoadingCheckoutTrue(true);
    try {
      // const checkout = await client.checkout.create();
      createNewCheckout({
        variables: { input: {} },
      })
        .then((response) => {
          const {
            data: {
              checkoutCreate: {
                checkout: { id, webUrl },
              },
            },
          } = response;
          storeCheckoutDetails(id);
          return addCheckoutItems({
            variables: { checkoutId: id, lineItems: lineItemsToAdd },
          });
        })
        .then((response) => {
          window.location.assign(response.data.checkoutLineItemsAdd.checkout.webUrl)
        });
    } catch (error) {
      console.log("Error creating checkout: ", error);
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
        <FeaturedProducts title={"Continue Shopping"} />
      </CheckoutContainer>
    ) : (
      <CheckoutContainer>
        <StyledH2>Your Shopping Cart is empty.</StyledH2>
        <FeaturedProducts title={"Explore the Shop"} />
      </CheckoutContainer>
    );
  };

  return (
    <PageWrapper>
      <StyledH1>Checkout</StyledH1>
      {createCheckoutContainer()}
      <Footer />
    </PageWrapper>
  );
};

Checkout.propTypes = {
  lineItems: PropTypes.array,
  checkoutId: PropTypes.string,
  removeLineItem: PropTypes.func,
  updateItemQuantity: PropTypes.func,
};

const mapStateToProps = ({ checkout: { lineItems, checkoutId, webUrl } }) => ({
  lineItems,
  checkoutId,
  webUrl,
});

const mapDispatchToProps = (dispatch) => ({
  removeLineItem: (id, index) =>
    dispatch(CartActionCreators.removeLineItem(id, index)),
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(
      CartActionCreators.updateItemQuantity(
        quantityToUpdate,
        shouldAddQuantities,
        product
      )
    ),
  storeCheckoutDetails: (id) =>
    dispatch(CartActionCreators.storeCheckoutDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
