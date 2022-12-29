import { gql } from '@apollo/client';

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              src
            }
            price {
              amount
            }
          }
          quantity
        }
      }
    }
  }
`;

const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    title
    products(first: 5) {
      edges {
        node {
          id
          title
          availableForSale
          handle
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
          images(first: 6) {
            edges {
              node {
                url(transform: { maxWidth: 400, maxHeight: 450 })
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkoutUserErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const CHECKOUT_LINEITEMS_ADD = gql`
  mutation checkoutLineItemsAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const GET_FEATURED_PRODUCTS_AND_ARTICLES = gql`
  query GetProductsAndArticles {
    collections(
      query: "title:'Wholesale Products' OR title:'Featured Products'"
      first: 2
    ) {
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
    articles(first: 20) {
      edges {
        node {
          title
          contentHtml
          excerpt
          handle
          image {
            url(transform: { maxWidth: 750, maxHeight: 750 })
            altText
          }
        }
      }
    }
  }
  ${CollectionFragment}
`;

export const GET_CHECKOUT = gql`
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        completedAt
        id
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query getArticles {
    articles(first: 20) {
      edges {
        node {
          title
          contentHtml
          excerpt
          handle
          image {
            url(transform: { maxWidth: 750, maxHeight: 750 })
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($productHandle: String!) {
    product(handle: $productHandle) {
      title
      handle
      availableForSale
      totalInventory
      descriptionHtml
      metafield(namespace: "about", key: "about") {
        value
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 6) {
        edges {
          node {
            altText
            url(transform: { maxWidth: 400, maxHeight: 450 })
          }
        }
      }
    }
    collections(
      query: "title:'Wholesale Products' OR title:'Featured Products'"
      first: 2
    ) {
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${CollectionFragment}
`;

export const GET_SHOP_PRODUCTS = gql`
  query getShopProducts($collectionName: String!) {
    collections(query: $collectionName, first: 2) {
      edges {
        node {
          title
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                availableForSale
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                      }
                    }
                  }
                }
                images(first: 6) {
                  edges {
                    node {
                      altText
                      url(transform: { maxWidth: 400, maxHeight: 450 })
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  {
    collections(
      query: "title:'Wholesale Products' OR title:'Featured Products'"
      first: 2
    ) {
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${CollectionFragment}
`;
