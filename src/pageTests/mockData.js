import { GET_PRODUCT, GET_FEATURED_PRODUCTS } from '../queries';

export const mockProducts = [
  {
    __typename: 'CollectionEdge',
    node: {
      __typename: 'Collection',
      title: 'Featured Products',
      products: {
        __typename: 'ProductConnection',
        edges: [
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDQ2NDkwOTcyNTg=',
              title: 'Western Red Cedar Essential Oil',
              availableForSale: true,
              handle: 'cedar-oil',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '20.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Cedar_Front_-_3000_X_3000_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Cedar_Back-_3000_X_3000_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/img_2705_41732914981_o_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A0755_copy_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/img_2643_27863780488_o_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Whidbey_Herbal_Cedar_on_Driftwood_FOR_WEB_400x450.jpg?v=1573183882',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDYzNjQ5NjA4MTA=',
              title: 'Lavender Essential Oil',
              availableForSale: true,
              handle: 'lavender-essential-oil',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '15.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Lavender_Front-_3000_X_3000_400x450.jpg?v=1573183646',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Lavender_Back-_3000_X_3000_400x450.jpg?v=1573183646',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A4454_400x450.jpg?v=1573183646',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A4441_400x450.jpg?v=1573183642',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A4447_400x450.jpg?v=1573183642',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/IMG_5771_400x450.JPG?v=1573183642',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQzOTM4NTk4MDkzNzg=',
              title: 'Day Hike Room Spray',
              availableForSale: true,
              handle: 'day-hike-room-spray-2oz',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '25.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeFront-WEB400x450_400x450.jpg?v=1595638472',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeBack-WEB400x450_400x450.jpg?v=1595638472',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE4MTcxNzE1OTEyMTA=',
              title: 'Douglas Fir Essential Oil',
              availableForSale: false,
              handle: 'douglas-fir-oil',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '30.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Doug_Fir_Front-_3000_X_3000_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Doug_Fir_Back-_3000_X_3000_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A0924_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A0803_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/7W5A0919_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/img_1209_41732965811_o_400x450.jpg?v=1573173754',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM5MjQ1NjU2MjI4MjY=',
              title: 'Balsam Poplar Infused Oil',
              availableForSale: true,
              handle: 'balsam-poplar-infused-oil',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '15.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Balsam_Poplar_WEB_Front-_800_X_800_400x450.jpg?v=1573102984',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Balsam_Poplar_WEB_Back-_800_X_800_400x450.jpg?v=1573102984',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  {
    __typename: 'CollectionEdge',
    node: {
      __typename: 'Collection',
      title: 'Wholesale Products',
      products: {
        __typename: 'ProductConnection',
        edges: [
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQzNzUwMDIyNTEzNjI=',
              title: 'WHOLESALE - Lavender EO 5ml',
              availableForSale: true,
              handle: 'wholesale-lavender-eo-5ml',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '7.50',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/LavenderFront-3000X3000_400x450.jpg?v=1584461190',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQzNzUwMDIwNTQ3NTQ=',
              title: 'WHOLESALE - Western Red Cedar EO 5ml',
              availableForSale: true,
              handle: 'wholesale-western-red-cedar-eo-5ml',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '10.00',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/CedarFront-3000X3000_400x450.jpg?v=1584461130',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQzOTM4NjA2Mjg1Nzg=',
              title: 'WHOLESALE - Day Hike Room Spray 2oz',
              availableForSale: true,
              handle: 'wholesale-day-hike-room-spray-2oz',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '12.50',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeFront-3000X3000_506595c3-28fe-4352-a292-ecd7a79e9914_400x450.jpg?v=1586926721',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeBack-3000X3000_927b2694-cece-4b01-965c-96251504e72e_400x450.jpg?v=1586926721',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
          {
            __typename: 'ProductEdge',
            node: {
              __typename: 'Product',
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQzOTM4NTU5NDI3NTQ=',
              title: 'WHOLESALE - Balsam Poplar Infused Oil 5ml',
              availableForSale: true,
              handle: 'wholesale-balsam-poplar-infused-oil',
              variants: {
                __typename: 'ProductVariantConnection',
                edges: [
                  {
                    __typename: 'ProductVariantEdge',
                    node: {
                      __typename: 'ProductVariant',
                      price: '7.50',
                    },
                  },
                ],
              },
              images: {
                __typename: 'ImageConnection',
                edges: [
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Balsam_Poplar_WEB_Front-_800_X_800_8bf36a1e-7020-47eb-91e8-c976dd5ca17c_400x450.jpg?v=1586926381',
                      altText: null,
                    },
                  },
                  {
                    __typename: 'ImageEdge',
                    node: {
                      __typename: 'Image',
                      transformedSrc:
                        'https://cdn.shopify.com/s/files/1/2550/5490/products/Balsam_Poplar_WEB_Back-_800_X_800_763a4039-3a85-4861-9849-d3ca01a3e99c_400x450.jpg?v=1586926381',
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
];

export const mockProduct = {
  __typename: 'Product',
  title: 'Day Hike Room Spray',
  handle: 'day-hike-room-spray-2oz',
  availableForSale: true,
  totalInventory: 3,
  descriptionHtml:
    '<meta charset="utf-8"><meta charset="utf-8">\n<h3>Characteristics </h3>\n<p>Heart notes of cedar green tips, with top notes of sharp, citrusy douglas fir on a bed of earthy rain-soaked soil.<br></p>\n<h3>Uses</h3>\n<p>Spray into the air to bring the Pacific Northwest forests into any indoor space. Best used in enclosed rooms, especially bathrooms and bedrooms. Use as a linen spray for longer-lasting fragrance, but do a test patch on light-colored fabrics before use.</p>\n<h4>Common-Sense Caution</h4>\n<p class="caution">Keep out of reach of children. If you are pregnant, nursing, or under a doctor’s care, consult your physician. Avoid contact with eyes, inner ears, and sensitive areas. Not for internal or topical use. This information has not been evaluated by the Food and Drug Administration. This information is not intended to diagnose, treat, cure, or prevent any disease.</p>\n<br>',
  metafield: {
    __typename: 'Metafield',
    value:
      "Day Hike is a forest in a bottle. The magical mist you get when you combine Cedar, Douglas Fir, and just the right amount of rain-soaked soil. It smells like the air when you've taken 20 steps into the trailhead - fresh, fragrant tree greens and freedom. Now you can take the smell of your outdoor adventures with you wherever you go, Day Hike works great in the car, bathroom, and as a linen spray for whole home fragrance. We use real PNW dirt to make this, so you know it's gonna be good.",
  },
  variants: {
    __typename: 'ProductVariantConnection',
    edges: [
      {
        __typename: 'ProductVariantEdge',
        node: {
          __typename: 'ProductVariant',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTQ4NjYzODMyNTg1OA==',
          priceV2: {
            __typename: 'MoneyV2',
            amount: '25.0',
            currencyCode: 'USD',
          },
        },
      },
    ],
  },
  images: {
    __typename: 'ImageConnection',
    edges: [
      {
        __typename: 'ImageEdge',
        node: {
          __typename: 'Image',
          altText: null,
          transformedSrc:
            'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeFront-WEB400x450_400x450.jpg?v=1595638472',
        },
      },
      {
        __typename: 'ImageEdge',
        node: {
          __typename: 'Image',
          altText: null,
          transformedSrc:
            'https://cdn.shopify.com/s/files/1/2550/5490/products/DayHikeBack-WEB400x450_400x450.jpg?v=1595638472',
        },
      },
    ],
  },
};

export const mocks = [
  {
    request: {
      query: GET_PRODUCT,
      variables: {
        productHandle: 'cedar-oil',
      },
    },
    result: {
      data: {
        productByHandle: {
          __typename: 'Product',
          title: 'Western Red Cedar Essential Oil',
          handle: 'cedar-oil',
          availableForSale: true,
          totalInventory: 5,
          descriptionHtml:
            '<h3>Characteristics</h3>↵<p>Cedar oil is characterized </h3>',
          metafield: {
            value: 'Cedar is our best selling oil. ',
            __typename: 'Metafield',
          },
          variants: {
            __typename: 'ProductVariantConnection',
            edges: [
              {
                __typename: 'ProductVariantEdge',
                node: {
                  __typename: 'ProductVariant',
                  id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzk1ODcyMjUxOTA4Mg==',
                  priceV2: {
                    amount: '20.0',
                    currencyCode: 'USD',
                    __typename: 'MoneyV2',
                  },
                },
              },
            ],
          },
          images: {
            __typename: 'ImageConnection',
            edges: [
              {
                node: {
                  altText: null,
                  transformedSrc: 'https://productWebsite.com/image.jpg',
                  __typename: 'Image',
                },
                __typename: 'ImageEdge',
              },
            ],
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
              __typename: 'CollectionEdge',
              node: {
                title: 'Featured Products',
                products: {
                  edges: [
                    {
                      node: {
                        availableForSale: true,
                        handle: 'cedar-oil',
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDQ2NDkwOTcyNTg=',
                        images: {
                          edges: [
                            {
                              node: {
                                altText: null,
                                transformedSrc:
                                  'https://cdn.shopify.com/s/files/1/2550/5490/products/Lavender_Front-_3000_X_3000_400x450.jpg?v=1573183646',
                                __typename: 'Image',
                              },
                              __typename: 'ImageEdge',
                            },
                          ],
                          __typename: 'ImageConnection',
                        },
                        title: 'Western Red Cedar Essential Oil',
                        variants: {
                          edges: [
                            {
                              node: {
                                price: '20.00',
                                __typename: 'ProductVariant',
                              },
                              __typename: 'ProductVariantEdge',
                            },
                          ],
                          __typename: 'ProductVariantConnection',
                        },
                        __typename: 'Product',
                      },
                      __typename: 'ProductEdge',
                    },
                  ],
                  __typename: 'ProductConnection',
                },
                __typename: 'Collection',
              },
            },
          ],
        },
        __typename: 'CollectionConnection',
      },
    },
  },
];
