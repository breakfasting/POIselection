import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button, Table } from 'reactstrap';

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
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
    fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=新北市萬里區野柳村港東路167-1號|新北市石門區富基里&destinations=新北市石門區楓林路27號|新北市金山區金包里街16號&language=zh-TW&key=AIzaSyA5-ZGuoZHs5sTMUfIq07oGYjfpOTK8qsA')
      .then(response => response.json())
      .then(data => console.log(data));
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
              <th>#</th>
                {this.state.selected.map( element => {
                  return <th>{element.name}</th>;
                } )}
            </tr>
          </thead>
          <tbody>
            {this.state.selected.map( element => {
              return (
                <tr> 
                  <th>{element.name}</th>
                    {this.state.selected.map( element => {
                      return <td>data</td>;
                    } )}                  
                </tr>
              );
            } )}
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