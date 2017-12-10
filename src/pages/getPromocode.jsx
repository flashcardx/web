import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import config from "../api_config";
import { Redirect} from "react-router";
import {withRouter, Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import ReCAPTCHA from "react-google-recaptcha";
import _ from "lodash";
import {submitPromocode} from "../actions/user";
import {redirect as redirectAction} from "../actions/util";
import GreenButton from "../components/util/greenButton";
const RECAPTCHA_KEY = config.recaptchaSiteKey;
const LinkRadium = Radium(Link);

const style = {
    box:{
        backgroundColor:"white",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
        padding:"10px",
        margin: "10px"
    },
    box2:{
        background: "linear-gradient(to right, #5dbeff , #0089e5)"
    },
    box3:{
        background: "linear-gradient(to right, #bc2a8d ,  #8a3ab9)"
    },
    box4:{
        background: "linear-gradient(to right, #fccc63 ,  #c3aa14)"
    },
    img:{
        width:"70px",
        height: "auto",
        float: "right",
        display: "inline-block"
    },
    img2:{
        width:"auto",
        maxHeight:"70px",
        display: "inline-block",
        verticalAlign: "middle",
        float: "left",
        margin:"5px"
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
        return <Page noWrap name="getpromocode">
                        <ReCAPTCHA
                                    ref={(el) => {captcha = el; }}
                                    size="invisible"
                                    sitekey={RECAPTCHA_KEY}
                                    onChange={this.recaptchaChange}
                                />
                        <div style={style.box} className="row">
                            <span style={{width:"100%"}}>
                                <img style={style.img} alt="cry emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/crying.svg"}/>
                                <h2 style={{color:"#4286f4"}}>Parece que no tenes una subscripción activa</h2>
                            </span>
                        </div>
                        <div style={style.box} className="row">
                        <div className="container">
                            <div className="col-4">
                                <img style={style.img2} alt="invoice emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/invoice.svg"}/>
                            </div>
                            <div className="col-8 col-sm-6">
                                            <h2 style={{color:"#4286f4"}}>Ingresa tu codigo</h2>
                            </div>
                            <div className="col-12 col-sm-12">
                                                <TextField
                                                value={this.state.code}
                                                onChange={e=>this.setState({code:e.target.value})}
                                                floatingLabelText="Codigo"
                                                />
                                                <GreenButton
                                                        style={{margin:"5px"}}
                                                        onClick={this.submitPromocode}
                                                        disabled={this.props.bigLoading}
                                                        label="Validar"/>      
                            </div>
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
                                            Comparte alguna de nuestras publicaciones(la que mas te guste)
                                            </li>
                                        </h3>
                                        <h3 style={{whiteSpace: "initial"}}>
                                            <li>
                                            En menos de 24 horas te enviaremos tu codigo por mensaje privado
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
                                <img style={style.img} alt="cry emoji" className="img-fluid" src={process.env.PUBLIC_URL+"/img/email.svg"}/>
                                <h2>Opción 3</h2>
                                <h3 style={{whiteSpace: "initial"}}>Si no tenes las anteriores redes sociales o sos profesor y queres solicitar codigos para tus alumnos envianos un email a: contact@flashcardx.co y pronto nos pondremos en contacto</h3>
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