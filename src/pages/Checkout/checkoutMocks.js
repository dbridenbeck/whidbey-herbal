import {
  GET_FEATURED_PRODUCTS,
  CREATE_CHECKOUT,
  CHECKOUT_LINEITEMS_ADD,
} from "../../queries";

export let createCheckoutMutationCalled = false;
export let addLineItemsMutationCalled = false;
const checkoutLineItemsMock = {
  checkoutId: "abcd1234=",
  lineItems: [
    {
      quantity: 1,
      variantId: "1234variantitem",
    },
  ],
};

export const getFeaturedProductsMock = {
  request: {
    query: GET_FEATURED_PRODUCTS,
  },
  result: {
    data: {
      collections: {
        edges: [
          {
            __typename: "CollectionEdge",
            node: {
              title: "Featured Products",
              products: {
                edges: [
                  {
                    node: {
                      availableForSale: true,
                      handle: "cedar-oil",
                      id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDQ2NDkwOTcyNTg=",
                      images: {
                        edges: [
                          {
                            node: {
                              altText: null,
                              transformedSrc:
                                "https://cdn.shopify.com/s/files/1/2550/5490/products/Lavender_Front-_3000_X_3000_400x450.jpg?v=1573183646",
                              __typename: "Image",
                            },
                            __typename: "ImageEdge",
                          },
                        ],
                        __typename: "ImageConnection",
                      },
                      title: "Western Red Cedar Essential Oil",
                      variants: {
                        edges: [
                          {
                            node: {
                              price: "20.00",
                              __typename: "ProductVariant",
                            },
                            __typename: "ProductVariantEdge",
                          },
                        ],
                        __typename: "ProductVariantConnection",
                      },
                      __typename: "Product",
                    },
                    __typename: "ProductEdge",
                  },
                ],
                __typename: "ProductConnection",
              },
              __typename: "Collection",
            },
          },
        ],
      },
      __typename: "CollectionConnection",
    },
  },
};

export const createCheckoutMock = {
  request: {
    query: CREATE_CHECKOUT,
    variables: { input: {} },
  },
  result: () => {
    createCheckoutMutationCalled = true;
    return {
      data: {
        checkoutCreate: {
          checkout: {
            __typename: "Checkout",
            comlpetedAt: null,
            id: "abcd1234=",
            lineItems: {
              edges: [],
              __typename: "CheckoutLineItemConnection",
            },
            subtotalPrice: "0.00",
            totalPrice: "0.00",
            totalTax: "0.00",
            webUrl:
              "https://whidbey-herbal.myshopify.com/25505490/checkouts/4f939f4b893aa152ca46211fb611e8bb?key=d8228a5982c045b715daa3a87f34007f",
          },
        },
      },
    };
  },
};

// something is wrong with this mock! ack figure it out and double check the dang thing
export const addLineItemsMock = {
  request: {
    query: CHECKOUT_LINEITEMS_ADD,
    variables: checkoutLineItemsMock,
  },
  result: () => {
    addLineItemsMutationCalled = true;
    return {
      data: {
        checkoutLineItemsAdd: {
          checkout: {
            __typename: "Checkout",
            id: "abcd1234=",
            lineItems: {
              edges: [
                {
                  __typename: "CheckoutLineItemEdge",
                  node: {
                    __typename: "CheckoutLineItem",
                    id:
                      "1234lineitem",
                    quantity: 1,
                    title: "Western Red Cedar Essential Oil",
                    variant: {
                      __typename: "ProductVariant",
                      id:
                        "1234variantitem",
                      image: {
                        __typename: "Image",
                        src:
                          "https://cdn.shopify.com/s/files/1/2550/5490/products/Lavender_Front-_3000_X_3000_400x450.jpg?v=1573183646",
                      },
                      price: "20.00",
                      title: "Default Title",
                    },
                  },
                },
              ],
              __typename: "CheckoutLineItemConnection",
            },
            subtotalPrice: "20.00",
            totalPrice: "20.00",
            totalTax: "0.00",
            webUrl:
              "https://mock-shopify-checkout.com",
          },
        },
      },
    };
  },
};
