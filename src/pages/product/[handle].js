import { connect } from 'react-redux';
import apolloClient from '../../apolloClient';
import PropTypes from 'prop-types';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import PageWrapper from '../../SharedComponents/PageWrapper';
import Reviews from '../../components/Product/Reviews';
import ProductDetails from '../../components/Product/ProductDetails';
import { GET_PRODUCT } from '../../queries';
import HeadTags from '../../SharedComponents/HeadTags';

// begin component
const Product = ({
  checkout,
  ogUrl,
  handle,
  products,
  product: selectedProduct,
}) => {
  // determine if wholesaleProducts or onlineProducts should be loaded
  const featuredProductsTitle = handle.includes('wholesale')
    ? 'More Wholesale Products'
    : 'More Products';

  // check if item exists in checkout already
  const doesItemExist = () => {
    if (selectedProduct) {
      const filterItems = checkout.lineItems.filter(
        (lineItem) => lineItem.handle === selectedProduct.handle
      );
      return filterItems.length > 0 ? true : false;
    }
  };

  const createProductDetails = () => {
    const handleIfItemExists = doesItemExist();
    return selectedProduct ? (
      <div>
        <ProductDetails
          selectedProduct={selectedProduct}
          doesItemExist={handleIfItemExists}
        />
        <Reviews />
        <FeaturedProducts
          title={featuredProductsTitle}
          products={products}
          bottomPadding
        />
      </div>
    ) : null;
  };

  // begin component's return
  return (
    <>
      <HeadTags
        title={selectedProduct.title}
        ogUrl={ogUrl}
        ogImage={selectedProduct.images.edges[0].node.url}
      />
      <PageWrapper>{selectedProduct && createProductDetails()}</PageWrapper>
    </>
  );
};

Product.propTypes = {
  checkout: PropTypes.object,
};

const mapStateToProps = ({ checkout }) => ({
  checkout,
});

export default connect(mapStateToProps, null)(Product);

export async function getServerSideProps({ req, params, resolvedUrl }) {
  const protocol = req.headers?.referer?.split('/')[0] || '';
  const { handle } = params;
  const { data } = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { productHandle: handle },
  });
  return {
    // TODO, handle error from apollo query
    props: {
      product: data.product,
      products: data?.collections?.edges,
      handle,
      ogUrl: `${protocol}//${req.headers.host}${resolvedUrl}`,
    },
  };
}
