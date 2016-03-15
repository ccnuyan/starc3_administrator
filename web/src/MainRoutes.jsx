import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import ClientsPage from './components/clients/ClientsPage';
import ContainersPage from './components/containers/ContainersPage';
import UsersPage from './components/users/UsersPage';
import NotFoundPage from './components/common/NotFoundPage';
import userActions from './redux/actions/userActions';

import {createHistory, useBasename} from 'history';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import humane from './service/myHumane';

class MainRoutes extends React.Component {
  constructor() {
    super();
    this.onEnter = this.onEnter.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  onEnter(nextState, replace, callback) {
    var payload,
      isInitializing;
    var check = function() {
      payload = this.props.user.get('payload').toObject();
      isInitializing = this.props.user.get('isInitializing');

      if (payload.username) {
        if (payload.username === 'ccnuyan') {
          callback();
        } else {
          humane.error('你不是管理员');
          replace({
            pathname:'/admin/home',
            query: nextState.location.query
          });
          callback();
        }
      } else if (isInitializing) {
        setTimeout(check, 100);
      } else {
        if (window.location.search) {
          window.location = '/login' + window.location.search + '&callback=' + window.location.pathname;
        } else {
          window.location = '/login?callback=' + window.location.pathname;
        }
      }
    }.bind(this);

    check();
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="admin/" component={App}>
          <IndexRoute components={HomePage}/>
          <Route name="home" path="home" components={HomePage}/>
          <Route onEnter={this.onEnter} path="clients" components={ClientsPage}/>
          <Route onEnter={this.onEnter} path="containers" components={ContainersPage}/>
          <Route onEnter={this.onEnter} path="users" components={UsersPage}/>
          <Route path="*" components={NotFoundPage}/>
        </Route>
      </Router>
    );
  }
}
var selector = function(state) {
  return {user: state.user};
};
export default connect(selector)(MainRoutes);
