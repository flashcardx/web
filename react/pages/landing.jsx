import React from "react";
import Page from "../components/page.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Radium from "radium";
import RaisedButton from 'material-ui/RaisedButton';
import SigninForm from "../components/signinForm.jsx";

const style = {
    base:{
        backgroundColor: "#4286f4"
    },
    logo:{
        color: "white"
    },
    right:{
        float: "right"
    },
    white:{
        color: "white"
    },
    margin5:{
        margin:"5px"
    },
    borderForm:{
        border: "1px solid gray",
        paddingTop: "8px"
    },
    breakword:{
        whiteSpace: "pre-line"
    },
    featureList:{
        listStyleType:"disc"
    }
}


function Landing(){
    return (
         <MuiThemeProvider>  
                <div>
                        <nav style={style.base} className="navbar navbar-expand-lg">
                            <a style={style.logo} className="navbar-brand" href="#">FlashCardX</a>
                            <SigninForm className="form-inline my-2 my-lg-0"/>
                            </nav>
                            <div className="container">
                                <Details/>
                            </div>
                </div>
         </MuiThemeProvider>  
    );
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
                                <RaisedButton  icon={<i style={style.white} className="fa fa-facebook-official" aria-hidden="true"/>} labelPosition="after" labelColor="white" onClick="location.href='/auth/facebook'"  backgroundColor="#3b5998" label="Continue with facebook" />
                            </div>
                            <div className="col-md-6">
                                    <form style={style.borderForm} className="form-horizontal" id="form-signup" action="/signup" method="post">
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <input name="email" type="email" required="true" className="form-control" id="email" placeholder="Your email"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <input name="name" type="text" className="form-control" id="name" placeholder="Your name(or how your friends call you)"/>
                                            </div>
                                        </div>
                                         <div className="form-group">
                                            <div className="col-sm-12">
                                                <input minLength="4" required="true" type="password" name="password" className="form-control" id="pwd" placeholder="New password"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <input minLength="4" required="true" type="password" name="password2" className="form-control" id="pwd2" placeholder="Enter password again"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-12">
                                                <RaisedButton onClick="validateSignup()" backgroundColor="#5cb85c" label="Sign up!" />
                                            </div>
                                        </div>
                                        <input id="recaptcha-input-signup" type="hidden" name="recaptcha" value=""/>
                                        <button type="submit" id="submit-signup-btn" form="form-signup" value="Submit" className="hide"></button>  
                                    </form>
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

export default Radium(Landing);