import React, {PropTypes} from 'react';
import style from './Users.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import usersActions from '../../redux/actions/usersActions';
import {connect} from 'react-redux';

class UsersPage extends React.Component {
  constructor() {
    super();
    this.onSearchUser = this.onSearchUser.bind(this);
    this.onResetUserPassword = this.onResetUserPassword.bind(this);
  }

  onResetUserPassword() {
    var userToBeModified = this.props.users.get('userToBeModified').toObject();
    usersActions.dispatchResetUserPasswordAsync(userToBeModified.username)(this.props.dispatch, function() {
      return this.props.users;
    }.bind(this));
  }

  onSearchUser() {
    var username = this.refs['username'].value;
    usersActions.dispatchSearchUserAsync(username)(this.props.dispatch, function() {
      return this.props.users;
    }.bind(this));
  }

  render() {
    var css = this.props.css;
    var userToBeModified = this.props.users.get('userToBeModified').toObject();
    console.log(userToBeModified);
    return (
      <div className={classnames(helpers['container-mid'])}>
        <h1 className={classnames(helpers['center'])}>用户管理</h1>
        <div>
          <div className={classnames(css.newClientFormGroup)}>
            <label htmlFor="client_redirect_uri">用户名</label>
            <input ref="username" className={classnames(css.usernameInputText)} type="text"></input>
          </div>
          <button onClick={this.onSearchUser} className={classnames(helpers['successButton'])}>
            Go
          </button>
        </div>
        {userToBeModified._id
          ? <div style={{
              margin: '20px 0'
            }}>
              <div>
                {userToBeModified._id}
              </div>
              <div>
                {userToBeModified.username}
              </div>
              <div>
                {userToBeModified.email}
              </div>

              <button onClick={this.onResetUserPassword} className={classnames(helpers['errorButton'])}>
                RESET PASSWORD
              </button>
            </div>
          : ''}
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user, users: state.users};
};

UsersPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(UsersPage));
