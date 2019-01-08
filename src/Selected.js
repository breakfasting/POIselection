import React, { Component } from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, Badge
} from 'reactstrap';

class Selected extends Component {
  render() {
    return (
      <CardColumns>
        {this.props.selected.map(elements => {
          return (
            <Card key={elements.id} >
              <CardImg top width="100%" src={elements.pic === null ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=NoImage&w=318&h=180" : elements.pic} alt="Card image cap" onError={(e)=>{e.target.onerror = null; e.target.src="https://placeholdit.imgix.net/~text?txtsize=33&txt=LinkDead&w=318&h=180"}} />
              
              <CardBody>
                <CardTitle className="font-weight-bold">{elements.name}</CardTitle>
                <CardSubtitle>{elements.add}</CardSubtitle>
                <CardText className="text-muted">{elements.desc.substring(0,30)}</CardText>
                {(elements.od) ? <div><Badge color="primary">Origin</Badge> <Badge color="success">Destination</Badge></div> : <Button close onClick={(e) => this.props.deletePOI(elements.id)}/>}
                
              </CardBody>
            </Card>
          )
        })}
      </CardColumns>
    );
  }
}

export default Selected;