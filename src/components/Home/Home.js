import WelcomeSection from './WelcomeSection';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import FeaturedPhotos from './FeaturedPhotos';
import About from './About';
import PhotoSection from './PhotoSection';
import Process from './Process';
import StoreLocator from './StoreLocator';
import RecipeSection from './RecipeSection';

const Home = ({ articles, products }) => (
  <>
    <WelcomeSection />
    <FeaturedPhotos />
    <FeaturedProducts title={'Featured Products'} products={products} />
    <About />
    <PhotoSection />
    <Process />
    <StoreLocator />
    <RecipeSection articles={articles} />
  </>
);

export default Home;
