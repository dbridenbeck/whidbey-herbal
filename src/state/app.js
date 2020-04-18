import * as CartActionTypes from "./actiontypes/cart";

export const initialState = {
  checkout: { 
    lineItems: [],
    checkoutId: '',
  },
  onlineStore: [],
  featuredProducts: [],
  articles: [],
  pending: true,
  error: null,
  lastShopifyFetchTimestamp: 0,
  burgerToggled: false,
  burgerClickedOnce: false,
  heroImgSrc: "",
  heroImgId: "",
  quantityButtonAmount: 1,
  googleMapInfoWindow: {
    selectedStoreName: '',
  }
};

export const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_LINE_ITEM:
      return {
        ...state,
        quantityButtonAmount: 1,
        checkout: {
          ...state.checkout,
          // need to put an ternary in here to either add new line item or update existing line item's quantity
          lineItems: [
            ...state.checkout.lineItems,
            {
              ...action.product,
              quantity: parseInt(action.quantity)
            }
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
        quantityButtonAmount: 1,
        checkout: {
          ...state.checkout,
          lineItems: state.checkout.lineItems.map(lineItem => {
            if (lineItem.id === action.product.id) {
              return {
                ...action.product,
                quantity: action.shouldAddQuantities
                  ? parseFloat(action.quantityToUpdate, 2) +
                    parseFloat(lineItem.quantity, 2)
                  : parseFloat(action.quantityToUpdate, 2)
              };
            } else {
              return lineItem;
            }
          })
        }
      };
    case CartActionTypes.UPDATE_CHECKOUT_ID:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          checkoutId: action.id
        }
      };
    case CartActionTypes.CLEAR_CHECKOUT_IN_STATE:
      return {
        ...state,
        checkout: {
          lineItems: [],
          checkoutId: ""
        }
      };

    case CartActionTypes.FETCH_PENDING:
      return {
        ...state,
        pending: true
      };
    case CartActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        [action.dataType]: action.data
      };
    case CartActionTypes.FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CartActionTypes.TOGGLE_BURGER:
      return {
        ...state,
        burgerToggled: !state.burgerToggled,
        burgerClickedOnce: true
      };
    case CartActionTypes.CLEAR_BURGER:
      return {
        ...state,
        burgerClickedOnce: false,
        burgerToggled: false
      };
    case CartActionTypes.HANDLE_HERO_IMG:
      return {
        ...state,
        heroImgSrc: action.imageSrc,
        heroImgId: action.imageId
      };
    case CartActionTypes.CLEAR_HERO_IMG:
      return {
        ...state,
        heroImgSrc: "",
        heroImgId: ""
      };
    case CartActionTypes.UPDATE_QUANTITY_BUTTON:
      return {
        ...state,
        quantityButtonAmount: parseInt(action.quantity)
      };
    case CartActionTypes.SET_GOOGLE_MAP_INFO_WINDOW:
      return {
        ...state,
        googleMapInfoWindow: {
          selectedStoreName: action.selectedStoreName
        }
      };
    case CartActionTypes.UPDATE_SHOPIFY_FETCH_TIMESTAMP:
      return {
        ...state,
        lastShopifyFetchTimestamp: action.timestamp
      };
    default:
      return state;
  }
};
