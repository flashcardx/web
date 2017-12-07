import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import RaisedButton from 'material-ui/RaisedButton';
import SigninForm from "../containers/signinForm.jsx";
import SignupForm from "../containers/signupForm.jsx";
import {resendEmailSignup, fbAuth, googleAuth} from "../actions/auth";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../api_config";
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin} from 'react-google-login';
import {Link} from "react-router-dom";
const RECAPTCHA_KEY = config.recaptchaSiteKey;
const FB_APPID = config.fbAppId;
const GOOGLE_CLIENTID = config.googleClientId;

const style = {
    base:{
        backgroundColor: "#4286f4"
    },
    logo:{
        color: "#fff"
    },
    right:{
        float: "right"
    },
    white:{
        color: "#fff"
    },
    margin5:{
        margin:"5px"
    },
    breakword:{
        whiteSpace: "pre-line"
    },
    featureList:{
        listStyleType:"disc"
    },
    beta:{
        fontSize: "x-small"
    }
}
var captchaRef;
var submitOrigin;
var finishSignup;
var finishSignin;

function recaptchaChange(key) {
    switch(submitOrigin){
        case "signin":  finishSignin(key);
                        break;
        case "signup": finishSignup(key);
                        break;
        default: console.error("invalid submit origin");
    }
    captchaRef.reset();
}

function signinExecute(callback){
    submitOrigin = "signin";
    finishSignin = callback;
    captchaRef.execute();
}

function signupExecute(callback){
    submitOrigin = "signup";
    finishSignup = callback;
    captchaRef.execute();
}

class Landing extends Component{

    constructor(props){
        super(props);
        this.signupSight = this.signupSight.bind(this);
    }

    signupSight(state){
    if(state.type === 1)
        return (
            <div className="alert alert-success" role="alert">
                {state.msg}
            </div>
        );
    if(state.type === 2)
        return (
            <div className="alert alert-info" role="alert">
                {state.msg}
                <br/>
                <RaisedButton backgroundColor="#5cb85c" onClick ={()=>this.props.resendEmailSignup(state.email)} label="Resend verification email" />
            </div>
        );
    return null;
    }

    
    render(){
        var signupMsg = null;
        if(this.props.signupMsg)
            signupMsg = this.signupSight(this.props.signupMsg);
        return (
            <div>
                            <ReCAPTCHA
                                ref={(el) => { captchaRef = el; }}
                                size="invisible"
                                sitekey={RECAPTCHA_KEY}
                                onChange={recaptchaChange}
                            />
                            <nav style={style.base} className="navbar navbar-expand-lg">
                                <Link style={style.logo} className="navbar-brand" to="#">FlashcardX<sub style={style.beta}>BETA</sub></Link>
                                <SigninForm captchaExecute={signinExecute} className="form-inline my-2 my-lg-0"/>
                                </nav>
                                <div className="container">
                                    {signupMsg}
                                    <Details googleAuth={this.props.googleAuth} fbAuth={this.props.fbAuth}/>
                                </div>
            </div>
        );
    }
}

function Details({fbAuth, googleAuth}){
    return(
        <div>   
                <div className="row">
                    <h1>Learn anything with beautiful images</h1>
                </div>
                <div className="row">
                        <div className="col">
                            <div className="row">
                                <FacebookLogin
                                    appId={FB_APPID}
                                    fields="name,email,picture"
                                    textButton="Continue with Facebook"
                                    size="small"
                                    icon="fa fa-facebook-official"
                                    callback={fbAuth} />
                            </div>
                            <div className="row">
                                <GoogleLogin
                                    style={{backgroundColor:"#ffffff", marginBottom:"10px", marginTop:"10px", fontWeight:"500", fontSize: "16px", border:"1px solid gray"}}
                                    className="btn btn-light"
                                    type="button"
                                    scope="profile email"
                                    clientId={GOOGLE_CLIENTID}
                                    onSuccess={googleAuth}
                                    onFailure={googleAuth}
                                    >
                                    <i style={{marginRight:"5px"}} aria-hidden="true">
                                        <img src={process.env.PUBLIC_URL+"/img/icon_google16.png"} alt="Google icon"/>
                                    </i>
                                    <span>CONTINUE WITH GOOGLE</span>
                                </GoogleLogin>
                            </div>
                        </div>
                        <div className="col">
                             <SignupForm captchaExecute={signupExecute} className="form-horizontal"/>
                        </div>
                    </div>
                <div style={style.margin5}>
                            <div className="row">
                                    <h2>Our mission is to optimize your learning experience to its maximum</h2>
                            </div>
                            <div style={style.breakword} className="row">
                                    <h3 style={style.breakword}>Use this tool for improving the learning of:<br/>
                                        Languages, mathematics, physics, history, nuclear science, aliens and much more!
                                    </h3>
                            </div>
                </div>
                <div className="row">
                            <div className="col-md-12 text-center">
                                <h2> What are Flashcards?</h2>
                                    <div minLength="embed-responsive embed-responsive-16by9">
                                        <iframe title ="video" width="100%" height="400px" className="embed-responsive-item" src="https://www.youtube.com/embed/mzCEJVtED0U" allowFullScreen></iframe>
                                    </div>
                            </div>
                </div> 
            <FeatureList/>
        </div>
    );
}

function FeatureList(){
    return (
            <div minLength="row">
                <h3>List of features:</h3>
                <div minLength="col">
                    <ul style={style.featureList}>
                        <li>images and gifs search for adding the best images to every card</li>
                        <li>Practice the right card at the right time thanks to spaced repetition "supermemo" alghorithm</li>
                        <li>Create minLengthes for sharing cards, and connect with minLengthmates</li>
                        <li>Scientific markup support(via LaTeX): just embed your LaTeX code between'$$': $$your LaTeX code here$$</li>
                        <li>Organize your cards by categories</li>
                        <li>Word suggestions for creating new cards(available for Engish and Spanish)</li>
                        <li>Autocomplete function(available for English): if you want the system can complete your card's description with definitions and examples </li>
                        <li>Listen to the pronunciation of the cards tittle(available in more than 20 languages!)</li>
                    </ul>  
                </div>
            <div>
                <p>There are a lot of new features coming soon. If you would like to have a feature that's not in the list please write us to: <a target="_top">contact@flashcardx.co</a> and tell us your idea!</p>
            </div>
        </div>
    );
}

function mapStateToProps({signupMsg}){
    return {signupMsg};
}

export default connect(mapStateToProps,{resendEmailSignup, fbAuth, googleAuth})(Radium(Landing));

