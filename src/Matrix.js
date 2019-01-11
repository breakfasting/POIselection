import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button, Table } from 'reactstrap';
import config from './config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const grabContent = url => fetch(url)
//      .then(res => res.json())
//      .then(data => console.log(data));



class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      rows: [],
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        selected: this.props.location.state,
      });
    }
  }

  componentDidMount() {
    let originsArray = this.state.selected.map(element => {return element.add});
    let origins = originsArray.join('|');
    console.log(origins);
    let coordinatesArray = this.state.selected.map(e => {return e.py + ',' + e.px});
    let coordinates = coordinatesArray.join('|');
    console.log(coordinates);
    // let origins = '新北市萬里區野柳村港東路167-1號|新北市石門區富基里|新北市石門區楓林路27號|新北市金山區金包里街16號';
    fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origins + '&destinations=' + origins + '&language=zh-TW&key=' + config.google_key)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          console.log(data.rows);
          this.setState({ rows: data.rows });
        }
      });
    // let urlsArray = this.state.selected.map(element => {return 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + element.name + '&inputtype=textquery&fields=formatted_address,name,opening_hours,rating&language=zh-TW&key=' + config.google_key });
    // console.log(urlsArray);
    // Promise
    //   .all(urlsArray.map(grabContent))
    //   .then(() => console.log(`Urls were grabbed`))  
  }

  render() {
    return (
      <Container>
        <Jumbotron className="mt-5 text-center">
          <h1 className="display-2">Network Adjacency Matrix</h1>
          <p>Displaying the static network adjacency matrix through querying google directions API</p>
        </Jumbotron>
        <p>
          A total of {this.state.selected.length} POIs are selected.
        </p>
        
        <Table responsive bordered>
          <thead>
            <tr>
              <th className="table-light text-right">Origin\Destination</th>
                {this.state.selected.map( element => {
                  return <th key={element.id} >{element.name}</th>;
                } )}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map( (element, index) => {
              return (<tr key={index} >
                <th className="table-light text-right">{this.state.selected[index].name}</th>
                  {element.elements.map((e, j) => {return <td key={index*25+j} >{(e.status === "OK") ? (e.duration.value === 0 ? '-' : e.duration.text ) : (e.status === 'ZERO_RESULTS') ? '查無結果' : e.status}</td>})}
              </tr>);
            } )}
          </tbody>
        </Table>
        <Link to={{
            pathname: '/weather',
            state: this.state,
          }}>
            <Button color="info" className="mb-5" disabled={this.state.selected.length > 0 ? false : true }>Next Step ></Button>
          </Link>
      </Container>
    );
  }
}

export default Matrix;