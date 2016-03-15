import immutable from 'immutable';
import actionTypes from '../actionTypes';
import myHumane from '../../service/myHumane';
var storage = window.localStorage;

var CLIENTS_STATE = immutable.fromJS({
  clients: immutable.Map({}),
  loading: false,
  clientToBeModified: immutable.Map({}),
});

var clientsReducer = function(state = CLIENTS_STATE, action) {
  switch (action.type) {
    //Get root
    case actionTypes.BEFORE_GET_CLIENTS:
      state = state.set('clients', immutable.Map({}));
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_GET_CLIENTS:
      action.result.forEach(function(client) {
        state = state.setIn(['clients', client._id], immutable.Map(client));
      });

      state = state.set('errorMessage', '');
      state = state.set('loading', false);
      return state;
    case actionTypes.ERROR_GET_CLIENTS:
      state = state.set('clients', immutable.Map({}));
      state = state.set('loading', true);
      return state;

      //clientToBeModified
    case actionTypes.SET_CURRENT_CLIENT:
      state = state.set('clientToBeModified', immutable.Map(action.client));
      return state;
      //Get root
    case actionTypes.BEFORE_CREATE_NEW_CLIENT:
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_CREATE_NEW_CLIENT:
      state = state.setIn(['clients', action.result._id], immutable.Map(action.result));
      state = state.set('loading', false);
      myHumane.info('成功');

      return state;
    case actionTypes.ERROR_CREATE_NEW_CLIENT:
      state = state.set('loading', true);
      myHumane.error('失败');
      return state;

      //Get root
    case actionTypes.BEFORE_UPDATE_CLIENT:
      state = state.set('loading', true);
      return state;
    case actionTypes.AFTER_UPDATE_CLIENT:
      state = state.setIn(['clients', action.result._id], immutable.Map(action.result));
      state = state.set('loading', false);
      myHumane.info('成功');
      return state;
    case actionTypes.ERROR_UPDATE_CLIENT:
      state = state.set('loading', true);
      myHumane.error('失败');
      return state;

    default:
      return state;
  }
};

export default clientsReducer;
