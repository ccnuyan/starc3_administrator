import React, {PropTypes} from 'react';
import styleable from 'react-styleable';
import helpers from '../../helpers.scss';
import style from './Containers.scss';
import {connect} from 'react-redux';
import classnames from 'classnames';
import containersActions from '../../redux/actions/containersActions';
import _ from 'lodash';

class Container extends React.Component {
  constructor() {
    super();
    this.onRemoveContainer = this.onRemoveContainer.bind(this);
  }

  onRemoveContainer() {
    event.preventDefault();
    containersActions.dispatchRemoveContainerAsync(this.props.container.name)(this.props.dispatch, function() {
      return this.props.containers;
    }.bind(this));
  }

  render() {
    var container = this.props.container;
    var css = this.props.css;
    return <div className={classnames(css.container)}>
      <h3 style={{
        borderBottom: '1px solid',
        cursor: 'pointer'
      }}>{`${container.name}`}
      </h3>
      {_.startsWith(container.name, 'starc3_') || _.startsWith(container.name, 'iccnu-') || _.endsWith(container.name, '_test')
        ? <div className={helpers['float-right']}>
            <button onClick={this.onRemoveContainer} className={classnames(helpers['errorButton'])}>
              <i className={classnames('fa', 'fa-remove')}></i>
            </button>
          </div>
        : ''}
      <div>Name:
        <span>{container.name}</span>
      </div>
      <div>Count:
        <span>{container.count}</span>
      </div>
      <div>Used(bytes):
        <span>{container.bytes}</span>
      </div>
    </div>;
  }
}

var selector = function(state) {
  return {user: state.user, containers: state.containers};
};

export default connect(selector)(styleable(style)(Container));
