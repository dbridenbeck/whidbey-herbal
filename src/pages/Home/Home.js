import React, { Component } from "react"
import LogoIllustration from "./LogoIllustration"
import Products from "../../SharedComponents/Products"
import About from "./About"
import Process from "./Process"
import StoreLocator from "./StoreLocator"
import RecpieSection from './RecipeSection'
// import SEO from "../components/seo"

class Index extends Component {

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

export default Index;
