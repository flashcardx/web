import React, {Component} from "react";
import Radium from "radium";
import {Link} from "react-router-dom";

const style = {
    base:{
        backgroundColor: "#4286f4"
    },
    logo:{
        color: "#fff"
    },
    logoImg:{
        maxHeight:"45px",
        width: "auto"
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
        fontSize: "x-small",
        verticalAlign: "text-bottom"
    }
}

class Landing extends Component{


    render(){
        return (
            <div>
                            <nav style={style.base} className="navbar navbar-expand-lg d-flex">
                                <Link style={style.logo} className="navbar-brand mr-auto" to="#"><img style={style.logoImg} src={process.env.PUBLIC_URL+"/img/logo_text_white.png"}/><sub style={style.beta}>BETA</sub></Link>
                                <span className="p-2">
                                    <span className="p-2">
                                        <Link to="/signin" className="nav-item btn btn-light"> Ingresar</Link>
                                    </span>
                                    <span className="p-2">
                                        <Link to="/signup" className="nav-item btn btn-light"> Registrate</Link>
                                    </span>
                                </span>
                            </nav>
                                <div className="container">
                                    <Details googleAuth={this.props.googleAuth} fbAuth={this.props.fbAuth}/>
                                </div>
            </div>
        );
    }
}

function Details({fbAuth, googleAuth}){
    return(
        <div className="container">   
                <div style={{paddingTop:"10px"}} className="row">
                    <h1>Aprende de todo con fichas multimedia</h1>
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

