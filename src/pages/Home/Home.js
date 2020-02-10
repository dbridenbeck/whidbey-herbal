import React from "react"
import WelcomeSection from "./WelcomeSection"
import Products from "../../SharedComponents/Products"
import PageWrapper from "../../SharedComponents/PageWrapper"

import About from "./About"
import PhotoSection from './PhotoSection'
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecipeSection from './RecipeSection'

const Home = () =>
    <PageWrapper>
      <WelcomeSection />
      <Products title={"Featured Products"} hasTopBottomBorders={true}/>
      <About />
      <PhotoSection />
      <Process />
      <StoreLocator />
      <RecipeSection />
    </PageWrapper>

export default Home;
