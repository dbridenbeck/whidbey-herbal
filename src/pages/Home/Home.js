import React from "react"
import WelcomeSection from "./WelcomeSection"
import FeaturedProducts from "../../SharedComponents/FeaturedProducts"
import FeaturedPhotos from "./FeaturedPhotos";
import About from "./About"
import PhotoSection from './PhotoSection'
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecipeSection from './RecipeSection'
import Footer from "../../SharedComponents/Footer";

const Home = () =>
    <>
      <WelcomeSection />
      <FeaturedPhotos />
      <FeaturedProducts title={"Featured Products"}/>
      <About />
      <PhotoSection />
      <Process />
      <StoreLocator />
      <RecipeSection />
      <Footer />
    </>

export default Home;
