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

export const updateItemQuantity = (
  quantityToUpdate,
  shouldAddQuantities,
  product
) => ({
  type: CartActionTypes.UPDATE_ITEM_QUANTITY,
  quantityToUpdate,
  shouldAddQuantities,
  product,
});

export const storeCheckoutDetails = (id) => ({
  type: CartActionTypes.STORE_CHECKOUT_DETAILS,
  id,
});

export const clearCheckoutInState = () => ({
  type: CartActionTypes.CLEAR_CHECKOUT_IN_STATE,
});

export const toggleBurger = () => ({
  type: CartActionTypes.TOGGLE_BURGER,
});

export const clearBurger = () => ({
  type: CartActionTypes.CLEAR_BURGER,
});

export const handleHeroImg = (imageSrc) => ({
  type: CartActionTypes.HANDLE_HERO_IMG,
  imageSrc,
});

export const clearHeroImg = () => ({
  type: CartActionTypes.CLEAR_HERO_IMG,
});

export const updateQuantityButton = (quantity) => ({
  type: CartActionTypes.UPDATE_QUANTITY_BUTTON,
  quantity,
});
