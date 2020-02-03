import React from "react"
import WelcomeSection from "./WelcomeSection"
import Products from "../../SharedComponents/Products"
import PageWrapper from "../../SharedComponents/PageWrapper"

import About from "./About"
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecpieSection from './RecipeSection'

const Home = () =>
    <PageWrapper>
      <WelcomeSection />
      <Products title={""}/>
      <About />
      <Process />
      <StoreLocator />
      <RecpieSection />
    </PageWrapper>

export default Home;
