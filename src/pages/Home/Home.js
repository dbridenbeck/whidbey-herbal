import React from "react"
import WelcomeSection from "./WelcomeSection"
import FeaturedProducts from "../../SharedComponents/FeaturedProducts"
import PageWrapper from "../../SharedComponents/PageWrapper"

import About from "./About"
import PhotoSection from './PhotoSection'
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecipeSection from './RecipeSection'

const Home = () =>
    <PageWrapper>
      <WelcomeSection />
      <FeaturedProducts title={"Featured Products"} hasTopBottomBorders={true}/>
      <About />
      <PhotoSection />
      <Process />
      <StoreLocator />
      <RecipeSection />
    </PageWrapper>

export default Home;
