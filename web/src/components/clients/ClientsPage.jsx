import React, {PropTypes} from 'react';
import style from './Clients.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import clientsActions from '../../redux/actions/clientsActions';
import {connect} from 'react-redux';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import NewClientForm from './NewClientForm';

class ClientsPage extends React.Component {
  constructor() {
    super();
    this.onSwitchEditStatus = this.onSwitchEditStatus.bind(this);
  }
  componentWillMount() {
    clientsActions.dispatchGetClientsAsync()(this.props.dispatch, function() {
      return this.props.clients;
    }.bind(this));
  }

  onSwitchEditStatus() {
    this.props.dispatch(clientsActions.switchEditStatus());
  }

  render() {
    var css = this.props.css;
    var clients = this.props.clients.get('clients').toObject();
    var clientToBeModified = this.props.clients.get('clientToBeModified').toObject();
    return (
      <div className={classnames(helpers['container-mid'])}>
        <h1 className={classnames(helpers['center'])}>租户管理</h1>
        <div className={classnames(helpers['grid-parent'])}>
          <div className={classnames(helpers['grid-child'], css.clientList)}>
            <ClientList clients={clients}></ClientList>
          </div>
          <div className={classnames(helpers['grid-child'], css.newClient)}>
            {clientToBeModified._id
              ? <ClientForm client ={clientToBeModified}></ClientForm>
              : ''}
            <NewClientForm></NewClientForm>
          </div>
        </div>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user, clients: state.clients};
};

ClientsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(ClientsPage));
