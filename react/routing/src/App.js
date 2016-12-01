import React from 'react';
import { Router, Route, Redirect, Link, IndexRoute, hashHistory } from 'react-router';


// const Home = () => <div><h1>Home</h1><Links /></div>

class Home extends React.Component {
  componentWillMount() {
    this.context.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  }

  routerWillLeave(nextLocation) {
    //console.log(`leaving Home ${nextLocation.pathname}`);
    return `leaving Home ${nextLocation.pathname}`;
  }

  render() {
    return <div><h1>Home</h1><Links /></div>;
  }
}

Home.contextTypes = { router: React.PropTypes.object.isRequired }

const About = () => <div><h1>About Us</h1><Links /></div>
const Contact = () => <div><h1>Contact</h1><Links /></div>

const Links = () =>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about-us">About Us</Link>
    <Link to="about">About</Link>
    <Link to="contact">Contact</Link>
  </nav>

class App extends React.Component {
  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={Home}></Route>
        <Route path="/about-us" component={About}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Redirect from="/about" to="/about-us"></Redirect>
      </Router>
    );
  }
}

export default App;
