import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge} from 'reactstrap';
import displayData from './data/scenic_spot_C_f.json';

function TopBar(props) {
  if (props.results > 0) {
    return (
      <ListGroupItem color="success" >
        Showing results for '{props.text == '' ? 'any' : props.text}', <Badge color="success">{props.results > 5 ? '1-5' : '1-' + props.results }</Badge> of a total of <Badge color="success">{props.results}</Badge> results.
      </ListGroupItem>
    );
  }
  return (
    <ListGroupItem color="danger">
      No results for '{props.text}'.
    </ListGroupItem>
  );
}

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
          <TopBar results={filtered.length} text={this.props.filterText} />
          {filtered.slice(0,5).map(
            elements => {
              return(
                <ListGroupItem key={elements.Id} tag="a" href="#" action onClick = {(e) => this.props.addPOI({id: elements.Id, name: elements.Name})}>
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