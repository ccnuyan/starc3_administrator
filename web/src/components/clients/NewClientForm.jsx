import React, {PropTypes} from 'react';
import style from './Clients.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import clientsActions from '../../redux/actions/clientsActions';
import {connect} from 'react-redux';

class NewClientForm extends React.Component {
  constructor() {
    super();
    this.onCreateNewClient = this.onCreateNewClient.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      client: {
        clientType: 'bs'
      }
    };
  }

  onChange() {
    this.state.client.name = this.refs['client_name'].value;
    if (this.refs['client_domain']) {
      this.state.client.domain = this.refs['client_domain'].value;
    }
    this.state.client.clientSecret = this.refs['client_secret'].value;
    if (this.refs['client_redirect_uri']) {
      this.state.client.redirectUri = this.refs['client_redirect_uri'].value;
    }
    this.state.client.clientId = this.refs['client_id'].value;
    this.setState({client: this.state.client});
  }

  onSelect() {
    this.state.client.clientType = this.refs['client_type'].value;
    this.setState({client: this.state.client});
  }

  onCreateNewClient() {
    event.preventDefault();
    var client = _.clone(this.state.client);

    if (client.clientType === 'cs') {
      delete client.redirectUri;
      delete client.domain;
    }

    clientsActions.dispatchCreateNewClientAsync({body: client})(this.props.dispatch, function() {
      return this.props.clients;
    }.bind(this));
  }

  render() {
    var css = this.props.css;
    var modify = this.props.mode === 'modify';
    var create = this.props.mode === 'create';
    var client = this.state.client;
    return <div>
      <h3 style={{
        borderBottom: '1px solid'
      }}>{'新应用'}</h3>
      <div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_id">应用ID</label>
          <input onChange={this.onChange} value={client.clientId} id="client_id" ref="client_id" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
        </div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_name">应用名</label>
          <input onChange={this.onChange} value={client.name} id="client_name" ref="client_name" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
        </div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_secret">应用密钥</label>
          <input onChange={this.onChange} value={client.clientSecret} type="password" id="client_secret" ref="client_secret" className={classnames(css.clientInputText, css.newClientInput)}></input>
        </div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_type">应用类型</label>
          <div style={{
            margin: '10px 0'
          }}>
            <select ref="client_type" onChange={this.onSelect} value={client.clientType} name="client_type">
              <option value="bs">bs</option>
              <option value="cs">cs</option>
            </select>
          </div>
        </div>
        {this.state.client.clientType == 'bs'
          ? <div className={classnames(css.newClientFormGroup)}>
              <label htmlFor="client_domain">应用域</label>
              <input onChange={this.onChange} id="client_domain" ref="client_domain" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
            </div>
          : ''}
        {this.state.client.clientType == 'bs'
          ? <div className={classnames(css.newClientFormGroup)}>
              <label htmlFor="client_redirect_uri">应用回调地址</label>
              <input onChange={this.onChange} value={client.redirectUri} id="client_redirect_uri" ref="client_redirect_uri" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
            </div>
          : ''}
        <button onClick={this.onCreateNewClient} className={classnames(helpers['successButton'])}>
          <i className={classnames('fa', 'fa-check')}></i>
        </button>
      </div>
    </div>;
  }
}

var selector = function(state) {
  return {user: state.user, clients: state.clients};
};

export default connect(selector)(styleable(style)(NewClientForm));
