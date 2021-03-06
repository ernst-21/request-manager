import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './layout/Content/Home';
import Pipeline from './modules/travelers/pages/Pipeline';
import Signin from './modules/auth/Signin';
import EditProfile from './modules/agent/EditProfile';
import PrivateRoute from './modules/auth/PrivateRoute';
import InfoSuccess from './modules/agent/InfoSuccess';
import InfoError from './components/InfoError';
import TravelerInfo from './modules/travelers/pages/TravelerInfo';
import TodoPage from './modules/travelers/pages/TodoPage';
import TodoTomorrow from './modules/travelers/pages/TodoTomorrow';
import TodoThisWeek from './modules/travelers/pages/TodoThisWeek';

const MainRouter = () => {
  return (
    <div className="site-layout-background">
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Pipeline} />
        <Route exact path="/users/todo/today" component={TodoPage} />
        <Route exact path="/users/todo/tomorrow" component={TodoTomorrow} />
        <Route exact path="/users/todo/nextFive" component={TodoThisWeek} />
        <Route path="/signin" component={Signin} />
        <Route path="/info" component={InfoSuccess} />
        <Route path='/users/:userId' component={TravelerInfo}/>
        <Route path="/info-network-error" component={InfoError} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
