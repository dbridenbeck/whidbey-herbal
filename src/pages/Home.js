import React, { Component } from "react"
import LogoIllustration from "../components/LogoIllustration"
import Products from "../components/Products"
import About from "../components/About"
import Process from "../components/Process"
import StoreLocator from "../components/StoreLocator"
import RecpieSection from '../components/RecipeSection'
// import SEO from "../components/seo"

class Home extends Component {

  render() {

  return (
    <div>
      <LogoIllustration />
      <Products title={""}/>
      <About />
      <Process />
      <StoreLocator />
      <RecpieSection />
    </div>
  );
  }
}

export default Home;
