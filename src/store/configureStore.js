import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(
      routerMiddleware(history),
    ),
  );
}