import React, {Component} from "react"
import config from "../../api_config";
import {googleAuth} from "../actions/auth";
const GOOGLE_CLIENTID = config.googleClientId;
class GoogleSignButton extends Component{

    constructor(props){
        super(props);
        this.run = this.run.bind(this);
    }

    run(){
        if(!window.googleyolo){
            return setTimeout(() => {
                this.run();
                console.log("googleyolo wasn't ready, trying again in: 100ms");
            }, 100);
        }
       const hintPromise = window.googleyolo.hint({
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
            })
        hintPromise.then((credential) => {
                if (credential.password) {
                  // An ID (usually email address) and password credential was retrieved.
                  // Sign in to your backend using the password.
                  console.log("console.log got email and password: ", credential);
                  this.props.signin(credential.id, credential.password);
                } else {
                  // A Google Account is retrieved. Since Google supports ID token responses,
                  // you can use the token to sign in instead of initiating the Google sign-in
                  // flow.
                  //useGoogleIdTokenForAuth(credential.idToken);
                  console.log("logged in with google: ", credential.idToken);
                  this.props.googleAuth(credential.idToken);  
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
        return <button style={{ marginBottom:"10px",
                      marginTop:"10px",
                      color:"white",
                      fontWeight:"400",
                      fontSize: "15px",
                      border:"1px solid gray"}}
                className="btn btn-light" onClick={this.run}>
                <i style={{marginRight:"5px"}} aria-hidden="true">
                <img src={process.env.PUBLIC_URL+"/img/icon_google16.png"} alt="Google icon"/>
                </i>
                <span style={{color:"black"}}>
                    Continuar con Google
                </span>
        </button>
    }

}

export default connect(null, {googleAuth})(GoogleSignButton);