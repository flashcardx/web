import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Home from "./pages/home.jsx";
import Practice from "./pages/practice.jsx";
import Settings from "./pages/settings.jsx";
import Signout from "./pages/signout.jsx";
import Landing from "./pages/landing.jsx";
import reducers from "./reducers";
import {requireAuth, redirectIfAuth, validateEmail} from "./containers/authRedirect.jsx";
import Alert from "./components/util/alert.jsx";
import promiseMDW from "./middlewares/promise";
import errorHandlerMDW from "./middlewares/errorHandler.js";
import showLoadingMDW from "./middlewares/showLoading.js";
import hideLoadingMDW from "./middlewares/hideLoading.js";
import parseApiMDW from "./middlewares/parseApiResponse.js";
import successMessage from "./middlewares/successMessage.js";
import AlertContainer from "./containers/alertContainer.jsx";
import reduxThunk from 'redux-thunk';
import ReactTooltip from 'react-tooltip';
import Loading from "./containers/loading.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const createStoreWithMiddleware = applyMiddleware(showLoadingMDW, promiseMDW, reduxThunk, parseApiMDW, hideLoadingMDW, errorHandlerMDW, successMessage)(createStore);

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
       return ( <BrowserRouter>
                    <Switch>
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
                 <MuiThemeProvider>    
                    <div>
                        <AlertContainer/>
                        <ReactTooltip delayShow={500}/>
                        <Loading/>
                        <App/>
                    </div>
                </MuiThemeProvider>
        </Provider>
    ,
    document.getElementById('react'));
