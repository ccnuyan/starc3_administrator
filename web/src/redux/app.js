import user from './reducers/userReducer.js';
import users from './reducers/usersReducer.js';
import clients from './reducers/clientsReducer.js';
import containers from './reducers/containersReducer.js';
import {
  combineReducers
}
from 'redux';

const app = combineReducers({
  user: user,
  users: users,
  clients: clients,
  containers: containers
});

export default app;
