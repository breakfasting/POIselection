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
import SimpleMap from './SimpleMap';
import Welcome from './Welcome';
import BasicConfig from './BasicConfig';

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
                  <Link to="/">Home</Link>
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
                <NavItem className="nav-link">
                  <Link to="/welcome/">Welcome</Link>
                </NavItem>
                <NavItem className="nav-link">
                  <Link to="/basic/">Basic</Link>
                </NavItem>             
              </Nav>
            </Collapse>
          </Navbar>
          <Route path="/" exact component={App} />
          <Route path="/matrix/" component={Matrix} />
          <Route path="/weather/" component={Weather} />
          <Route path="/map/" component={SimpleMap} />
          <Route path="/welcome/" component={Welcome} />
          <Route path="/basic/" component={BasicConfig} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;