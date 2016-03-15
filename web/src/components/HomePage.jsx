import React, {PropTypes} from 'react';
import style from './HomePage.scss';
import styleable from 'react-styleable';
import helpers from '../helpers.scss';
import classnames from 'classnames';
import backgroundImage from '../resource/background.jpg';

class HomePage extends React.Component {

  constructor() {
    super();
    this.goto = this.goto.bind(this);
  }

  goto(e) {
    this.context.router.push({pathname: e.target.dataset['target'], query: this.props.location.query});
  }

  render() {
    var css = this.props.css;
    return (
      <div className={css.home}>
        <div style={{
          backgroundImage: 'Url("' + backgroundImage + '")'
        }} className={classnames(css.backgroundBlockHome, helpers['background-block'])}>
          <div className={classnames(css.infoBlock, helpers['center'])}>
            <h1 className={css.homeHeading}>starC 3 - Admin</h1>
            <button data-target="/admin/users" onClick={this.goto} className={classnames(helpers['button-hollow'], css.getMore, helpers['center'])}>用户管理</button>
            <button data-target="/admin/clients" onClick={this.goto} className={classnames(helpers['button-hollow'], css.getMore, helpers['center'])}>租户管理</button>
            <button data-target="/admin/containers" onClick={this.goto} className={classnames(helpers['button-hollow'], css.getMore, helpers['center'])}>容器管理</button>
          </div>
          <div className={helpers['overlay']}></div>
        </div>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default styleable(style)(HomePage);
