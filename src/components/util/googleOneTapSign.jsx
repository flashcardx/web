import React, {Component} from "react"
import Radium from "radium";
import {connect} from "react-redux"
import config from "../../api_config";
import {signin} from "../../actions/auth"

const GOOGLE_CLIENTID = config.googleClientId;


class GoogleOneTapSign extends Component{

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
        const retrievePromise = window.googleyolo.retrieve({
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
          window.googleyolo.cancelLastOperation().then(() => {
                console.log("credentials selector closed");
                
          });
          retrievePromise.then((credential) => {
            if (credential.password) {
              // An ID (usually email address) and password credential was retrieved.
              // Sign in to your backend using the password.
              this.props.signin(credential.id, credential.password);
            } else {
              // A Google Account is retrieved. Since Google supports ID token responses,
              // you can use the token to sign in instead of initiating the Google sign-in
              // flow.
              //useGoogleIdTokenForAuth(credential.idToken);
              console.log("logged in with google: ", credential.idToken);
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
                console.log("no credentials available");
                //googleyolo.hint(...).then(...);
            }
          });
    }


    render(){
       return null;
    }
}

export default connect(null, {signin})(Radium(GoogleOneTapSign));