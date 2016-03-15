import React, {PropTypes} from 'react';
import style from './Containers.scss';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import classnames from 'classnames';
import containersActions from '../../redux/actions/containersActions';
import {connect} from 'react-redux';

class NewContainerForm extends React.Component {

  constructor(){
    super();
    this.onCreateNewContainer = this.onCreateNewContainer.bind(this);
  }

  onCreateNewContainer() {
    event.preventDefault();
    var containername = this.refs['container_name'].value;
    containersActions.dispatchCreateNewContainerAsync({body:{name:containername}})(this.props.dispatch, function() {
      return this.props.containers;
    }.bind(this));
  }

  render() {
    var css = this.props.css;
    return <div>
      <h3 style={{
        borderBottom: '1px solid'
      }}>{'新容器'}</h3>
      <div>
        <div className={classnames(css.newContainerFormGroup)}>
          <label htmlFor="container_name">容器名</label>
          <input ref="container_name" className={classnames(css.containerInputText)} type="text"></input>
        </div>
        <button onClick={this.onCreateNewContainer} className={classnames(helpers['successButton'])}>
          <i className={classnames('fa', 'fa-check')}></i>
        </button>
      </div>
    </div>;
  }
}

var selector = function(state) {
  return {user: state.user, containers: state.containers};
};

export default connect(selector)(styleable(style)(NewContainerForm));
