import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import config from "../api_config";
import { Redirect} from "react-router";
import {withRouter, Link} from 'react-router-dom';
import Formsy from 'formsy-react';
import {MyOwnInput} from "../components/util/form.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import _ from "lodash";
import {submitPromocode} from "../actions/user";
import {redirect as redirectAction} from "../actions/util";
import GreenButton from "../components/util/greenButton";
const RECAPTCHA_KEY = config.recaptchaSiteKey;
const LinkRadium = Radium(Link);

const style = {
    title:{
        padding:"10px",
        margin: "10px"
    },
    box:{
        backgroundColor:"white",
        boxShadow: "3px 3px 5px 6px #ccc",
        padding:"10px",
        margin: "15px"
    },
    box2:{
        backgroundColor: "#0089e5"
    },
    box3:{
        backgroundColor: "#E9293F"
    },
    box4:{
    },
    img:{
        width:"80px",
        height: "auto",
        float: "right",
        display: "inline-block"
    },
    imgTitle:{
        width:"110px",
        height: "auto",
        float: "right",
        display: "inline"
    },
    link:{
        color: "blue",
        textDecoration: "underline",
        ":hover":{
            color: "#B20000"
        }
    }
}

let captcha = null;
class GetPromocode extends Component{
    
    constructor(props){
        super(props);
        this.state = {code:""}
        this.shouldNotBeInThisPage = this.shouldNotBeInThisPage.bind(this);
        this.submitPromocode = this.submitPromocode.bind(this);
        this.recaptchaChange = this.recaptchaChange.bind(this);
    }

    recaptchaChange(key){
        this.props.submitPromocode(this.state.code, key, ()=>{
            //gives some time so the action for re logging the user can finalize, and its state in the app can be updated
            //otherwise the landing page will kick the user back to here
            setTimeout(() => {
                this.props.redirectAction("/landing");
            }, 100);
        });
        captcha.reset();
    }
    
    submitPromocode(){
        captcha.execute();
    }

    render(){
        if(this.shouldNotBeInThisPage())
            return <Redirect push to="/landing"/>
        return <Page title="Activar cuenta" noWrap name="getpromocode">
                            <ReCAPTCHA
                                    ref={(el) => {captcha = el; }}
                                    size="invisible"
                                    sitekey={RECAPTCHA_KEY}
                                    onChange={this.recaptchaChange}
                                />
                            <div className="container">
                            <img style={style.imgTitle} alt="free" className="img-fluid" src={process.env.PUBLIC_URL+"/img/free.png"}/>
                            <div style={style.title} className="row">
                            <span style={{width:"100%"}}>
                                <h1 style={{color:"black"}}>Activa tu cuenta (tranquilo/a es gratis)</h1>
                                <div className="col-12 col-md-8">
                                                <h2 style={{color:"#4286f4"}}>Ingresa tu código</h2>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                               <Formsy.Form ref="form" onValidSubmit={this.submitPromocode}> 
                                                    <MyOwnInput
                                                        name="code"
                                                        autoFocus
                                                        value={this.state.code}
                                                        required
                                                        validationErrors={{
                                                            isDefaultRequiredValue: "Ingresa un codigo"
                                                        }}
                                                        onChange={e=>this.setState({code:e.target.value})}
                                                        floatingLabelText="Codigo"
                                                        onEnter={()=>this.refs.form.submit()}
                                                        style={{width:"100%"}}
                                                        />
                                                </Formsy.Form>
                                    </div>
                                    <div className="col-4">
                                                <GreenButton
                                                        style={{bottom:0, margin:"5px"}}
                                                        onClick={()=>this.refs.form.submit()}
                                                        disabled={this.props.bigLoading}
                                                        label="Validar"/>      
                                    </div>
                                </div>
                                </span>
                            </div>
                        </div>
                        <div style={{...style.box, ...style.box2}} className="row">
                            <span style={{width:"100%"}}>
                                <img style={style.img} alt="cry emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/facebook.svg"}/>
                                <h2>Opción 1</h2>
                                <ol>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            Dale like a nuestra <LinkRadium style={style.link} rel="noopener noreferrer" target="_blank" to="https://www.facebook.com/CardsFlashx/">página de Facebook</LinkRadium>
                                            </li>
                                        </h3>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            Envia un mensaje a nuestra página(Necesario ya que Facebook no nos permite iniciar una conversación)
                                            </li>
                                        </h3>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            En menos de 24 horas recibiras tu codigo de acceso!
                                            </li>
                                        </h3>                      
                                    </ol>
                            </span>
                        </div>
                        <div style={{...style.box, ...style.box3}} className="row">
                            <span style={{width:"100%"}}>
                                <img style={style.img} alt="cry emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/instagram.svg"}/>
                                <h2>Opción 2</h2>
                                <ol>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                                Seguinos en <LinkRadium style={style.link} rel="noopener noreferrer" target="_blank" to="https://www.instagram.com/flashcardx/">Instagram</LinkRadium>
                                            </li>
                                        </h3>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            Dale Like a alguna de nuestras fotos(la que mas te guste)
                                            </li>
                                        </h3>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            En menos de 24 horas te enviaremos tu codigo por mensaje
                                            </li>
                                        </h3>                      
                                </ol>
                            </span>
                        </div>
                        <div style={{...style.box, ...style.box4}} className="row">
                             <span style={{width:"100%"}}>
                                <img style={style.img} alt="cry emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/feedback.svg"}/>
                                <h2>Opción 3</h2>
                                <h3 style={{whiteSpace: "initial"}}>Completa la siguiente encuesta, contandonos que opinas del proyecto, que cosas te gustan y cuales podemos mejorar, te enviaremos tu código por Email</h3>
                                <iframe title="form" frameBorder="0" style={{height:"700px", width:"100%", border:"none"}} src='https://forms.zohopublic.com/flashcardxco/form/Tuopinion/formperma/MgAE57E25F26mM1k51HG4h55E'></iframe>
                             </span>
                        </div>
                </Page>
    }

    shouldNotBeInThisPage(){
        if(_.isEmpty(this.props.redirect))
            return true;
        return this.props.redirect.path !== this.props.location.pathname
    }   
}

function mapStateToProps(state){
    return {
        redirect: state.redirect,
        bigLoading: state.bigLoading
    }
}
export default connect(mapStateToProps, {submitPromocode, redirectAction})(Radium(withRouter(GetPromocode)));