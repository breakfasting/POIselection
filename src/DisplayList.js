import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import displayData from './data/scenic_spot_C_f.json';

class DisplayList extends Component {
  render() {
    let results = displayData.XML_Head.Infos.Info;
    let filtered = results.filter(item => {
      return item.Name.indexOf(this.props.filterText) > -1;
      // return true;
    });
    return (
      <div>
        <ListGroup className="text-left mt-1 shadow-sm">
          {filtered.slice(0,5).map(
            elements => {
              return(
                <ListGroupItem key={elements.Id} tag="a" href="#" action onClick = {(e) => this.props.addPOI(elements.Id)}>
                  <ListGroupItemHeading>{elements.Name}</ListGroupItemHeading>
                  <ListGroupItemText className="text-truncate">
                    {elements.Toldescribe}
                  </ListGroupItemText>
                </ListGroupItem>
              ) 
            }
          )}
        </ListGroup>

        {/* {console.log(displayData.XML_Head.Infos.Info)} */}
      </div>
    );
  }
}

export default DisplayList;