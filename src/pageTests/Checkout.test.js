import { fireEvent, render } from '../utils/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Checkout from '../pages/checkout/index';
import {
  getFeaturedProductsMock,
  createCheckoutMock,
  addLineItemsMock,
  createCheckoutMutationCalled,
  addLineItemsMutationCalled,
} from '../pages/checkout/checkoutMocks';
import { mockProducts } from './mockData';
import { act } from '@testing-library/react';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const history = createBrowserHistory();

const mocks = [getFeaturedProductsMock, createCheckoutMock, addLineItemsMock];

describe('Checkout View', () => {
  let view = null;

  const oldWindowLocation = window.location;

  // handle mocking window.location.assign with beforeAll
  beforeAll(() => {
    delete window.location;

    window.location = Object.defineProperties(
      {},
      {
        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
        assign: {
          configurable: true,
          value: jest.fn(),
        },
      }
    );
  });
  beforeEach(async () => {
    useRouter.mockImplementation(() => ({
      pathname: 'checkout',
    }));
    view = await render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router basename={'/'} history={history}>
          <Checkout products={mockProducts} />
        </Router>
      </MockedProvider>,
      {
        initialState: {
          checkout: {
            lineItems: [
              {
                title: 'Western Red Cedar Essential Oil',
                handle: 'cedar-oil',
                totalInventory: 3,
                variants: {
                  edges: [
                    {
                      node: {
                        id: '1234variantitem',
                        priceV2: {
                          amount: '20.0',
                          currencyCode: 'USD',
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
                          'https://cdn.shopify.com/s/files/1/2550/5490/products/Cedar_Front_-_3000_X_3000_400x450.jpg?v=1573183882',
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

  it('should render without errors', async () => {
    const title = await view.findByText('Checkout');

    expect(title).toBeInTheDocument();
  });

  it('Can increase line item quantity', async () => {
    const input = await view.findByDisplayValue('1');
    fireEvent.change(input, { target: { value: 2 } });

    expect(input.value).toBe('2');
  });

  it('When all items removed from cart, empty cart message appears', async () => {
    const removeIcon = await view.findByText('x');
    await fireEvent.click(removeIcon);
    const noItemsMessage = await view.findByText(
      'Your Shopping Cart is empty.'
    );

    expect(noItemsMessage).toBeInTheDocument();
  });

  it('Cannot exceed maxQuantity for an item', async () => {
    const input = await view.findByDisplayValue('1');
    fireEvent.change(input, { target: { value: 200 } });

    expect(input.value).toBe('3');
  });

  it('Subtotal increases as line items are added', async () => {
    const input = await view.findByDisplayValue('1');
    fireEvent.change(input, { target: { value: 2 } });

    // below is a workaround because I was unable to text match "Subtotal: $40.00"
    // because "Subtotal:" is wrapped by a <strong> tag
    const subtotal = await view.findAllByText('$40.00');

    // So, we just check to make sure that the lineItem's subtotal AND the checkout Subtotal equal $40.00
    expect(subtotal.length).toBe(2);
  });

  it('Proceeds to Shopify checkout with correct items', async () => {
    const checkoutButton = await view.findByText('Proceed to Checkout');

    await act(async () => {
      fireEvent.click(checkoutButton);
      await new Promise((resolve) => setTimeout(resolve, 50)); // wait for response
    });

    expect(createCheckoutMutationCalled).toBe(true);
    expect(addLineItemsMutationCalled).toBe(true);
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://mock-shopify-checkout.com'
    );
  });
});
