import React, {PropTypes} from 'react';
import style from './Clients.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import clientsActions from '../../redux/actions/clientsActions';
import {connect} from 'react-redux';
import _ from 'lodash';

class ClientForm extends React.Component {
  constructor() {
    super();
    this.onUpdateClient = this.onUpdateClient.bind(this);
    this.switchChangePassword = this.switchChangePassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      changePassword: false,
      client: {}
    };
  }

  onChange() {
    this.state.client.name = this.refs['client_name'].value;
    this.state.client.domain = this.refs['client_domain'].value;
    this.state.client.redirectUri = this.refs['client_redirect_uri'].value;
    this.setState({client: this.state.client});
  }

  onSelect() {
    this.state.client.clientType = this.refs['client_type'].value;
    this.setState({client: this.state.client});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.client._id && this.props.client._id != nextProps.client._id) {
      this.setState({
        client: _.clone(nextProps.client)
      });
    }
    return true;
  }

  onUpdateClient() {
    event.preventDefault();
    if (this.state.changePassword) {
      this.state.client.clientSecret = this.refs['client_secret'].value;
    }
    var client = this.state.client;

    clientsActions.dispatchUpdateClientAsync({id: this.props.client._id, body: client})(this.props.dispatch, function() {
      return this.props.clients;
    }.bind(this));
  }

  componentWillMount() {
    this.setState({
      client: _.clone(this.props.client)
    });
  }

  switchChangePassword() {
    this.setState({
      changePassword: !this.state.changePassword
    });
  }

  render() {
    var css = this.props.css;
    var client = this.state.client;
    return <div>
      <h3 style={{
        borderBottom: '1px solid'
      }}>{this.props.client.name}</h3>
      <div>
        <div className={classnames(css.newClientFormGroup)}>
          <div style={{
            margin: '5px 0'
          }} value={this.props.client._id} id="_id" ref="_id">{client._id}</div>
        </div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_id">应用ID</label>
          <div style={{
            margin: '5px 0'
          }} type="text">{`${client.clientId}[${client.clientType}]`}</div>
        </div>
        <div className={classnames(css.newClientFormGroup)}>
          <label htmlFor="client_name">应用名</label>
          <input onChange={this.onChange} value={client.name} id="client_name" ref="client_name" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
        </div>
        <div>
          <input style={{margin:'10px'}} type="checkbox" onClick={this.switchChangePassword} value={this.state.changePassword}/>
          <span>修改密码</span>
        </div>
        {this.state.changePassword
          ? <div className={classnames(css.newClientFormGroup)}>
              <label htmlFor="client_secret">应用密钥</label>
              <input onChange={this.onChange} type="password" id="client_secret" ref="client_secret" className={classnames(css.clientInputText, css.newClientInput)}></input>
            </div>
          : ''
        }
        {this.state.client.clientType === 'bs'
          ? <div className={classnames(css.newClientFormGroup)}>
              <label htmlFor="client_domain">应用域</label>
              <input onChange={this.onChange} value={client.domain} id="client_domain" ref="client_domain" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
            </div>
          : ''
        }
        {this.state.client.clientType === 'bs'
          ? <div className={classnames(css.newClientFormGroup)}>
              <label htmlFor="client_redirect_uri">应用回调地址</label>
              <input onChange={this.onChange} value={client.redirectUri} id="client_redirect_uri" ref="client_redirect_uri" className={classnames(css.clientInputText, css.newClientInput)} type="text"></input>
            </div>
          : ''
        }
        <button onClick={this.onUpdateClient} className={classnames(helpers['successButton'])}>
          <i className={classnames('fa', 'fa-check')}></i>
        </button>
      </div>
    </div>;
  }
}

var selector = function(state) {
  return {user: state.user, clients: state.clients};
};

export default connect(selector)(styleable(style)(ClientForm));
