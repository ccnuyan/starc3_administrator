import React, {PropTypes} from 'react';
import Container from './Container';
import _ from 'lodash';

class ContainerList extends React.Component {
  render() {
    var createContainerRow = function(key) {
      var container = this.props.containers[key];
      return (
        <Container key={key} container={container.toObject()}></Container>
      );
    }.bind(this);

    return <div>
      {_.sortBy(Object.keys(this.props.containers), key => key).map(createContainerRow)}
    </div>;
  }
}

export default ContainerList;
