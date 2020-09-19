import React from "react";
import { createStore } from "redux";
import { fireEvent, render, screen, wait, act } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Product from "./Product";
import { GET_PRODUCT, GET_FEATURED_PRODUCTS } from "../../queries";

const history = createBrowserHistory();
const mockHistory = { push: jest.fn() };

const mocks = [
  {
    request: {
      query: GET_PRODUCT,
      variables: {
        productHandle: "cedar-oil",
      },
    },
    result: {
      data: {
        productByHandle: {
          __typename: "Product",
          title: "Western Red Cedar Essential Oil",
          handle: "cedar-oil",
          availableForSale: true,
          totalInventory: 9,
          descriptionHtml:
            "<h3>Characteristics</h3>↵<p>Cedar oil is characterized </h3>",
          metafield: {
            value: "Cedar is our best selling oil. ",
            __typename: "Metafield",
          },
          variants: {
            __typename: "ProductVariantConnection",
            edges: [
              {
                __typename: "ProductVariantEdge",
                node: {
                  __typename: "ProductVariant",
                  id:
                    "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzk1ODcyMjUxOTA4Mg==",
                  priceV2: {
                    amount: "20.0",
                    currencyCode: "USD",
                    __typename: "MoneyV2",
                  },
                },
              },
            ],
          },
          images: {
            __typename: "ImageConnection",
            edges: [
              {
                node: {
                  altText: null,
                  transformedSrc: "https://productWebsite.com/image.jpg",
                  __typename: "Image",
                },
                __typename: "ImageEdge",
              },
            ],
            __typename: "ImageConnection",
          },
        },
      },
    },
  },
  {
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
  },
];

describe("Product View", () => {
  let view = null;

  beforeEach(async () => {});

  it("should render without errors", async () => {
    await act(async () => {
      view = await render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router basename={process.env.PUBLIC_URL} history={history}>
            <Product match={{ params: { handle: "cedar-oil" } }} />
          </Router>
        </MockedProvider>
      );
    });
    await view.findByText("Western Red Cedar Essential Oil");
  });
});
