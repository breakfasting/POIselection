import React, { Component } from 'react';
import DisplayList from './DisplayList';
import Selected from './Selected';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button, Alert } from 'reactstrap';
import './App.css';
// eslint-disable-next-line
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
    this.copyForPackage = this.copyForPackage.bind(this);
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

  copyForPackage() {
    let a = JSON.stringify(this.state.selected);
    console.log(a);
  }

  componentDidMount() {
    this.addPOI(
    {
      id: 'POI_SYSTEM_DEFAULT_ORIGIN',
      name: '國立臺灣大學',
      desc: '國立臺灣大學，簡稱臺大、NTU，是臺灣第一所現代綜合大學，為臺灣學生人數最多的高等教育機構。其始於1928年日治時代中期創校的「臺北帝國大學」，1945年中華民國接收臺灣後經改制與兩次易名始用現名。',
      pic: 'https://www.ntu.edu.tw/images/photo/academicsPhoto_1.jpg',
      add: '台北市大安區羅斯福路四段1號',
      cls: 1,
      px: 121.535549,
      py: 25.014947,
      od: true,
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
              <Alert color="info">
                The Origin and Destination are both defaulted as 'National Taiwan Uniwersity'.
              </Alert>
              <Selected selected={this.state.selected} deletePOI={this.deletePOI} />
            </Col>
          </Row>
            <Button color="danger" onClick={this.copyForPackage}>123123123</Button>
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
