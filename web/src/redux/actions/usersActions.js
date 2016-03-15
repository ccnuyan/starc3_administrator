import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import fetchHelper from './fetchHelper';

var getToken = function() {
  return window.localStorage.getItem('userToken');
};

function beforeSearchUser() {
  return {
    type: actionTypes.BEFORE_SEARCH_USER
  };
}

function afterSearchUser(json) {
  return {
    type: actionTypes.AFTER_SEARCH_USER,
    result: json
  };
}

function errorSearchUser(error) {
  return {
    type: actionTypes.ERROR_SEARCH_USER,
    error: error
  };
}

function dispatchSearchUserAsync(username) {
  return (dispatch, getState) => {
    return dispatch(searchUser(username));
  };
}

function searchUser(username) {
  return dispatch => {
    dispatch(beforeSearchUser());
    return fetch(__ADMIN_HOST + `/users/?username=${username}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterSearchUser(json)))
      .catch(error => dispatch(errorSearchUser(error)));
  };
}



function beforeResetUserPassword() {
  return {
    type: actionTypes.BEFORE_RESET_USER_PASSWORD
  };
}

function afterResetUserPassword(json) {
  return {
    type: actionTypes.AFTER_RESET_USER_PASSWORD,
    result: json
  };
}

function errorResetUserPassword(error) {
  return {
    type: actionTypes.ERROR_RESET_USER_PASSWORD,
    error: error
  };
}

function dispatchResetUserPasswordAsync(username) {
  return (dispatch, getState) => {
    return dispatch(resetUserPassword(username));
  };
}

function resetUserPassword(username) {
  return dispatch => {
    dispatch(beforeResetUserPassword());
    return fetch(__ADMIN_HOST + `/users/?username=${username}`, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterResetUserPassword(json)))
      .catch(error => dispatch(errorResetUserPassword(error)));
  };
}


export default {
  dispatchSearchUserAsync,
  dispatchResetUserPasswordAsync,
};
