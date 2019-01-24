import React, { Component } from 'react';
import config from './config';
import { Container, Col, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Alert } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const timeArray = [55, 21, 5, 0, 34, 44];
const answer = [0, 3, 4, 5, 2, 1, 0];

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}


class MapsEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      rows: [],
      time: [],
      answer: [],
      display: false,
    }
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        selected: this.props.location.state.selected,
        rows: this.props.location.state.rows,
        answer: [0, 3, 4, 5, 2, 1, 0],
      });
    }
    let time = new Date('Jan 26, 2019 08:00:00');
    const answerArray = [];
    answerArray.push(time.toLocaleTimeString('zh-TW').slice(0, -3));
    let end = time;
    let start = time;
    for (let index = 0; index < answer.length - 2; index++) {
      start = addMinutes(end, timeArray[index]);
      end = addMinutes(start, 60);
      answerArray.push(start.toLocaleTimeString('zh-TW').slice(0, -3) + ' - ' + end.toLocaleTimeString('zh-TW').slice(0, -3));
    }
    start = addMinutes(end, timeArray[answer.length - 2])
    answerArray.push(start.toLocaleTimeString('zh-TW').slice(0, -3));
    console.log(answerArray);
    this.setState({ time: answerArray })
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ display: true }) }, 400);
  }

  render() {
    return (
      <Container fluid className="mt-4">
        {(this.state.display === false) ?
          <Row className="justify-content-center d-flex">
            <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>
          </Row> :
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
                <Alert>A preview of the shortest travel time before implementing weather info.</Alert>
              {answer.map((element, index) => {
                return (
                  <Card className="my-2">
                    <CardBody>
                      <CardTitle><h5>{this.state.selected[element].name}</h5></CardTitle>
                      <CardSubtitle><h6 className="text-muted">{this.state.time[index]}</h6></CardSubtitle>
                      <CardText className="text-truncate">{this.state.selected[element].desc}</CardText>
                    </CardBody>
                  </Card>
                );
              })}
            </Col>
          </Row>
        }
          <Link to={{
            pathname: '/weather',
            state: {
              selected: this.state.selected,
              rows: this.state.rows,
            }
          }}>
            <Button color="info" className="mb-5" >Next Step ></Button>
          </Link>
      </Container>

    );
  }
}

export default MapsEmbed;