import immutable from 'immutable';
import actionTypes from '../actionTypes';
import myHumane from '../../service/myHumane';
var storage = window.localStorage;

var USERS_STATE = immutable.fromJS({
  userToBeModified: immutable.Map({}),
});

var usersReducer = function(state = USERS_STATE, action) {
  switch (action.type) {
    //Get root
    case actionTypes.BEFORE_SEARCH_USER:
      state = state.set('userToBeModified', immutable.Map({}));
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_SEARCH_USER:
      state = state.set('userToBeModified', immutable.Map(action.result));
      state = state.set('loading', false);
      return state;
    case actionTypes.ERROR_SEARCH_USER:
      state = state.set('userToBeModified', immutable.Map({}));
      state = state.set('loading', true);
      return state;

      //Get root
    case actionTypes.BEFORE_RESET_USER_PASSWORD:
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_RESET_USER_PASSWORD:
      state = state.set('loading', false);
      myHumane.info('成功');
      return state;
    case actionTypes.ERROR_RESET_USER_PASSWORD:
      state = state.set('loading', true);
      myHumane.error('失败');
      return state;

    default:
      return state;
  }
};

export default usersReducer;
