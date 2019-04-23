import { AUTHENTICATE, REFRESH_SESSION, SIGN_OUT } from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case AUTHENTICATE:
      authenticate(action.payload.credentials);

      return Object.assign({}, state, {
        redirectToReferrer: true,
        credentials: action.payload.credentials,
        isAuthenticated: true,
      });
    case REFRESH_SESSION:
      const credentials = refreshSession();
      const isAuth = isAuthenticated();

      return Object.assign({}, state, {
        redirectToReferrer: isAuth,
        credentials,
        isAuthenticated: isAuth,
      });
    case SIGN_OUT:
      signout();

      return Object.assign({}, state, {
        redirectToReferrer: true,
        credentials: {},
        isAuthenticated: false,
      });
    default:
      return state;
  }
}

export function authenticate(credentials) {
  sessionStorage.setItem('authUser', JSON.stringify(credentials));
}

export function signout() {
  sessionStorage.removeItem('authUser');
}

export function refreshSession() {
  const authUser = sessionStorage.getItem('authUser');
  if (!authUser || authUser === 'undefined') {
    return {};
  }
  return JSON.parse(authUser);
}

export function isAuthenticated() {
  const authUser = sessionStorage.getItem('authUser');
  if (!authUser || authUser === 'undefined') {
    return false;
  }

  const { userName, password } = JSON.parse(authUser);
  return !!(userName && password);
}
