import { fireEvent, render } from '../utils/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import Product from '../pages/product/[handle]';
import { mocks, mockProducts, mockProduct } from './mockData';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Product View', () => {
  let view = null;

  beforeEach(async () => {
    useRouter.mockImplementation(() => ({
      pathname: 'shop',
    }));
    view = await render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Product
          handle={'cedar-oil'}
          products={mockProducts}
          productByHandle={mockProduct}
        />
      </MockedProvider>
    );
  });

  it('should render without errors', async () => {
    const title = await view.queryByRole('heading', {
      name: 'WESTERN RED CEDAR ESSENTIAL OIL',
    });

    expect(title).toBeInTheDocument();
  });

  it('should show warning when when maxValue is met on input', async () => {
    const input = await view.findByLabelText('Quantity:');
    fireEvent.change(input, { target: { value: '5' } });
    const warning = await view.findByText('Limit 3 per order.');

    expect(warning).toBeInTheDocument();
  });

  it("should disable 'Add to Cart' button when maxValue is exceeded ", async () => {
    const input = await view.findByLabelText('Quantity:');
    const buyButton = await view.findByText('Add to Cart');

    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(buyButton);

    expect(buyButton).toBeDisabled();
  });

  it("should disable 'Add to Cart' button when line item exists and maxValue is exceeded", async () => {
    const input = await view.findByLabelText('Quantity:');
    const buyButton = await view.findByText('Add to Cart');

    fireEvent.click(buyButton);
    fireEvent.change(input, { target: { value: '5' } });

    expect(buyButton).toBeDisabled();
  });
});
