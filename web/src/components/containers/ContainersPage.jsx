import React, {PropTypes} from 'react';
import style from './Containers.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import containersActions from '../../redux/actions/containersActions';
import {connect} from 'react-redux';
import ContainerList from './ContainerList';
import NewContainerForm from './NewContainerForm';

class ContainersPage extends React.Component {
  constructor() {
    super();
    this.onSwitchEditStatus = this.onSwitchEditStatus.bind(this);
  }
  componentWillMount() {
    containersActions.dispatchGetContainersAsync()(this.props.dispatch, function() {
      return this.props.containers;
    }.bind(this));
  }

  onSwitchEditStatus() {
    this.props.dispatch(containersActions.switchEditStatus());
  }

  render() {
    var css = this.props.css;
    var containers = this.props.containers.get('containers').toObject();
    return (
      <div className={classnames(helpers['container-mid'])}>
        <h1 className={classnames(helpers['center'])}>容器管理</h1>
        <div className={classnames(helpers['grid-parent'])}>
          <div className={classnames(helpers['grid-child'], css.containerList)}>
            <ContainerList containers={containers}></ContainerList>
          </div>
          <div className={classnames(helpers['grid-child'], css.newContainer)}>
            <NewContainerForm></NewContainerForm>
          </div>
        </div>
      </div>
    );
  }
}

var selector = function(state) {
  return {user: state.user, containers: state.containers};
};

ContainersPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(selector)(styleable(style)(ContainersPage));
