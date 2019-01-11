import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button, Table } from 'reactstrap';
import config from './config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const grabContent = url => fetch(url)
     .then(res => res.json())
     .then(data => console.log(data));

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
    let urlsArray = this.state.selected.map(element => {return {
      myid: element.id,
      url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + element.name + '&inputtype=textquery&fields=formatted_address,name,opening_hours,rating,id&language=zh-TW&key=' + config.google_key,
    } });
    console.log(urlsArray);
    Promise
      .all(urlsArray.map(checkCache))
      .then(() => console.log(`Urls were grabbed`))  
  }

  render () {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Weather and Open Hours</h1>
          <p>Displaying the Accquired Weather and Open Hours information from CWB and Google Places API</p>
        </Jumbotron>
      </Container>
    );
  }
}

export default Weather;