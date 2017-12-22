import React, {Component} from "react";
import Radium from "radium";

class FacebookLogin extends Component{

    constructor(props){
        super(props);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.init = this.init.bind(this);
    }
    
    init(){
            if(!window.FB){//if not ready wait until it is
                return setTimeout(()=>{
                    this.init();
                }, 100);
            }
    }

    componentDidMount() {
             this.init();
    }

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response){
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log("reponse: ", response);
           this.props.onSuccess(response.authResponse);
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
         } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState() {
        window.FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleClick() {
        window.FB.login(this.statusChangeCallback, {scope: 'email, public_profile'}); 
    }

    render(){
        return  <div>
            <div id="fb-root"></div>
            <button style={{backgroundColor:"#3B5998",
                      marginBottom:"10px",
                      marginTop:"10px",
                      color:"white",
                      fontWeight:"400",
                      fontSize: "15px",
                      border:"1px solid gray"}}
                className="btn btn-light" onClick={this.handleClick}>
                <i className="fa fa-facebook-official"  style={{marginRight:"5px"}} aria-hidden="true">
                </i>
                Continuar con Facebook
            </button>
            </div>
    }
}

export default Radium(FacebookLogin);