import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Home from "./pages/home.jsx";
import Feed from "./pages/feed.jsx";
import Discover from "./pages/discover.jsx";
import Classes from "./pages/classes.jsx";
import Practice from "./pages/practice.jsx";
import Settings from "./pages/settings.jsx";
import reducers from "./reducers";
import promiseMiddleware from "redux-promise";
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                    <Switch>
                        <Route path="/discover" component={Discover}/>
                        <Route path="/feed" component={Feed}/>
                        <Route path="/classes" component={Classes}/>
                        <Route path="/practice" component={Practice}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/" component={Home}/>
                        <Redirect from='*' to='/'/>
                    </Switch>
            </BrowserRouter>
        </Provider>
    ,
    document.getElementById('react'));