import React, { Component } from 'react';
import { Container, Jumbotron, Button, Alert, Col, Row } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class BasicConfig extends Component {
  render() {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Basic Itinerary Configurations</h1>
          <p>Setting the date of departure, the time of departure and arrival, and origin and destination of the tour</p>
        </Jumbotron>

        <Form>
          <Alert color="info">
            Setting the date of departure. (As the scope of this research indicates, only one-day tours are supported).
          </Alert>
          <FormGroup>
            <Label for="exampleDate">Date of Departure</Label>
            <Input
              value="2019-01-25"
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
            />
          </FormGroup>

          <Alert color="info" className="mt-4">
            Setting the time of departure and arrival of the tour.
          </Alert>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Time of Departure</Label>
                <Input
                  type="time"
                  name="timeDeparture"
                  value="08:00"
                  id="exampleTimeDeparture"
                  placeholder="time placeholder"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Time of Arrival</Label>
                <Input
                  type="time"
                  value="20:00"
                  name="timeArrival"
                  id="exampleTimeArrival"
                  placeholder="time placeholder"
                />
              </FormGroup>
            </Col>
          </Row>

          <Alert color="info" className="mt-4">
            Setting the tour’s starting and ending point
          </Alert>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Origin</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>國立臺灣大學</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Destination</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>國立臺灣大學</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

        </Form>

        <Link to={{
          pathname: '/',
        }}>
          <Button color="info" className="mb-5" >Next Step ></Button>
        </Link>
      </Container>
    );
  }
}

export default BasicConfig;