import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import App from './App';
import Matrix from './Matrix';
import Weather from './Weather';
import Welcome from './Welcome';
import BasicConfig from './BasicConfig';
import PackageTours from './PackageTours';
import MapsEmbed from './MapsEmbed';
import MapsPreview from './MapsPreview';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">weatherPlans</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="nav-link">
                  <Link to="/">Welcome</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/basic/">Basic</Link>
                </NavItem>   
                <NavItem className="nav-link">
                  <Link to="/package/">Package</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/custom/">Custom</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/matrix/">Matrix</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/weather/">Weather</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/map/">Map</Link>
                </NavItem>

              </Nav>
            </Collapse>
          </Navbar>
          <Route path="/" exact component={Welcome} />
          <Route path="/basic/" component={BasicConfig} />
          <Route path="/package/" component={PackageTours} />
          <Route path="/custom/" component={App} />
          <Route path="/matrix/" component={Matrix} />
          <Route path="/preview/" component={MapsPreview} />
          <Route path="/weather/" component={Weather} />
          <Route path="/map/" component={MapsEmbed} />

        </div>
      </Router>
    );
  }
}

export default AppRouter;