import React, { Component } from 'react';
import config from './config';
import { Container, Jumbotron, Button, Alert, Col, Row } from 'reactstrap';

const displayArray = [
  { id: 0, name: '國立臺灣大學', distance: [0, 44, 68, 55, 71, 68] },
  { id: 4, name: '富貴角遊憩區', distance: [73, 38, 5, 22, 0, 5] },
  {
    id: 3,
    name: '石門婚紗廣場',
    distance: [59, 54, 21, 0, 21, 21],
    open: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: 5,
    name: '白沙灣水域遊憩區',
    distance: [70, 34, 0, 23, 6, 0],
    open: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
  },
  { id: 2, name: '麟山鼻遊憩區', distance: [70, 34, 0, 23, 6, 0] },
  {
    id: 1,
    name: '淡水老街',
    distance: [44, 0, 34, 54, 36, 34],
    open: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  { id: 0, name: '國立臺灣大學', distance: [0, 44, 68, 55, 71, 68] },
];

const timeArray = [71,22,21,0,34,44];

class MapsEmbed extends Component {
  render() {
    return (
      <Container fluid className="mt-4">
        <Row>
          <Col lg={5} md={6} className="justify-content-center d-flex">
            <iframe
              width="600"
              height="600"
              frameborder="0"
              src=
              {
                'https://www.google.com/maps/embed/v1/directions?key=' + config.google_key +
                '&origin=' + '臺灣大學' +
                '&waypoints=' + '富貴角遊憩區|石門婚紗廣場|白沙灣水域遊憩區|麟山鼻遊憩區|淡水老街' +
                '&destination=' + '臺灣大學'
              } allowfullscreen>
            </iframe>
          </Col>
          <Col lg={7} md={6}>
            <Alert>123123</Alert>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default MapsEmbed;