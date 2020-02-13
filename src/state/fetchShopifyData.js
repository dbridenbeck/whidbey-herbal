import { fetchPending, fetchSuccess, fetchError } from './actions/cart';
import { client } from "../plugins/shopify.js";

// FETCH "featured-products" COLLECTION

  // create variable to use sortKey
  const sortKey = client.graphQLClient.variable(
    "sortKey",
    "ProductCollectionSortKeys"
  );
  
  // query to get collection with handle === "featured-products"
  export const queryFeaturedProductsCollection = client.graphQLClient.query([sortKey], root => {
    root.add(
      "collectionByHandle",
      { args: { handle: "featured-products" } },
      collection => {
        collection.add("id");
        collection.addConnection(
          "products",
          { args: { sortKey: sortKey, first: 5} },
          product => {
            product.add("title");
            product.add("descriptionHtml");
            product.add("handle");
            product.add("availableForSale");
            product.addConnection(
              "collections",
              { args: { first: 2 } },
              collection => {
                collection.add("handle");
              }
            );
            product.addConnection(
              "metafields",
              { args: { first: 2 } },
              metafield => {
                metafield.add("key");
                metafield.add("value");
              }
            );
            product.addConnection("images", { args: { first: 10 } }, image => {
              image.add("id");
              image.add("src");
              image.add("altText");
            });
            product.addConnection(
              "variants",
              { args: { first: 1 } },
              variant => {
                variant.add("id");
                variant.add("price");
              }
            );
          }
        );
      }
    );
  });

// create query for shopify articles, used in getArticles
const articlesQuery = client.graphQLClient.query(root => {
    root.addConnection("articles", { args: { first: 20 } }, article => {
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
             .then(({ model, data }) => {
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

// Build a custom products query using the unoptimized version of the SDK
const productsQuery = client.graphQLClient.query((root) => {
  root.addConnection('products', {args: {first: 20}}, (product) => {
    product.add('title');
    product.add('descriptionHtml');
    product.add('handle');
    product.add('availableForSale');
    product.addConnection("collections", {args: {first: 2}}, collection => {
      collection.add("handle");
    });
    product.addConnection("metafields", {args: {first: 2}}, metafield => {
      metafield.add("key")
      metafield.add("value");
    });
    product.addConnection("images", {args: {first: 10}}, image => {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    product.addConnection('variants', {args: {first: 1}}, variant => {
      variant.add('id');
      variant.add('price');
    });
  });
});

export const fetchShopifyProductsAction = () => {
  return dispatch => {
    dispatch(fetchPending());
    // Call the send method with the custom products query
    client.graphQLClient
      .send(productsQuery)
      .then(({ model, data }) => {
        const products = data.products.edges.map(
          product => product.node
        );
        // add products from shopify to redux
          dispatch(fetchSuccess("products", products));
        return products;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};