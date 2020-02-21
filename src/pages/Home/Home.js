import React from "react"
import styled from "styled-components";

import WelcomeSection from "./WelcomeSection"
import FeaturedProducts from "../../SharedComponents/FeaturedProducts"
import FeaturedPhotos from "./FeaturedPhotos";
import About from "./About"
import PhotoSection from './PhotoSection'
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecipeSection from './RecipeSection'
import Footer from "../../SharedComponents/Footer";

const HorizLine = styled.div`
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid black;
`;

const Home = () =>
    <>
      <WelcomeSection />
      <FeaturedPhotos />
      <FeaturedProducts title={"Featured Products"} hasTopBottomBorders={true}/>
      <HorizLine />
      <About />
      <PhotoSection />
      <Process />
      <StoreLocator />
      <RecipeSection />
      <Footer />
    </>

export default Home;
