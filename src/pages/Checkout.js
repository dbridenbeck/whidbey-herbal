import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from '../state/actions/cart';
import LineItems from '../components/LineItems';

export class Checkout extends Component {
  componentDidMount() {
    const { checkout, updateCheckoutId } = this.props;
     // create the checkout if it doesn't already exist
    if (!checkout.checkoutId) {
      client.checkout.create().then(checkout => {
        updateCheckoutId(checkout.id)
      });
    }
  }

  removeItem = (id, index) => {
    const { removeLineItem } = this.props;
    removeLineItem(id, index);
  }

  createRemoveButton = (id, index) => {
    const { removeLineItem } = this.props;
    const remove = () => removeLineItem(id, index);
    return (  
      <button
        className="remove"
        onClick={remove}
      >
        Remove
      </button>
    );
  }

  createUpdateItemButton = (product, quantityToUpdate, buttonText) => {
    const { updateItemQuantity } = this.props;
    const updateItem = () => updateItemQuantity(product, quantityToUpdate);
    return (  
      <button
        className="update"
        onClick={updateItem}
      >
        {buttonText}
      </button>
    );
  }
  
  createCheckoutButton = () => {
    const { checkout } = this.props;
    const checkoutId = checkout.checkoutId;
    const lineItemsToAdd = checkout.lineItems.map(
      item => (
        {
          variantId: item.variants[0].id,
          quantity: item.quantity
        }
      )
    );

    const goToShopifyCheckout = () => {
      console.log("checkout.lineItems is: ", checkout.lineItems);
      client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(checkout => {
          console.log("checkout is: ", checkout)
          window.location.href = checkout.webUrl
        })
    }
    
    return (
      <button className="checkout" onClick={(goToShopifyCheckout)}>
        Checkout!
      </button>
    );
  }

  render() {
    const { checkout, removeLineItem } = this.props;
    const hasItems = (checkout.lineItems.length && checkout.lineItems.length > 0);

    return (
      <div>
        {hasItems ? (
          <div>
            <LineItems
              checkout={checkout}
              createRemoveButton={this.createRemoveButton}
              createUpdateItemButton={this.createUpdateItemButton}
              removeLineItem={removeLineItem}
            />
            {this.createCheckoutButton()}
          </div>
        ) : (
          <p>No Items Homes </p>
        )}
      </div>
    );
  }
};

const mapStateToProps = ( Reducer1 ) => ({
  checkout: Reducer1.checkout
});

const mapDispatchToProps = dispatch => ({
  removeLineItem: (id, index) =>
    dispatch(CartActionCreators.removeLineItem(id, index)),
  updateCheckoutId: id => dispatch(CartActionCreators.updateCheckoutId(id)),
  updateItemQuantity: (product, quantityToUpdate) =>
    dispatch(CartActionCreators.updateItemQuantity(product, quantityToUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);