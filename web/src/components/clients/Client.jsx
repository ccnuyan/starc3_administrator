import React, {PropTypes} from 'react';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import style from './Clients.scss';
import {connect} from 'react-redux';
import classnames from 'classnames';
import clientsActions from '../../redux/actions/clientsActions';

class Client extends React.Component {
  constructor() {
    super();
    this.onSetCurrentClient = this.onSetCurrentClient.bind(this);
  }

  onSetCurrentClient() {
    this.props.dispatch(clientsActions.setCurrentClient(this.props.client));
  }

  render() {
    var client = this.props.client;
    var css = this.props.css;
    return <div className={classnames(css.client)}>
      <h3 onClick={this.onSetCurrentClient} style={{
        borderBottom: '1px solid',
        cursor: 'pointer'
      }}>{`[${client.clientType}]${client.name}`}</h3>
      <div>{`${client.clientId}--[${client._id}]`}</div>
      {client.clientType == 'bs'
        ? <div>{`domain:${client.domain}`}</div>
        : ''}
      {client.clientType == 'bs'
        ? <div style={{
            marginTop: '5px'
          }}>RedireUri:
            <span>{client.redirectUri}</span>
          </div>
        : ''}
      {client.container
        ? <div style={{
            marginTop: '5px'
          }}>
            <div>Container：</div>
            <div style={{
              marginLeft: '20px'
            }}>
              <div>Name:
                <span>{client.container.name}</span>
              </div>
              <div>Count:
                <span>{client.container.count}</span>
              </div>
              <div>Used(bytes):
                <span>{client.container.bytes}</span>
              </div>
            </div>
          </div>
        : ''
}
    </div>;
  }
}

var selector = function(state) {
  return {user: state.user, clients: state.clients};
};

export default connect(selector)(styleable(style)(Client));
