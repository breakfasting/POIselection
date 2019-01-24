import React, { Component } from 'react';
import {
  Container, Jumbotron, Card, CardHeader, CardBody, CardSubtitle, Progress,
  CardTitle, CardText, ListGroup, ListGroupItem, Button, Row, Col, CardImg, FormGroup, Label, Input, CardFooter
} from 'reactstrap';
import displayData from './data/scenic_spot_C_f.json';

class Survey extends Component {
  constructor(props) {
    super(props)
    this.handleLog = this.handleLog.bind(this);
  }

  handleLog(item) {
    console.log(item);
  }
  
  render() {
    let results = displayData.XML_Head.Infos.Info;
    var rand = results[Math.floor(Math.random() * results.length)];
    return (
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={6}>
            <Card>
              <CardHeader>Question 1.</CardHeader>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=NoImage&w=318&h=180" />
              <CardBody>
                <CardTitle><h5>{rand.Name}</h5></CardTitle>
                <CardSubtitle><h6 className="text-muted">試設想您規劃前往'{rand.Name}'之行程，請勾選您認為以下天氣情境將影響前往意願之影響程度。</h6></CardSubtitle>
                <CardText className="text-truncate"></CardText>
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <FormGroup row className="mb-0">
                    <Label for="exampleEmail" lg={5}>AT 體感溫度低於16度</Label>
                    <Col className="d-flex align-middle">
                      <FormGroup check inline>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio2" />不影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio2" />稍微影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio2" />嚴重影響
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </ListGroupItem>
                <ListGroupItem>
                  <FormGroup row className="mb-0">
                    <Label for="exampleEmail" lg={5}>AT 體感溫度介於16-40度</Label>
                    <Col className="d-flex align-middle">
                      <FormGroup check inline >
                        <Label check className="ml-2">
                          <Input type="radio" name="radio3" />不影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio3" />稍微影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio3" />嚴重影響
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </ListGroupItem>
                <ListGroupItem>
                  <FormGroup row className="mb-0">
                    <Label for="exampleEmail" lg={5}>AT 體感溫度高於40度</Label>
                    <Col className="d-flex align-middle">
                      <FormGroup check inline >
                        <Label check className="ml-2">
                          <Input type="radio" name="radio4" />不影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio4" />稍微影響
                        </Label>
                        <Label check className="ml-2">
                          <Input type="radio" name="radio4" />嚴重影響
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </ListGroupItem>
              </ListGroup>
              <CardFooter className="text-center">情境1/共3個</CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Survey;