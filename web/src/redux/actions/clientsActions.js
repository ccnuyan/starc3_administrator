import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import fetchHelper from './fetchHelper';

var getToken = function() {
  return window.localStorage.getItem('userToken');
};

function beforeGetClients() {
  return {
    type: actionTypes.BEFORE_GET_CLIENTS
  };
}

function afterGetClients(json) {
  return {
    type: actionTypes.AFTER_GET_CLIENTS,
    result: json
  };
}

function errorGetClients(error) {
  return {
    type: actionTypes.ERROR_GET_CLIENTS,
    error: error
  };
}

function dispatchGetClientsAsync(query) {
  return (dispatch, getState) => {
    return dispatch(getClients(query));
  };
}

function getClients(query) {
  return dispatch => {
    dispatch(beforeGetClients());
    return fetch(__ADMIN_HOST + `/clients/`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterGetClients(json)))
      .catch(error => dispatch(errorGetClients(error)));
  };
}

//createNewClient
function beforeCreateNewClient() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_CREATE_NEW_CLIENT
  };
}

function afterCreateNewClient(json) {
  return {
    type: actionTypes.AFTER_CREATE_NEW_CLIENT,
    result: json
  };
}

function errorCreateNewClient(error) {
  return {
    type: actionTypes.ERROR_CREATE_NEW_CLIENT,
    error: error
  };
}

function dispatchCreateNewClientAsync(query) {
  return (dispatch, getState) => {
    return dispatch(createNewClient(query));
  };
}

function createNewClient(query) {
  return dispatch => {
    dispatch(beforeCreateNewClient());
    return fetch(__ADMIN_HOST + `/clients/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(query.body)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterCreateNewClient(json)))
      .catch(error => dispatch(errorCreateNewClient(error)));
  };
}

//updateClient
function beforeUpdateClient() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_UPDATE_CLIENT
  };
}

function afterUpdateClient(json) {
  return {
    type: actionTypes.AFTER_UPDATE_CLIENT,
    result: json
  };
}

function errorUpdateClient(error) {
  return {
    type: actionTypes.ERROR_UPDATE_CLIENT,
    error: error
  };
}

function dispatchUpdateClientAsync(query) {
  return (dispatch, getState) => {
    return dispatch(updateClient(query));
  };
}

function updateClient(query) {
  return dispatch => {
    dispatch(beforeUpdateClient());
    return fetch(__ADMIN_HOST + `/clients/` + query.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(query.body)
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterUpdateClient(json)))
      .catch(error => dispatch(errorUpdateClient(error)));
  };
}

//onShowNewClient
function setCurrentClient(client) {
  return {
    type: actionTypes.SET_CURRENT_CLIENT,
    client:client
  };
}

export default {
  dispatchGetClientsAsync,
  dispatchCreateNewClientAsync,
  dispatchUpdateClientAsync,
  setCurrentClient,
};
