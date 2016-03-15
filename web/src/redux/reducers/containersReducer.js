import immutable from 'immutable';
import actionTypes from '../actionTypes';
import myHumane from '../../service/myHumane';
var storage = window.localStorage;

var CONTAINERS_STATE = immutable.fromJS({
  containers: immutable.Map({}),
  loading: false,
});

var containersReducer = function(state = CONTAINERS_STATE, action) {
  switch (action.type) {
    //Get root
    case actionTypes.BEFORE_GET_CONTAINERS:
      state = state.set('containers', immutable.Map({}));
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_GET_CONTAINERS:
      action.result.forEach(function(container) {
        state = state.setIn(['containers', container.name], immutable.Map(container));
      });

      state = state.set('loading', false);
      return state;
    case actionTypes.ERROR_GET_CONTAINERS:
      state = state.set('containers', immutable.Map({}));
      state = state.set('loading', true);
      return state;

      return state;
    case actionTypes.BEFORE_CREATE_NEW_CONTAINER:
      state = state.set('loading', true);
      return state;

      case actionTypes.AFTER_CREATE_NEW_CONTAINER:
      state = state.set('loading', true);
      myHumane.info('成功，请刷新');
      return state;

    case actionTypes.ERROR_CREATE_NEW_CONTAINER:
      state = state.set('loading', true);
      myHumane.error('失败');
      return state;

      //Get root
    case actionTypes.BEFORE_REMOVE_CONTAINER:
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_REMOVE_CONTAINER:
      state = state.setIn(['containers', action.result.name], immutable.Map(action.result));
      state = state.set('loading', false);
      myHumane.info('成功,请刷新');
      return state;
    case actionTypes.ERROR_REMOVE_CONTAINER:
      state = state.set('loading', true);
      myHumane.error('失败');
      return state;

    default:
      return state;
  }
};

export default containersReducer;
