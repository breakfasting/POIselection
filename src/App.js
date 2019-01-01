import React, { Component } from 'react';
import DisplayList from './DisplayList';
import Selected from './Selected';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button } from 'reactstrap';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selected: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.addPOI = this.addPOI.bind(this);
  }

  handleFilter(event) {
    this.setState({
      filterText: event.target.value,
    })
  }

  addPOI(key) {
    this.setState({
      selected: [...this.state.selected, key],
    })
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Jumbotron className="mt-5">
            <h1 className="display-2">Custom Itinerary Planning</h1>
            <p>Please search and select the desired Point-of-interests</p>
          </Jumbotron>
          <Row className="justify-content-center">
            <Col lg="10">
              <InputGroup>
                <Input 
                  placeholder="Search for POIs"
                  value={this.state.filterText}
                  onChange={this.handleFilter}
                />
                {/* <InputGroupAddon addonType="append">Search</InputGroupAddon> */}
              </InputGroup>
            </Col>
            <Col lg="10">
              {/* <h1>value is {this.state.filterText}</h1> */}
              <DisplayList filterText={this.state.filterText} addPOI={this.addPOI} />
            </Col>
            <Col lg="10" className="mt-5">
              <h1 class="display-3">Selected POIs</h1>
              <Selected />
            </Col>
          </Row>
          

        </Container>
        
      </div>
    );
  }
}

export default App;
