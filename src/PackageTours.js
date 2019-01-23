import React, { Component } from 'react';
import { Container, Jumbotron, Button, Alert } from 'reactstrap';
import { Row, Col, InputGroup, Input } from 'reactstrap';
import { Card, CardColumns, CardTitle, CardText, CardImg, CardImgOverlay, CardBody, CardSubtitle } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



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

  render() {
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

              <Card>
                <CardImg top width="100%" src="https://www.taiwan.net.tw/pic.ashx?qp=1/big_journey/pic_126_2.jpg&sizetype=2" />
                <CardBody>
                  <CardTitle><h5>臺北都會一日遊</h5></CardTitle>
                  <CardSubtitle><h6 className="text-muted">#古蹟巡禮#寺廟祈福#逛夜市#博物館</h6></CardSubtitle>
                </CardBody>
              </Card>
              <Card>
                <CardImg top width="100%" src="https://www.taiwan.net.tw/pic.ashx?qp=1/big_journey/pic_231_3.jpg&sizetype=2" />
                <CardBody>
                  <CardTitle><h5>高雄美食一日遊</h5></CardTitle>
                  <CardSubtitle><h6 className="text-muted">#非吃不可</h6></CardSubtitle>
                </CardBody>
              </Card>
              <Card>
                <CardImg top width="100%" src="https://www.taiwan.net.tw/pic.ashx?qp=1/big_journey/pic_466_3.jpg&sizetype=2" />
                <CardBody>
                  <CardTitle><h5>艋舺寺廟古蹟一日遊</h5></CardTitle>
                  <CardSubtitle><h6 className="text-muted">#寺廟祈福#古蹟巡禮</h6></CardSubtitle>
                </CardBody>
              </Card>

            </CardColumns>
          </Col>
        </Row>
        <Link to={{
          pathname: '/basic/',
        }}>
          <Button color="info" className="mb-5" >Next Step ></Button>
        </Link>
      </Container>
    );
  }
}

export default PackageTours;