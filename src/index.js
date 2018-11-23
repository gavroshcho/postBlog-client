import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from 'reducers';
import App from "components/App";
import Welcome from 'components/Welcome';
import Signup from 'components/auth/Signup';
import Signin from 'components/auth/Signin';
import Signout from 'components/auth/Signout';
import PostsIndex from 'components/PostsIndex';
import PostsCreate from 'components/PostsCreate';
import PostsShow from 'components/PostsShow';

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("access_token") }
  },
  applyMiddleware(reduxThunk)
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/sign_up' component={Signup} />
          <Route path='/sign_in' component={Signin} />
          <Route path='/sign_out' component={Signout} />
          <Route path="/posts/new" component={PostsCreate} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path='/posts' component={PostsIndex} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);