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

const Users = () => <h2>Users</h2>;

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
                  <Link to="/users/">Users</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Route path="/" exact component={App} />
          <Route path="/matrix/" component={Matrix} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;