import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Home from "./pages/home.jsx";
import Settings from "./pages/settings.jsx";
import Master from "./pages/master.jsx";
import GetPromocode from "./pages/getPromocode.jsx";
import Signout from "./pages/signout.jsx";
import Landing from "./pages/landing.jsx";
import Signin from "./pages/signin.jsx";
import Signup from "./pages/signup.jsx";
import PracticeMethodChooser from "./pages/practice/methodChooser.jsx";
import PracticeDeckChooser from "./pages/practice/deckChooser.jsx";
import PracticeSpacedRepetition from "./pages/practice/spacedRepetition.jsx";
import reducers from "./reducers";
import {requireAuth, redirectIfAuth, validateEmail} from "./containers/authRedirect.jsx";
import promiseMDW from "./middlewares/promise";
import errorHandlerMDW from "./middlewares/errorHandler.js";
import showLoadingMDW from "./middlewares/showLoading.js";
import hideLoadingMDW from "./middlewares/hideLoading.js";
import parseApiMDW from "./middlewares/parseApiResponse.js";
import successMessage from "./middlewares/successMessage.js";
import AlertContainer from "./containers/alertContainer.jsx";
import reduxThunk from 'redux-thunk';
import ReactTooltip from 'react-tooltip';
import Loading from './containers/loading.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const createStoreWithMiddleware = applyMiddleware(showLoadingMDW, promiseMDW, reduxThunk, parseApiMDW, hideLoadingMDW, errorHandlerMDW, successMessage)(createStore);

class App extends Component{
 
    render(){
       return ( <BrowserRouter>
                    <Switch>
                        <Route path="/practice/spaced-repetition/:deckId" component={requireAuth(PracticeSpacedRepetition, "/landing")}/>
                        <Route path="/practice/:method" component={requireAuth(PracticeDeckChooser, "/landing")}/>
                        <Route path="/practice" component={requireAuth(PracticeMethodChooser, "/landing")}/>
                        <Route path="/settings" component={requireAuth(Settings, "/landing")}/>
                        <Route path="/getpromocode" component={requireAuth(GetPromocode, "/landing")}/>
                        <Route path="/master" component={requireAuth(Master, "/landing")}/>
                        <Route path="/email-verification/:id" component={validateEmail(Signin, "/landing")}/>
                        <Route path="/signout" component={Signout}/>
                        <Route path="/landing" component={redirectIfAuth(Landing, "/")}/>
                        <Route path="/signin" component={redirectIfAuth(Signin, "/")}/>
                        <Route path="/signup" component={redirectIfAuth(Signup, "/")}/>
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
