# Whidbey Herbal Online Store
Created between 2019 and 2020 by Darren Bridenbeck

# Description
A complete redesign of Whidbey Herbal's previous website that used a Shopify template. Features include:

1) Updated UI to better tell the story of Whidbey Herbal and their process, mixing watercolor images with high-quality photos
2) Implemented a Recipes section that leverages Shopify's blog
3) Implemented a second shop page hidden from the UI, but which supports wholesale orders
4) Interactive google map store locator

# Specifications

## Initializing the app
- index.js
- root.js
- App.js

### index.js
- mount Root.js

### root.js
**Root.js handles the following:**
- initialize google analytics
- persist state to local storage
- create redux store using thunk middleware
- implement Router
- implement ScrollToTop to ensure pages are always at top position on route changes
- add App.js

### App.js
**App.js handles the following:**
- Wrap the rest of the app in Layout component
- add routes wrapped in <Switch>

## Layout.js
**Layout.js handles the following**
- Wraps the app in MasterWrapper
- Clears checkoutId in redux if user completed checkout
- Add wholesale products, online store products, articles, and featured products from shopify to redux if they don't exist
- Check every 5 minutes to see if shopify data has changed, if so, re-fetch them
- Wrap children around MasterWrapper, and add Header above children

#### Header.js
- Handles showing links at top of page in laptop+ resolution, and within a hamburger if smaller than laptop resolution
- Still contains legacy code based on an old UI spec that required the header to be hidden when scrolled to top of page. Now the header is shown at all times. This code needs a refactor to remove this legacy code.
- Handles createCheckoutLink() which updates the shopping cart icon with the number of items in cart

#### fetchShopifyData.js
This file contains the Redux actions for fetching shopify data and storing it in redux. This uses custom queries of the Buy SDK, which resembles graphql, but is less straight forward and poorly documented. In the future the entire shopify interactions need to be flattened to use the Storefront API and Admin API using graphQL. Nonetheless, here's a description of these actions:
- fetchShopifyArticlesAction: responsible for fetching articles on initial load
- updateShopifyArticlesAction: responsible for updating articles if needed (this is checked every 5 min on layout.js)
- fetchProductCollectionAction: responsible for fetching and updating product collections. Makes fetching/updating collections more extensible by allowing arguments for collectionHandle, numOfItems, and handleReduxDispatch (which can either be "handleDispatchingProducts" or "handleUpdatingProducts")

### Pages
#### Checkout
- handle adding line items which contain: a button to remove the line item, item photo, title and description, and an input to update quantity of the item
- handle showing that the checkout button has been clicked and that user is moving to shopify checkout page
- creates shopify checkout via buy sdk when CheckoutButton is clicked
- createCheckoutContainer() shows empty cart message if no items in cart, otherwise shows line item headers, line items and item subtotal

#### Home
Contains the following:
- WelcomeSection: Large watercolor of farm and main tagline text "Small batch handcrafted seed-to-bottle"
- FeaturedPhotos: colorblock SVG with additional info on farm and two photos
- FeaturedProducts: FeaturedProducts shared component
- About: watercolor of Sam and Caitlin and description about them
- PhotoSection: two photos meant to create a "color block" effect but with photos
- Process: Watercolor image and description of each step in their process, and a photo at the bottom
- StoreLocator: Interactive google map showing their current retail locations.
- RecipeSection: A list of recipes from their Shopify Blog
- Footer: footer information and email subscription link

#### Product
Page for an individual product. It first determines if the product is a wholesale item or online store item, then:
- using the route's match.params, finds the item
- checks to see if the item exists in checkout or not
- creates ProductDetails, which then handles adding product images, and product description (which handles BuyButton's behavior of adding a new line item to checkout or simply updating line item quantity)

#### Recipe
Matches the route to an article in redux, then generates image, title, and shopify article content for the given recipe.

#### Shop
- uses useLocation to determine if route is on /shop or /wholesale, then creates a ShopProduct with the products contained in either onlineStore or wholesale in redux

### Plugins
- shopify.js: makes a connection to shopify's buy sdk

### SharedComponents
- ComponentWrapper: meant to be a reusable wrapper to control components that needed to have full width bars or control spacing of Process.js's svg circle positioning
- ContactAndSocials: used by Footer.js to show instagram and facebook logo
- ExceededMaxQuantityWarning: handles displaying warning if user attempts to add more items than allowed
- FeaturedProduct: shows either wholesale or featured products from redux depending on route location, supports "title" prop as a string, to control the title of this component for different  contexts (e.g. - "keep shopping", "explore the shop", "shop more products")
- Footer: used on every page to show NewsletterSignup.js and ContactAndSocials.js
- NewsletterSignup: implements newsletter signup process with mailchimp
- PageWrapper: wrapper for pages - initially used to try and get page transitions to behave correctly. This needs to be revisted.
- Product: used to display individual products from FeaturedProducts.js
- QuantityButton: Calculates the amount that can still be added to Quantity input field, and displays warning message if max quantity is met (note, this, ProductDescription, ProductDetails, and BuyButton likely need to be refactored, there's some legacy code here muddying it up.)
- StyledH1, StyledH2, StyledH3, StyledH5: Custom styled components.

### State
#### App.js
Contains the redux reducer for the entire app. In an ideal situation should likely be split into multiple reducers and then combined using combineReducers()

**Actions for the reducer include:**
- ADD_LINE_ITEM: adds item to checkout in redux
- REMOVE_LINE_ITEM: removes item from checkout in redux
- UPDATE_ITEM_QUANTITY: updates item's quantity in checkout
- UPDATE_CHECKOUT_ID: updates checkout ID in redux, (e.g. if a user goes to checkout, then clicks back button)
- CLEAR_CHECKOUT_IN_STATE: clears checkout in redux, used when checkout has been completed
- FETCH_PENDING: used to set pending to true while data is being fetched from shopify
- FETCH_SUCCESSS: adds data to redux and sets pending to false, used when data was sucessfully fetched from shopify
- FETCH_ERROR: adds an error to redux if fetching from shopify resulted in an error
- TOGGLE_BURGER: toggles burgerToggled and burgerClickedOnce to true, used for opening/closing hamburger on mobile devices
- CLEAR_BURGER: sets burgerClickedOnce and burgerToggled to false, used on refresh to keep nav closed on load
- UPDATE_QUANTITY_BUTTON: sets quantityButtonAmount, used for QuantityButton to determine how much to increase quantity by when item is added to cart
- SET_GOOGLE_MAP_INFO_WINDOW: set which store is selected to be viewed on Store Locator in home.js
- UPDATE_SHOPIFY_FETCH_TIMESTAMP: sets timestamp for when shopify data was last fetched, used to determine when to re-fetch shopify data and compare it with redux, to determine if redux should be updated with new shopify data or not

### Utils
- devices.js: used to give variable names to different media sizes (e.g. laptop is 1024px, mobile is 375px). This makes css media queries simpler to declare.
- ScrollToTop.js: scrolls window automatically to top on route change

# Setup/Install Requirements
- download git repo
- run 'npm install' to install dependencies
- npm run dev to run dev server

# Known Bugs
- Error handling needs to be improved if shopify http requests fail

# Support and Contact Details
Contact Darren Bridenbeck at darren.bridenbeck@gmail.com with questions or issues.

# Technologies Used
- react-google-maps to support Store Locator
- react-redux
- react-router-hash-link to support using hash links on home.js for about/process/find a store/recipes
- redux-thunk to support shopify buy sdk requests via redux actions
- shopify-buy to get access to shopify data
- styled-components for styling
- node-sass to support scss