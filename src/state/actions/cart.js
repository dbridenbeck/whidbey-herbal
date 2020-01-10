import * as CartActionTypes from '../actiontypes/cart';

export const addLineItem = (product, quantity) => ({
  type: CartActionTypes.ADD_LINE_ITEM,
  product,
  quantity,
});

export const removeLineItem = (productId, index) => ({
  type: CartActionTypes.REMOVE_LINE_ITEM,
  productId,
  index,
});

export const updateItemQuantity = (product, quantityToUpdate) => ({
  type: CartActionTypes.UPDATE_ITEM_QUANTITY,
  product,
  quantityToUpdate,
});

export const updateCheckoutId = (id) => ({
  type: CartActionTypes.UPDATE_CHECKOUT_ID,
  id,
});

export const clearCheckoutInState = () => ({
  type: CartActionTypes.CLEAR_CHECKOUT_IN_STATE
});

export const fetchProductsPending = () => ({
  type: CartActionTypes.FETCH_PRODUCTS_PENDING
});

export const fetchProductsSuccess = products => ({
  type: CartActionTypes.FETCH_PRODUCTS_SUCCESS,
  products: products
});

export const fetchProductsError = error => ({
  type: CartActionTypes.FETCH_PRODUCTS_ERROR,
  error: error
});

export const toggleBurger = () => ({
  type: CartActionTypes.TOGGLE_BURGER
});

export const clearBurger = () => ({
  type: CartActionTypes.CLEAR_BURGER
});