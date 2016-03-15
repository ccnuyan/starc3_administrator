import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import fetchHelper from './fetchHelper';

//initialize
function beforeIntialize() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_INITIALIZE
  };
}

function afterIntialize(json) {
  return {
    type: actionTypes.AFTER_INITIALIZE,
    result: {
      payload: json
    }
  };
}

function errorIntialize(error) {
  return {
    type: actionTypes.ERROR_INITIALIZE,
    error: error
  };
}

function dispatchIntializeAsync() {
  return (dispatch, getState) => {
    return dispatch(initialize());
  };
}

function initialize() {
  return dispatch => {
    dispatch(beforeIntialize());
    var token = window.localStorage.getItem('userToken');
    return fetch(__HOST + `/user/info`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterIntialize(json)))
      .catch(error => dispatch(errorIntialize(error)));
  };
}

//logout
function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}

export default {
  dispatchIntializeAsync: dispatchIntializeAsync,
  logout: logout
};
