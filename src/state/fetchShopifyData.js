import { fetchPending, fetchSuccess, fetchError } from './actions/cart';
import { client } from "../plugins/shopify.js";

// create query for shopify articles, used in getArticles
const articlesQuery = client.graphQLClient.query(root => {
    root.addConnection("articles", { args: { first: 4 } }, article => {
      article.add("title");
      article.add("handle");
      article.add("url");
      article.add("contentHtml");
      article.add("excerpt");
      article.addField("image", {}, image => {
        image.add("id");
        image.add("originalSrc");
      });
    });
  });

export const fetchShopifyArticlesAction = () => {
         return dispatch => {
           dispatch(fetchPending());
           client.graphQLClient
             .send(articlesQuery)
             .then(({ data }) => {
               const articles = data.articles.edges;
               // add articles from shopify to redux
               dispatch(fetchSuccess("articles", articles));
               return articles;
             })
             .catch(error => {
               dispatch(fetchError(error));
             });
         };
       };

export const fetchShopifyProductsAction = () => {
  return dispatch => {
    dispatch(fetchPending());
    client.product.fetchAll()
    .then(products => {
      // add products from shopify to redux
      dispatch(fetchSuccess("products", products));
      return products;
    })
    .catch(error => {
      dispatch(fetchError(error));
    });
  }
}