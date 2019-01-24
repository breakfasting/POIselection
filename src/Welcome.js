import React, { Component } from 'react';
import { Container, Jumbotron, Button, Alert } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './cover.jpg';

const divStyle = {
  background: 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' + logo + ')',
  backgroundSize: 'cover',
};

class Welcome extends Component {
  render() {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center text-light" style={divStyle}>
          <h1 className="display-2">WeatherPlans</h1>
          <p>Applying The Time-Expanded Network in Dynamic Travel Itinerary Planning:<br/> Decision-Making Under Varying Weather Information</p>
        </Jumbotron>
        <Alert color="info">
          Welcome to 'weatherPlans', a personal adaptive itinerary mobile application, that takes weather forecast data into account and provides personalized travel itineraries accordingly.
        </Alert>
        <Alert color="info">
          The attractions data sets are acquired from 'Tourism Bureau, M.O.T.C. Republic of China', weather forecast data from 'Central Weather Bureau, R.O.C', and traffic information from Google.
        </Alert>
        <Alert color="info">
          The scope of this study are focused on 'One-Day', 'Domestic', 'Independent Travelers', that intend to make traveling plans in Taiwan.
        </Alert>
        <Alert color="warning">
          The focus of this research are the adaptations a tourist may make to alter their planned itinerary, therefore the formation of a travelers first travel plan is not the major concern in this study. However, we still provide a basic tour recommender for ease of use.
        </Alert>
        <Link to={{
            pathname: '/basic/',
          }}>
            <Button color="info" className="mb-5" >Next Step ></Button>
          </Link>
      </Container>
    );
  }
}

export default Welcome;