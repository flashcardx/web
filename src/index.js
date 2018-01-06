import React, {Component} from "react";
// eslint-disable-next-line 
import "./css/general.css";
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
import Loading from './containers/loading.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from "./registerServiceWorker";
import Footer from "./components/footer.jsx"
import ReactTooltip from 'react-tooltip';
import AddToHomeScreen from './components/util/iosAddToHome';
import SAlert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-default.css';
const createStoreWithMiddleware = applyMiddleware(reduxThunk, showLoadingMDW, promiseMDW, parseApiMDW, hideLoadingMDW, errorHandlerMDW, successMessage)(createStore);


class App extends Component{

    constructor(props){
        super(props)
        this.googleSignin = this.googleSignin.bind(this)
    }

    componentDidMount(){
        window.onGoogleYoloLoad = (googleyolo) => {
            console.log("The 'googleyolo' object is ready");
            this.googleSignin();
            // The 'googleyolo' object is ready for use.
        };
    }

    googleSignin(){
        const retrievePromise = googleyolo.retrieve({
            supportedAuthMethods: [
              "https://accounts.google.com",
              "googleyolo://id-and-password"
            ],
            supportedIdTokenProviders: [
              {
                uri: "https://accounts.google.com",
                clientId: GOOGLE_CLIENTID
              }
            ]
          });
          googleyolo.cancelLastOperation().then(() => {
                console.log("credentials selector closed");
          });
          retrievePromise.then((credential) => {
            if (credential.password) {
              // An ID (usually email address) and password credential was retrieved.
              // Sign in to your backend using the password.
              signInWithEmailAndPassword(credential.id, credential.password);
            } else {
              // A Google Account is retrieved. Since Google supports ID token responses,
              // you can use the token to sign in instead of initiating the Google sign-in
              // flow.
              useGoogleIdTokenForAuth(credential.idToken);
            }
          }, (error) => {
            // Credentials could not be retrieved. In general, if the user does not
            // need to be signed in to use the page, you can just fail silently; or,
            // you can also examine the error object to handle specific error cases.
          
            // If retrieval failed because there were no credentials available, and
            // signing in might be useful or is required to proceed from this page,
            // you can call `hint()` to prompt the user to select an account to sign
            // in or sign up with.
            if (error.type === 'noCredentialsAvailable') {
              googleyolo.hint(...).then(...);
            }
          });
    }

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
        <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
                 <MuiThemeProvider>    
                    <div>
                        <Loading/>
                        <GoogleOneTapSign/>
                        <App/>
                        <ReactTooltip globalEventOff="click"
                                      multiline={true} className="tooltip"
                                      delayShow={500}/>
                        <AddToHomeScreen msg1="¿Queres acceder de forma mas simple?, Agreganos a tu pantalla de inicio, presiona el boton " msg2='y luego en "Agregar a inicio".' timeToShow={120000}/>
                        <AlertContainer/>
                        <div style={{position:"fixed", zIndex:100000}} >
                            <SAlert effect='stackslide' stack={{limit: 3}} />
                        </div>
                    </div>
                </MuiThemeProvider>
        </Provider>
    ,
    document.getElementById('react'));

ReactDOM.render(
        <Footer/>
    ,
    document.getElementById('footer'));

registerServiceWorker();