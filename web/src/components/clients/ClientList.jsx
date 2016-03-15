import React, {PropTypes} from 'react';
import Client from './Client';

class ClientList extends React.Component {
  render() {
    var createClientRow = function(key) {
      var client  = this.props.clients[key];
      return (
        <Client key={key} client={client.toObject()}></Client>
      );
    }.bind(this);

    return <div>
      {Object.keys(this.props.clients).map(createClientRow)}
    </div>;
  }
}

export default ClientList;
