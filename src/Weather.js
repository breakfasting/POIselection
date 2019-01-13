import React, { Component } from 'react';
import {
  Container, Jumbotron, Card, CardHeader, CardBody, CardSubtitle, Progress,
  CardTitle, CardText, ListGroup, ListGroupItem,
} from 'reactstrap';
import config from './config';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const grabContent = url => fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data));

function checkCache(poi) {
  fetch(poi.url)
    .then(res => res.json())
    .then(data => console.log(data));
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      rows: [],
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.setState(this.props.location.state);
    }
  }

  componentDidMount() {
    let urlsArray = this.state.selected.map(element => {
      return {
        myid: element.id,
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + element.name + '&inputtype=textquery&fields=formatted_address,name,opening_hours,rating,id&language=zh-TW&key=' + config.google_key,
      }
    });
    console.log(urlsArray);
    // Promise
    //   .all(urlsArray.map(checkCache))
    //   .then(() => console.log(`Urls were grabbed`))  
  }

  render() {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Weather and Open Hours</h1>
          <p>Displaying the Accquired Weather and Open Hours information from CWB and Google Places API</p>
        </Jumbotron>

        <Card className="mb-5">
          <CardHeader>Place ID and Opening hours accquired from cache.</CardHeader>
          <CardBody>
            <CardTitle><h5>國立臺灣大學</h5></CardTitle>
            <CardSubtitle><h6 className="text-muted">大安區</h6></CardSubtitle>
            <CardText className="text-truncate">國立臺灣大學，簡稱臺大、NTU，是臺灣第一所現代綜合大學，為臺灣學生人數最多的高等教育機構。其始於1928年日治時代中期創校的「臺北帝國大學」，1945年中華民國接收臺灣後經改制與兩次易名始用現名。</CardText>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem>
              <h6>Opening Hours</h6>
              <Progress multi>
                <Progress bar color="light" value="15"></Progress>
                <Progress bar color="success" value="60">Open</Progress>
                <Progress bar color="light" value="25"></Progress>
              </Progress>
            </ListGroupItem>
            <ListGroupItem>
              <h6>Weather Information</h6>
              <Progress multi>
                <Progress bar color="light" value="10"></Progress>
                <Progress bar color="danger" value="20"></Progress>
                <Progress bar color="light" value="25"></Progress>
                <Progress bar color="danger" value="5"></Progress>
                <Progress bar color="warning" value="25"></Progress>
                <Progress bar color="light" value="15"></Progress>
              </Progress>
            </ListGroupItem>
          </ListGroup>
        </Card>

        <Card className="mb-5">
          <CardHeader>No cache found, Place ID and Opening hours accquired fresh from google</CardHeader>
          <CardBody>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          </CardBody>
        </Card>

        <Card className="mb-5">
          <CardHeader>No cache found, Zero Place ID results, Town name accquired from address</CardHeader>
          <CardBody>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Weather;