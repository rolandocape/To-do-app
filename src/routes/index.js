import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Login from '../components/Login/Login';
import Tasks from '../components/Tasks/Tasks';
import PrivateRoute from './PrivateRoute';

const routes = (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Tasks}/>
      <Route path="/login" component={Login}/>
      <Redirect to="/"/>
    </Switch>
  </div>
);

export default routes;