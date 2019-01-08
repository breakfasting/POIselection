import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button, Table } from 'reactstrap';
import config from './config';
const googleMapsClient = require('@google/maps').createClient({
  key: config.google_key,
  Promise: Promise
});



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

            {/* {this.state.selected.map( (element, index) => {
              return (
                <tr> 
                  <th>{element.name}</th>
                    {this.state.rows[index].elements.map( e => {return <td>e.duration.text</td>)}
                    {this.state.rows.map( element => {
                      return <td>{element.elements[index].duration.text}</td>;
                    } )}                
                </tr>
              );
            } )} */}
            {/* <tr>
              <th scope="row">台灣金屬創意館</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Matrix;