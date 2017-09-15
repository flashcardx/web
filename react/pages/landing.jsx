import React, {Component} from "react";
import {connect} from "react-redux";
import Page from "../components/page.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Radium from "radium";
import RaisedButton from 'material-ui/RaisedButton';
import SigninForm from "../components/signinForm.jsx";
import SignupForm from "../components/signupForm.jsx";
import {resendEmailSignup} from "../actions/auth";
import ReCAPTCHA from "react-google-recaptcha";
import apiKeys from "../../config/keys.json";
const env = process.env.NODE_ENV || "development";
const RECAPTCHA_KEY = apiKeys[env].reCaptcha.siteKey;

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
        case "signin": finishSignin(key);
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
    if(state.type == 1)
        return (
            <div className="alert alert-success" role="alert">
                {state.msg}
            </div>
        );
    if(state.type == 2)
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
            <MuiThemeProvider>  
                    <div>
                            <ReCAPTCHA
                                ref={(el) => { captchaRef = el; }}                            size="invisible"
                                sitekey={RECAPTCHA_KEY}
                                onChange={recaptchaChange}
                            />
                            <nav style={style.base} className="navbar navbar-expand-lg">
                                <a style={style.logo} className="navbar-brand" href="#">FlashCardX<sub style={style.beta}>BETA</sub></a>
                                <SigninForm captchaExecute={signinExecute} className="form-inline my-2 my-lg-0"/>
                                </nav>
                                <div className="container">
                                    {signupMsg}
                                    <Details/>
                                </div>
                    </div>
            </MuiThemeProvider>  
        );
    }
}

function Details(){
    return(
        <div>   
              <div className="alert alert-info" role="alert">
                    <strong>Heads up!</strong> This is a BETA version, we will be launching soon the first MAJOR version of our service with lots of new features and design improvements.If you want to keep in touch<a href="javascript: document.body.scrollIntoView(false);"> follow us on social networks or send us an email</a>(Tell us your suggestions and you could see them implemented in the near future ;) ). We would love to have you here once we are ready!
                </div>
                    <div className="row">
                            <div className="col-md-6">
                                    <h1>Learn anything with beautiful images</h1>
                                    <p></p>
                                <RaisedButton  icon={<i style={style.white} className="fa fa-facebook-official" aria-hidden="true"/>} labelPosition="after" labelColor="#fff" onClick="location.href='/auth/facebook'"  backgroundColor="#3b5998" label="Continue with facebook" />
                            </div>
                            <div className="col-md-6">
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
                                        <iframe width="100%" height="400px" className="embed-responsive-item" src="https://www.youtube.com/embed/mzCEJVtED0U" allowFullScreen></iframe>
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

export default connect(mapStateToProps,{resendEmailSignup})(Radium(Landing));

