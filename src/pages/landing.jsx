import React, {Component} from "react";
import Radium from "radium";
import {Link} from "react-router-dom";

// eslint-disable-next-line 
import styles from "../css/landing.css";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const SATURNO_SRC = process.env.PUBLIC_URL+"/img/landing/saturno.png";
const JUPITER_SRC = process.env.PUBLIC_URL+"/img/landing/jupiter.png";
const ROCKET_SRC = process.env.PUBLIC_URL+"/img/landing/rocket.png";
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
    beta:{
        fontSize: "x-small",
        verticalAlign: "text-bottom"
    },
    fcDerecha:{
        backgroundImage: "url("+SATURNO_SRC+")"
    },
    fcIzquierda:{
        backgroundImage: "url("+JUPITER_SRC+")"
    },
    fcCentro:{
        backgroundImage: "url("+ROCKET_SRC+")"
    }
}

class Landing extends Component{


    render(){
        return (
            <ParallaxProvider>
                            <nav style={style.base} className="navbar navbar-expand-lg d-flex">
                                <Link style={style.logo} className="navbar-brand mr-auto" to="#"><img alt="logo" style={style.logoImg} src={process.env.PUBLIC_URL+"/img/logo_text_white.png"}/><sub style={style.beta}>BETA</sub></Link>
                                <span className="p-2">
                                    <span className="p-2">
                                        <Link to="/signin" className="nav-item btn btn-light"> Ingresar</Link>
                                    </span>
                                    <span className="p-2">
                                        <Link to="/signup" className="nav-item btn btn-light"> Registrate</Link>
                                    </span>
                                </span>
                            </nav>
                            <Details/>
            </ParallaxProvider>
        );
    }
}

function Details(){
    return(
        <div className="maincontent">   
                    <div  style={{height:"80vh"}}>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-5 col-lg-5">
                                    <h2 className="seccionTittle">Aprendé lo que sea con fichas multimedia</h2> 
                                    <p className="lead">Usá esta herramienta para mejorar el aprendizaje de idiomas, matematica, geografia, historia, ciencias atomicas, y mucho más! </p>
                                </div>
                                <div className="col-md-7 col-lg-5 ">
                                    <div className="seccionMultimedia">
                                            <Parallax
                                                offsetYMax="0 px"
                                                offsetYMin="100 px"
                                                offsetXMax="200 px"
                                                offsetXMin="-100 px"
                                                slowerScrollRate
                                            >
                                                <img alt="ficha saturno" className="fcIzquierda"src={SATURNO_SRC}  />
                                            </Parallax>
                                            <Parallax
                                                offsetYMax="0 px"
                                                offsetYMin="100 px"
                                                offsetXMin="100 px"
                                                offsetXMax="-200 px"
                                                slowerScrollRate
                                            >
                                                <img alt="ficha jupiter" className="fcDerecha" src={JUPITER_SRC}  />
                                            </Parallax>
                                            <Parallax
                                                offsetYMax="0 px"
                                                offsetYMin="-100 px"
                                                offsetXMax="0 px"
                                                offsetXMin="0 px"
                                                slowerScrollRate
                                            >
                                                <img alt="ficha cohete" className="fcCentro"src={ROCKET_SRC}  />
                                            </Parallax>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div style={{height:"400px"}} className="row align-items-center justify-content-center  ">
                            <div className="offset-md-1 col-md-4 col-xs-12">
                                <h2 className="seccionTittle display-4">Creá</h2>
                                <p className="lead">Crear una ficha lleva 10 segundos: elije un concepto, escribe una descripción y selecciona una imagen.&nbsp;</p>
                            </div>
                            <div className="col-md-7">
                                <img alt="crear ficha" className="img-fluid" src={process.env.PUBLIC_URL+"/img/landing/create-fc.gif"}/>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div style={{height:"400px"}} className="row align-items-center  ">
                            <div className="col-md-6 col-span-md-1">
                                <img alt="mazos" className="img-fluid"  src={process.env.PUBLIC_URL+"/img/landing/decks.gif"}/>
                                <p><br/></p>
                            </div>
                            <div className="offset-md-1 col-md-4  ">
                                <h2 className="seccionTittle display-4">Organizá</h2>
                                <p className="lead">Guarda tus fichas en mazos, para separarlas por tema, por ejemplo un mazo para Ingles, otro para chino, etc. Adentro de cada mazo aparte de tarjetas podes guardar otros mazos!</p>
                            </div>
                        </div>
                    </div>
                    <div className="practice container">
                        <div className="practice-box row align-items-center justify-content-center  ">
                            <div className="offset-md-1 col-md-5">
                                <h2 className="seccionTittle display-4">Practicá</h2>
                                <p className="lead">Practica el mazo que quieras de una manera inteligente, el sistema guarda tus estadísticas y te ayuda a practicar cada ficha en el momento ideal.&nbsp;</p>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <img alt="chica premio" className="img-fluid" src={process.env.PUBLIC_URL+"/img/landing/practice.gif"}/>
                            </div>
                        </div>
                    </div>
        </div>
    );
}



export default Radium(Landing);

