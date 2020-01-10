// import React, { Component } from "react"
// import { Link } from "gatsby"
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as CartActionCreators from '../state/actions/cart';

// import Layout from "../components/Layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

// class IndexPage extends Component {

//   render() {
//     const { dispatch, isDarkMode, say } = this.props;
//     const toggleDarkMode = bindActionCreators(CartActionCreators.toggleDarkMode, dispatch);
//     const saySomething = bindActionCreators(CartActionCreators.saySomething, dispatch);

//   return (
//     <Layout>
//       <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
//       <h1>Hi people</h1>
//       <p>Welcome to your new Gatsby site.</p>
//       <p>Now go build something great.</p>
//       <button
//         style={isDarkMode ? { background: 'black', color: 'white' } : null}
//         onClick={() => toggleDarkMode(!isDarkMode)}>Dark mode {isDarkMode ? 'on' : 'off'}
//       </button>
//       <button onClick={() => saySomething("Hello!")}>
//         Click to say Hello!  
//       </button>
//       <button onClick={() => saySomething("Goodbye!")}>
//         Click to say Goodbye!
//       </button>
//       <p>{say}</p>
//       <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//         <Image />
//       </div>
//       <Link to="/page-2/">Go to page 2</Link>
//     </Layout>
//     )
//   }
// }

// export default connect(state => ({
//   isDarkMode: state.app.isDarkMode,
//   say: state.app.say
// }), null)(IndexPage)

