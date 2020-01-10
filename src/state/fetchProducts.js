import { fetchProductsPending, fetchProductsSuccess, fetchProductsError } from './actions/cart';
import { client } from "../plugins/shopify.js";

const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsPending());
    
    // add products from shopify to redux
    client.product.fetchAll()
    .then(products => {
      dispatch(fetchProductsSuccess(products));
      return products;
    })
    .catch(error => {
      dispatch(fetchProductsError(error));
    });
  }
}

export default fetchProducts;