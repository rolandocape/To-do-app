import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import tasksReducer from './tasksReducer';

const rootReducer = (history) => combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  router: connectRouter(history),
});

export default rootReducer;
