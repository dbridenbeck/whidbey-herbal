import * as CartActionTypes from "./actiontypes/cart";

export const initialState = {
  checkout: { 
    lineItems: [],
    checkoutId: '',
  },
  products: [],
  articles: [],
  pending: true,
  error: null,
  burgerToggled: false,
  burgerClickedOnce: false,
};

export const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_LINE_ITEM:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          lineItems: [
            ...state.checkout.lineItems, 
            {...action.product, quantity: 1}
          ]
        }
      };
    case CartActionTypes.REMOVE_LINE_ITEM:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          lineItems: state.checkout.lineItems.filter(
            (lineItem, index) => index !== action.index
          )
        }
      };
    case CartActionTypes.UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          lineItems: state.checkout.lineItems.map(lineItem => {
            if (lineItem.id === action.product.id) {
              return {
                ...action.product,
                quantity: lineItem.quantity + action.quantityToUpdate
              };
            } else {
              return lineItem;
            }
          }),
        }
      };
    case CartActionTypes.UPDATE_CHECKOUT_ID:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          checkoutId: action.id
        }
      }
    case CartActionTypes.CLEAR_CHECKOUT_IN_STATE:
      return {
        ...state,
        checkout: {
          lineItems: [],
          checkoutId: "",
        }
      };

      case CartActionTypes.FETCH_PENDING:
        return {
          ...state,
          pending: true
        }
      case CartActionTypes.FETCH_SUCCESS:
        return {
          ...state,
          pending: false,
          [action.dataType]: action.data
        }
      case CartActionTypes.FETCH_ERROR:
        return {
          ...state,
          pending: false,
          error: action.error
        }
      case CartActionTypes.TOGGLE_BURGER:
      return {
        ...state,
        burgerToggled: !state.burgerToggled,
        burgerClickedOnce: true
      }
    case CartActionTypes.CLEAR_BURGER:
      return {
        ...state,
        burgerClickedOnce: false,
        burgerToggled: false
      }
    default:
      return state;
  }
};
