import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, InputGroup, Input, Button } from 'reactstrap';

class Matrix extends Component {
  render () {
    return (
      <Container>
        <h1>Adjacency Matrix</h1>
        <p>
          {console.log(this.props.location.state)}
        </p>
      </Container>
    );
  }
}

export default Matrix;