import React, { Component } from 'react';
import DisplayList from './DisplayList';
import Selected from './Selected';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button } from 'reactstrap';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selected: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.addPOI = this.addPOI.bind(this);
    this.deletePOI = this.deletePOI.bind(this);
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

  deletePOI(key) {
    let initArray = this.state.selected;
    let deleteElement = initArray.findIndex(element => {return element.id === key});
    initArray.splice(deleteElement,1);
    this.setState({
      selected: initArray,
    });
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
              <h1 className="display-3">Selected POIs</h1>
              <Selected selected={this.state.selected} deletePOI={this.deletePOI} />
            </Col>
          </Row>
          <Link to={{
            pathname: '/matrix',
            state: this.state.selected,
          }}>
            <Button color="info" className="mb-5" disabled={this.state.selected.length > 0 ? false : true }>Next Step ></Button>
          </Link>
          

        </Container>
        
      </div>
    );
  }
}

export default App;
