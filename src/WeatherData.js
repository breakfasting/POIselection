import React, { Component } from 'react';
import {
  Progress, ListGroupItem, ListGroup,
} from 'reactstrap';
import config from './config';

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
    };
  }

  componentDidMount() {
    let endDate = new Date('2019-01-18 08:00:00');
    let startDate = new Date('2019-01-17 08:00:00');

    let timeFrom = startDate.toISOString().substring(0, 19);
    let timeTo = endDate.toISOString().substring(0, 19);
    let requestUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/' + this.props.api + '?Authorization=' + config.cwb_key + '&locationName=' + this.props.town + '&timeFrom=' + timeFrom + '&timeTo=' + timeTo;
    fetch(requestUrl)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (data.success === 'true') {
          this.setState({ weather: data.records.locations[0].location[0].weatherElement });
        }
      });
  }
  render() {
    return (
      <ListGroup flush>
        {this.state.weather.map(element => {
          return (
            <ListGroupItem>
              <h6>{element.description}</h6>
              <Progress multi>
                {element.time.map((e, i, a) => {
                  return (
                    <Progress bar color="light" className="text-dark" value="1" max={a.length}>{e.elementValue[0].value}</Progress>
                  );
                })}
{/*                 
                <Progress bar color="danger" value="20"></Progress>
                <Progress bar color="light" value="25"></Progress>
                <Progress bar color="danger" value="5"></Progress>
                <Progress bar color="warning" value="25"></Progress>
                <Progress bar color="light" value="15"></Progress> */}
              </Progress>
            </ListGroupItem>
          );
        })}

      </ListGroup>
    );
  }
}

export default WeatherData;