import React, { Component } from 'react';
import { Container, Jumbotron, Button, Alert } from 'reactstrap';
import { Row, Col, InputGroup, Input } from 'reactstrap';
import { Card, CardColumns, CardTitle, CardText, CardImg, CardImgOverlay, CardBody, CardSubtitle } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import displayList from './data/package-tours-data.json';



class PackageTours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selected: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.setState({
      filterText: event.target.value,
    })
  }

  componentDidMount() {
  }

  render() {
    let results = displayList.array;
    let filtered = results.filter(element => { return element.tag.find(e => { return e.indexOf(this.state.filterText) > -1 }) });
    console.log(filtered)
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Package Tours</h1>
          <p>Select any packaged tours for your liking and proceed to further customizing it.</p>
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
            <div className="mt-1">
              <Button outline value="美食之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">美食之旅</Button>
              <Button outline value="文化之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">文化之旅</Button>
              <Button outline value="溫泉之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">溫泉之旅</Button>
              <Button outline value="樂活之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">樂活之旅</Button>
              <Button outline value="離島之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">離島之旅</Button>
              <Button outline value="生態之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">生態之旅</Button>
              <Button outline value="鐵道之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">鐵道之旅</Button>
              <Button outline value="夜市之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">夜市之旅</Button>
              <Button outline value="品茶之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">品茶之旅</Button>
              <Button outline value="原鄉之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">原鄉之旅</Button>
              <Button outline value="無障礙之旅" onClick={this.handleFilter} color="info" size="sm" className="mr-1">無障礙之旅</Button>
            </div>

          </Col>
          <Col lg="10">
            {/* <h1>value is {this.state.filterText}</h1> */}
            {/* <DisplayList filterText={this.state.filterText} addPOI={this.addPOI} /> */}

            <CardColumns className="mt-5">
              {filtered.slice(0, 9).map(e => {
                return (
                  <Card>
                    <CardImg top width="100%" src={e.pic} />
                    <CardBody>
                      <CardTitle><h5>{e.name}</h5></CardTitle>
                      <CardSubtitle><h6 className="text-muted">{e.desc}</h6></CardSubtitle>
                      <Link to={{
                      pathname: '/custom/',
                      state: e.selected,
                    }}>
                      <Button color="info" size="sm" >Select ></Button>
                    </Link>
                    </CardBody>

                  </Card>
                );
              })}
            </CardColumns>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default PackageTours;