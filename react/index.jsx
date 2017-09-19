import React, {Component} from "react";
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
import Signout from "./pages/signout.jsx";
import Landing from "./pages/landing.jsx";
import reducers from "./reducers";
import {requireAuth, redirectIfAuth, validateEmail} from "./containers/authRedirect.jsx";
import Alert from "./components/alert.jsx";
import promiseMDW from "./middlewares/promise";
import errorHandlerMDW from "./middlewares/errorHandler.js";
import parseApiMDW from "./middlewares/parseApiResponse.js";
import AlertsDisplay from "./containers/alertsDisplay.jsx";
import reduxThunk from 'redux-thunk';
import ReactTooltip from 'react-tooltip';

const createStoreWithMiddleware = applyMiddleware(promiseMDW, reduxThunk, parseApiMDW, errorHandlerMDW)(createStore);
class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
       return ( <BrowserRouter>
                    <Switch>
                        <Route path="/discover" component={requireAuth(Discover, "/landing")}/>
                        <Route path="/feed" component={requireAuth(Feed, "/landing")}/>
                        <Route path="/classes" component={requireAuth(Classes, "/landing")}/>
                        <Route path="/practice" component={requireAuth(Practice, "/landing")}/>
                        <Route path="/settings" component={requireAuth(Settings, "/landing")}/>
                        <Route path="/email-verification/:id" component={validateEmail(Landing, "/landing")}/>
                        <Route path="/landing" component={redirectIfAuth(Landing, "/")}/>
                        <Route path="/signout" component={Signout}/>
                        <Route path="/" component={requireAuth(Home, "/landing")}/>
                        <Redirect from='*' to='/'/>
                    </Switch>
            </BrowserRouter>
       );
    }
}

ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <div>
                <AlertsDisplay/>
                <ReactTooltip delayShow={500}/>
                <App/>
            </div>
        </Provider>
    ,
    document.getElementById('react'));
