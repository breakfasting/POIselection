import React, { Component } from 'react';
import {
  Container, Jumbotron, Card, CardHeader, CardBody, CardSubtitle, Progress,
  CardTitle, CardText, ListGroup, ListGroupItem,
} from 'reactstrap';
import WeatherData from './WeatherData';
import config from './config';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import townData from './data/town.json';

const promiseCache = (poi) => {
  return new Promise((resolve, reject) => {
    const cachedHits = localStorage.getItem(poi.myid);
    if (cachedHits) {
      let response = JSON.parse(cachedHits);
      response.from = 'cache';
      resolve(response);
    } else {
      console.log('cache not found, proceed to fetch');
      fetch(poi.url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status === 'OK') {
            let placeID = data.candidates[0].place_id;
            let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&fields=name,opening_hours,address_components&key=' + config.google_key;
            fetch(url)
              .then(res => res.json())
              // .then(data => console.log(data))
              .then((data) => {
                let found = data.result.address_components.find(element => { return element.types[0] === 'postal_code' });
                if (found !== undefined) {
                  let response = {
                    placeID: placeID,
                    open: data.result.opening_hours,
                    town: found.long_name,
                    townName: postalToTown(found.long_name).townName,
                    countyName: postalToTown(found.long_name).countyName,
                    countyApi: postalToTown(found.long_name).countyApi,
                    from: 'places',
                  }
                  console.log(data);
                  localStorage.setItem(poi.myid, JSON.stringify(response));
                  resolve(response);
                } else {
                  let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + poi.latlng + '&key=' + config.google_key;
                  fetch(url)
                    .then(res => res.json())
                    .then((data) => {
                      let found = data.results[0].address_components.find(element => { return element.types[0] === 'postal_code' });
                      let response = {
                        placeID: undefined,
                        open: undefined,
                        town: found.long_name,
                        townName: postalToTown(found.long_name).townName,
                        countyName: postalToTown(found.long_name).countyName,
                        countyApi: postalToTown(found.long_name).countyApi,
                        from: 'geocoding',
                      }
                      localStorage.setItem(poi.myid, JSON.stringify(response));
                      resolve(response);
                    })
                }
              })
          } else if (data.status === 'ZERO_RESULTS') {
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + poi.latlng + '&key=' + config.google_key;
            fetch(url)
              .then(res => res.json())
              .then((data) => {
                let found = data.results.findIndex(element => {
                  return element.address_components.find(element => { return element.types[0] === 'postal_code' });
                })
                let foundresult = data.results[found].address_components.find(element => { return element.types[0] === 'postal_code' });
                let response = {
                  placeID: undefined,
                  open: undefined,
                  town: foundresult.long_name,
                  townName: postalToTown(foundresult.long_name).townName,
                  countyName: postalToTown(foundresult.long_name).countyName,
                  countyApi: postalToTown(foundresult.long_name).countyApi,
                  from: 'geocoding',
                }
                localStorage.setItem(poi.myid, JSON.stringify(response));
                resolve(response);
              })
              .catch(() => console.log(url))
          }
        })
    }
  });
}

function InfoFrom(props) {
  switch (props.from) {
    case 'places':
      return <CardHeader>No cache found, Place ID and Opening hours accquired fresh from google.</CardHeader>
    case 'geocoding':
      return <CardHeader>No cache found, Zero Place ID results, Town accquired from address.</CardHeader>
    case 'cache':
      return <CardHeader>Place ID and Opening hours accquired from cache.</CardHeader>
    default:
      return <CardHeader>Waiting for update.</CardHeader>
  }
}

function timeToDecimal(h, m) {
  var dec = parseInt((m / 6) * 10, 10);
  return parseFloat(parseInt(h, 10) + '.' + (dec < 10 ? '0' : '') + dec);
}

function postalToTown(testpostal) {
  // let testpostal = '10617';
  let county = townData.find(element => {return element.towns.find(element => {return element.postal === testpostal.substring(0,3)})});
  let town = county.towns.find(element => {return element.postal === testpostal.substring(0,3)});
  return {
    countyName: county.name,
    townName: town.name,
    countyApi: county.api,
  }
}

function OpenTime(props) {
  let hoursList = props.open.periods.filter(element => element.open.day === 0);
  let hoursArray = [];
  for (let index = 0; index < hoursList.length; index++) {
    if (hoursList[index].open.time !== '0000') {
      let open = timeToDecimal(hoursList[index].open.time.substring(0, 2), hoursList[index].open.time.substring(2, 4));
      let close = timeToDecimal(hoursList[index].close.time.substring(0, 2), hoursList[index].close.time.substring(2, 4)) - open;
      if (index > 0) {
        open = open - timeToDecimal(hoursList[index - 1].close.time.substring(0, 2), hoursList[index - 1].close.time.substring(2, 4));
      }
      hoursArray.push(<Progress bar color="light" value={open} max={24} key={index * 2}/>);
      hoursArray.push(<Progress bar color="success" value={close} max={24} key={index * 2 + 1}>Open</Progress>)
    } else {
      hoursArray.push(<Progress bar color="light" value={0} max={24} key={index * 2} />);
      hoursArray.push(<Progress bar color="success" value={24} max={24} key={index * 2 + 1}>Open</Progress>)
    }
  }
  return (
    <ListGroupItem>
      <h6>Opening Hours</h6>
      <Progress multi>
        {hoursArray.map(e => { return e })}
      </Progress>
    </ListGroupItem>
  );
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      rows: [],
      info: [],
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.setState(this.props.location.state);
    }
  }

  componentDidMount() {
    // console.log(postalToTown())
    let urlsArray = this.state.selected.map(element => {
      return {
        myid: element.id,
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + element.name + '&inputtype=textquery&fields=formatted_address,name,opening_hours,rating,place_id&language=zh-TW&key=' + config.google_key,
        add: element.add,
        latlng: element.py + ',' + element.px,
      }
    });
    console.log(urlsArray);
    Promise
      .all(urlsArray.map(promiseCache))
      .then((data) => {
        console.log(data);
        this.setState({ info: data });
      })
      .catch(() => console.log('Error accquiring location data'));
  }

  render() {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Weather and Open Hours</h1>
          <p>Displaying the Accquired Weather and Open Hours information from CWB and Google Places API</p>
        </Jumbotron>
        {this.state.info.map((element, index) => {
          return (
            <Card className="mb-5" key={index}>
              <InfoFrom from={element.from} />
              <CardBody>
                <CardTitle><h5>{this.state.selected[index].name}</h5></CardTitle>
                <CardSubtitle><h6 className="text-muted">{postalToTown(element.town).townName} {this.state.selected[index].add}</h6></CardSubtitle>
                <CardText className="text-truncate">{this.state.selected[index].desc}</CardText>
              </CardBody>
              <ListGroup flush>
                {(element.open !== undefined) ? <OpenTime open={element.open} /> : ''}
                <WeatherData api={element.countyApi} town={element.townName}/>
                {/* <ListGroupItem>
                  <h6>Weather Information</h6>
                  <Progress multi>
                    <Progress bar color="light" value="10"></Progress>
                    <Progress bar color="danger" value="20"></Progress>
                    <Progress bar color="light" value="25"></Progress>
                    <Progress bar color="danger" value="5"></Progress>
                    <Progress bar color="warning" value="25"></Progress>
                    <Progress bar color="light" value="15"></Progress>
                  </Progress>
                </ListGroupItem> */}
              </ListGroup>
            </Card>
          );
        })}

        {/* <Card className="mb-5">
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
        </Card> */}
      </Container>
    );
  }
}

export default Weather;