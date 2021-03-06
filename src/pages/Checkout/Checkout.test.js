import React from "react";
import { fireEvent, render } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Checkout from "./Checkout";
import {
  getFeaturedProductsMock,
  createCheckoutMock,
  addLineItemsMock,
  createCheckoutMutationCalled,
  addLineItemsMutationCalled
} from "./checkoutMocks";

const history = createBrowserHistory();

const mocks = [getFeaturedProductsMock, createCheckoutMock, addLineItemsMock];

Object.defineProperty(window.location, 'assign', {
  configurable: true,
});
window.location.assign = jest.fn();


describe("Checkout View", () => {
  let view = null;

  beforeEach(async () => {
    view = await render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <Checkout />
        </Router>
      </MockedProvider>,
      {
        initialState: {
          checkout: {
            lineItems: [
              {
                title: "Western Red Cedar Essential Oil",
                handle: "cedar-oil",
                totalInventory: 3,
                variants: {
                  edges: [
                    {
                      node: {
                        id:
                          "1234variantitem",
                        priceV2: {
                          amount: "20.0",
                          currencyCode: "USD",
                        },
                      },
                    },
                  ],
                },
                images: {
                  edges: [
                    {
                      node: {
                        transformedSrc:
                          "https://cdn.shopify.com/s/files/1/2550/5490/products/Cedar_Front_-_3000_X_3000_400x450.jpg?v=1573183882",
                      },
                    },
                  ],
                },
                quantity: 1,
              },
            ],
          },
        },
      }
    );
  });

  it("should render without errors", async () => {
    const title = await view.findByText("Checkout");

    expect(title).toBeInTheDocument();
  });

  it("Can increase line item quantity", async () => {
    const input = await view.findByDisplayValue("1");
    fireEvent.change(input, { target: { value: 2 } });

    expect(input.value).toBe("2");
  });

  it("When all items removed from cart, empty cart message appears", async () => {
    const removeIcon = await view.findByText("x");
    const lineItem = await view.findByText("Western Red Cedar Essential Oil");
    await fireEvent.click(removeIcon);
    const noItemsMessage = await view.findByText(
      "Your Shopping Cart is empty."
    );

    expect(noItemsMessage).toBeInTheDocument();
  });

  it("Cannot exceed maxQuantity for an item", async () => {
    const input = await view.findByDisplayValue("1");
    fireEvent.change(input, { target: { value: 200 } });

    expect(input.value).toBe("3");
  });

  it("Subtotal increases as line items are added", async () => {
    const input = await view.findByDisplayValue("1");
    fireEvent.change(input, { target: { value: 2 } });

    // below is a workaround because I was unable to text match "Subtotal: $40.00"
    // because "Subtotal:" is wrapped by a <strong> tag
    const subtotal = await view.findAllByText("$40.00");

    // So, we just check to make sure that the lineItem's subtotal AND the checkout Subtotal equal $40.00
    expect(subtotal.length).toBe(2);
  });

  it("Proceeds to Shopify checkout with correct items", async () => {
    const checkoutButton = await view.findByText("Proceed to Checkout");

    fireEvent.click(checkoutButton);
    await new Promise(resolve => setTimeout(resolve, 50)); // wait for response

    expect(createCheckoutMutationCalled).toBe(true);
    expect(addLineItemsMutationCalled).toBe(true);
    expect(window.location.assign).toHaveBeenCalledWith("https://mock-shopify-checkout.com")
  });
});
