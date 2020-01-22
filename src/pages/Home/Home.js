import React from "react"
import WelcomeSection from "./WelcomeSection"
import Products from "../../SharedComponents/Products"
import About from "./About"
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecpieSection from './RecipeSection'

const Home = () =>
    <div>
      <WelcomeSection />
      <Products title={""}/>
      <About />
      <Process />
      <StoreLocator />
      <RecpieSection />
    </div>

export default Home;
