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

export const fetchPending = () => ({
  type: CartActionTypes.FETCH_PENDING
});

export const fetchSuccess = (dataType, data) => ({
  type: CartActionTypes.FETCH_SUCCESS,
  data,
  dataType,
});

export const fetchError = error => ({
  type: CartActionTypes.FETCH_ERROR,
  error: error
});

export const toggleBurger = () => ({
  type: CartActionTypes.TOGGLE_BURGER
});

export const clearBurger = () => ({
  type: CartActionTypes.CLEAR_BURGER
});