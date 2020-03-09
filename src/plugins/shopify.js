import Client from 'shopify-buy/index.unoptimized.umd';

const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN;

export const client = Client.buildClient({
  domain: "whidbey-herbal.myshopify.com",
  storefrontAccessToken: `${STOREFRONT_ACCESS_TOKEN}`
});