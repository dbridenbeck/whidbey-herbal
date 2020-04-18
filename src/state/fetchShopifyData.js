import {
  fetchPending,
  fetchSuccess,
  fetchError,
  updateShopifyFetchTimestamp
} from "./actions/cart";
import { client } from "../plugins/shopify.js";

// Below are three sections: articles, products, and collections
// In each section there are three peices: a query, the method to fetch data on initial load, 
// and the method to update data if it is different than what's in redux

// ARTICLES SECTION
const articlesQuery = client.graphQLClient.query(root => {
  root.addConnection("articles", { args: { first: 20 } }, article => {
    article.add("title");
    article.add("tags");
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

// GET articles on initial page load
export const fetchShopifyArticlesAction = () => {
  return dispatch => {
    dispatch(fetchPending());
    client.graphQLClient
      .send(articlesQuery)
      .then(({ model, data }) => {
        const articles = data.articles.edges;
        // add articles from shopify to redux
        dispatch(fetchSuccess("articles", articles));
        // set timestamp in redux to show shopify data was fetched
        dispatch(updateShopifyFetchTimestamp());
        return articles;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

// UPDATE articles
export const updateShopifyArticlesAction = (articlesFromRedux) => {
  return dispatch => {
    dispatch(fetchPending());
    client.graphQLClient
      .send(articlesQuery)
      .then(({ model, data }) => {
        const articles = data.articles.edges;
        return articlesFromRedux === articles
          ? null
          : dispatch(fetchSuccess("articles", articles));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

// PRODUCTS SECTION
const productsQuery = client.graphQLClient.query(root => {
  root.addConnection("products", { args: { first: 20 } }, product => {
    product.add("title");
    product.add("descriptionHtml");
    product.add("handle");
    product.add("availableForSale");
    product.addConnection("metafields", { args: { first: 2 } }, metafield => {
      metafield.add("key");
      metafield.add("value");
    });
    product.addConnection("images", { args: { first: 10 } }, image => {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    product.addConnection("variants", { args: { first: 1 } }, variant => {
      variant.add("id");
      variant.add("price");
    });
  });
});

// GET products on initial page load
export const fetchShopifyProductsAction = () => {
  return dispatch => {
    dispatch(fetchPending());
    // Call the send method with the custom products query
    client.graphQLClient
      .send(productsQuery)
      .then(({ model, data }) => {
        const products = data.products.edges.map(product => product.node);
        // add products from shopify to redux
        dispatch(fetchSuccess("products", products));
        // set timestamp in redux to show shopify data was fetched
        dispatch(updateShopifyFetchTimestamp());
        return products;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

// UPDATE products
export const updateShopifyProductsAction = productsFromRedux => {
  return dispatch => {
    dispatch(fetchPending());
    // Call the send method with the custom products query
    client.graphQLClient
      .send(productsQuery)
      .then(({ model, data }) => {
        const products = data.products.edges.map(product => product.node);
        // check to see if products in redux is the same as products from shopify
        // if not, add the products to redux
        return productsFromRedux === products
          ? null
          : dispatch(fetchSuccess("products", products));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
};

// "featured-products" COLLECTION SECTION
// create variable to use sortKey
const sortKey = client.graphQLClient.variable(
  "sortKey",
  "ProductCollectionSortKeys"
);


export const queryCollection = (collectionHandle, numOfItems) => client.graphQLClient.query(
  [sortKey],
  root => {
    root.add(
      "collectionByHandle",
      { args: { handle: `${collectionHandle}` } },
      collection => {
        collection.add("id");
        collection.addConnection(
          "products",
          { args: { sortKey: sortKey, first: numOfItems } },
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
  }
);

// !!!!!!!!!
// make both of these "handle" functions extensible by adding collectionHandle to params, 
// then use conditional to use different dispatch based on if collectionHandle is "featured-products" or "wholesale-products"
export const handleDispatchingProducts = (reduxKey, products, dispatch) => {
  console.log(products);
    // add products from collection to redux
    dispatch(fetchSuccess(reduxKey, products));
    // set timestamp in redux to show shopify data was fetched
    dispatch(updateShopifyFetchTimestamp());
};

export const handleUpdatingProducts = (reduxKey, products, dispatch, featuredProductsFromRedux) => {
  // check to see if featuredProducts in redux is the same as products from shopify
  // if not, add the featuredProducts to redux
  return featuredProductsFromRedux === products
    ? null
    : dispatch(fetchSuccess(reduxKey, products));
};

// GET Featured-Products collection on initial page load
export const fetchProductCollectionAction = (collectionHandle, numOfItems, handleReduxDispatch, collectionFromRedux) => {
  return dispatch => {
    dispatch(fetchPending()); 
    client.graphQLClient
      .send(queryCollection(collectionHandle, numOfItems))
      .then(({ model, data }) => {
        // get product nodes
        const products = data.collectionByHandle.products.edges.map(product => product.node);
        // take collectionHandle and format it as "featuredProducts" instead of something like "featured-products" for redux
        const splitHandle = collectionHandle.split("-");
        const reduxKey = splitHandle[0] + splitHandle[1][0].toUpperCase() + splitHandle[1].slice(1);

        handleReduxDispatch(reduxKey, products, dispatch, collectionFromRedux);
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
};

// UPDATE featured-products
// export const updateCollectionAction = (, collectionHandle, numOfItems, handleReduxUpdate) => {
//   return dispatch => {
//     dispatch(fetchPending());
//     // Call the send method with the custom products query
//     client.graphQLClient
//       .send(queryCollection(collectionHandle, numOfItems))
//       .then(({ model, data }) => {
//         handleReduxUpdate(data, dispatch, collectionFromRedux);
//       })
//       .catch(error => {
//         dispatch(fetchError(error));
//       });
//   };
// };

// UPDATE featured-products
// export const updateFeaturedProductsAction = featuredProductsFromRedux => {
//   return dispatch => {
//     dispatch(fetchPending());
//     // Call the send method with the custom products query
//     client.graphQLClient
//       .send(queryFeaturedProductsCollection)
//       .then(({ model, data }) => {
//         const featuredProducts = data.collectionByHandle.products.edges;
//         // check to see if featuredProducts in redux is the same as products from shopify
//         // if not, add the featuredProducts to redux
//         return featuredProductsFromRedux === featuredProducts
//           ? null
//           : dispatch(fetchSuccess("featuredProducts", featuredProducts));
//       })
//       .catch(error => {
//         dispatch(fetchError(error));
//       });
//   };
// };