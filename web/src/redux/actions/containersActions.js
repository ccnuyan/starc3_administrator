import actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import fetchHelper from './fetchHelper';

var getToken = function() {
  return window.localStorage.getItem('userToken');
};

function beforeGetContainers() {
  return {
    type: actionTypes.BEFORE_GET_CONTAINERS
  };
}

function afterGetContainers(json) {
  return {
    type: actionTypes.AFTER_GET_CONTAINERS,
    result: json
  };
}

function errorGetContainers(error) {
  return {
    type: actionTypes.ERROR_GET_CONTAINERS,
    error: error
  };
}

function dispatchGetContainersAsync(query) {
  return (dispatch, getState) => {
    return dispatch(getContainers(query));
  };
}

function getContainers(query) {
  return dispatch => {
    dispatch(beforeGetContainers());
    return fetch(__ADMIN_HOST + `/containers/`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then(fetchHelper.checkStatus)
      .then(fetchHelper.parseJSON)
      .then(json => dispatch(afterGetContainers(json)))
      .catch(error => dispatch(errorGetContainers(error)));
  };
}

//createNewContainer
function beforeCreateNewContainer() {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_CREATE_NEW_CONTAINER
  };
}

function afterCreateNewContainer(json) {
  return {
    type: actionTypes.AFTER_CREATE_NEW_CONTAINER,
    result: json
  };
}

function errorCreateNewContainer(error) {
  return {
    type: actionTypes.ERROR_CREATE_NEW_CONTAINER,
    error: error
  };
}

function dispatchCreateNewContainerAsync(query) {
  return (dispatch, getState) => {
    return dispatch(createNewContainer(query));
  };
}

function createNewContainer(query) {
  return dispatch => {
    dispatch(beforeCreateNewContainer());
    return fetch(__ADMIN_HOST + `/containers/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(query.body)
      })
      .then(fetchHelper.checkStatus)
      .then(json => dispatch(afterCreateNewContainer(json)))
      .catch(error => dispatch(errorCreateNewContainer(error)));
  };
}

//removeContainer
function beforeRemoveContainer(query) {
  var type = actionTypes;
  return {
    type: actionTypes.BEFORE_REMOVE_CONTAINER,
    query: query,
  };
}

function afterRemoveContainer(json) {
  return {
    type: actionTypes.AFTER_REMOVE_CONTAINER,
    result: json
  };
}

function errorRemoveContainer(error) {
  return {
    type: actionTypes.ERROR_REMOVE_CONTAINER,
    error: error
  };
}

function dispatchRemoveContainerAsync(query) {
  return (dispatch, getState) => {
    return dispatch(removeContainer(query));
  };

  return Promise.resolve();
}

function removeContainer(query) {
  return dispatch => {
    dispatch(beforeRemoveContainer(query));
    return fetch(__ADMIN_HOST + `/containers/${query}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then(fetchHelper.checkStatus)
      .then(json => dispatch(afterRemoveContainer(json)))
      .catch(error => dispatch(errorRemoveContainer(error)));
  };
}

//onShowNewContainer
function setCurrentContainer(container) {
  return {
    type: actionTypes.SET_CURRENT_CONTAINER,
    container: container
  };
}

export default {
  dispatchGetContainersAsync,
  dispatchCreateNewContainerAsync,
  dispatchRemoveContainerAsync,
  setCurrentContainer,
};
