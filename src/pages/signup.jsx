import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import RaisedButton from 'material-ui/RaisedButton';
import {resendEmailSignup, fbAuth, googleAuth} from "../actions/auth";
import ReCAPTCHA from "react-google-recaptcha";
import {signup as SignupAction} from "../actions/auth";
import Formsy from 'formsy-react';
import {MyOwnInput} from "../components/util/form.jsx";
import config from "../api_config";
import {GoogleLogin} from 'react-google-login';
import GreenButton from "../components/util/greenButton.jsx";
import FacebookLogin from "../components/util/facebookLogin.jsx"
import {Link} from "react-router-dom";
const RECAPTCHA_KEY = config.recaptchaSiteKey;
const GOOGLE_CLIENTID = config.googleClientId;

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
    },
    box:{
        margin: "20px",
        padding: "15px",
        borderRadius: "5px",
        backgroundColor: "white"
    },
    center:{
        margin: "0 auto"
    }
}
var captchaRef;

class Landing extends Component{

    constructor(props){
        super(props);
        this.state = {email:"", password:"", name:"", password2: ""}
        this.onSubmit = this.onSubmit.bind(this);
        this.recaptchaChange = this.recaptchaChange.bind(this);
        this.signupSight = this.signupSight.bind(this);
        this.logAuthError = this.logAuthError.bind(this);
    }

    signupSight(state){
        if(state.type === 1)
            return (
                <div className="alert alert-success" role="alert">
                    Enviamos un enlace de confirmacion a tu casilla de email, para poder ingresar debes acceder al mismo!
                </div>
            );
        if(state.type === 2)
            return (
                <div className="alert alert-info" role="alert">
                    Ya te enviamos un email para verificar tu cuenta, no olvides verificar el correo no deseado
                    <br/>
                    <RaisedButton backgroundColor="#5cb85c" onClick ={()=>this.props.resendEmailSignup(state.email)} label="Reenviar email de verificación" />
                </div>
            );
        return null;
        }
        
    logAuthError(err){
            console.error("error when trying to log with google/facebook: ", err);
    }
    
    render(){
        var signupMsg = null;
        if(this.props.signupMsg)
            signupMsg = this.signupSight(this.props.signupMsg);
        return (
                <span>
                            <ReCAPTCHA
                                ref={(el) => { captchaRef = el; }}
                                size="invisible"
                                sitekey={RECAPTCHA_KEY}
                                onChange={this.recaptchaChange}
                                />
                            <nav id="top" style={style.base} className="navbar navbar-expand-lg">
                                <Link style={style.logo} className="navbar-brand mr-auto" to="/"><img alt="logo" style={style.logoImg} src={process.env.PUBLIC_URL+"/img/logo_text_white.png"}/><sub style={style.beta}>BETA</sub></Link>
                                <span className="p-2">
                                    <Link to="/signin" className="nav-item btn btn-light"> Ingresar</Link>
                                </span>
                            </nav>
                            <div className="container">
                            <div style={style.box}>
                                <h1>Registrate</h1>
                                {signupMsg}
                            <div className="row">
                                        <div style={{padding:"0px"}} className="container">
                                            <div className="row" >
                                                <div style={style.center} className="col-11 col-sm-6">
                                                    {this.renderSigninForm()}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ padding:"20px"}} className="container">
                                            <div className="row">
                                                <div className="row" style={style.center}>
                                                    <FacebookLogin onSuccess={this.props.fbAuth}/>
                                                </div>
                                                <div className="row" style={style.center}>
                                                    <GoogleLogin
                                                                disabled={this.props.bigLoading}
                                                                style={{backgroundColor:"#ffffff", marginBottom:"10px", marginTop:"10px", fontWeight:"400", fontSize: "15px", border:"1px solid gray"}}
                                                                className="btn btn-light"
                                                                type="button"
                                                                scope="profile email"
                                                                clientId={GOOGLE_CLIENTID}
                                                                onFailure={this.logAuthError}
                                                                onSuccess={this.props.googleAuth}
                                                                >
                                                                    <i style={{marginRight:"5px"}} aria-hidden="true">
                                                                        <img src={process.env.PUBLIC_URL+"/img/icon_google16.png"} alt="Google icon"/>
                                                                    </i>
                                                                    <span>Continuar con Google</span>
                                                    </GoogleLogin>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            </div>
                            </div>
                </span>
        );
    }

    recaptchaChange(key){
        this.props.SignupAction(this.state.email, this.state.name, this.state.password, key);
        captchaRef.reset();
    }

    onSubmit(){
        captchaRef.execute();
    }

    renderSigninForm(){
        return <span style={style.center}>
                    <Formsy.Form id="signupForm" onValidSubmit={this.onSubmit}>
                        <MyOwnInput
                            validationErrors={{
                                isEmail: "Debes ingresar un email valido",
                                isDefaultRequiredValue: "No ingresaste un email"
                            }}
                            required
                            validations="isEmail"
                            name="email"
                            type="text"
                            onChange={e=>this.setState({email:e.target.value})}
                            value={this.state.email}
                            placeholder="Email"
                            />
                            <MyOwnInput
                            validationErrors={{
                                minLength: "Tú nombre debe contener al menos 4 caracteres",
                                isDefaultRequiredValue: "No ingresaste tu nombre"
                            }}
                            required
                            validations="minLength:4"
                            name="name"
                            type="text"
                            onChange={e=>this.setState({name:e.target.value})}
                            value={this.state.name}
                            placeholder="Tú nombre"
                            />
                        <MyOwnInput
                            validationErrors={{
                                minLength: "La contraseña debe contener al menos 4 caracteres",
                                isDefaultRequiredValue: "No ingresaste la contraseña"
                            }}
                            name="password"
                            validations="minLength:4"
                            required
                            onChange={e=>this.setState({password:e.target.value})}
                            value={this.state.password}
                            type="password"
                            placeholder="contraseña"
                            />
                        <MyOwnInput
                            validationErrors={{
                                minLength: "La contraseña debe contener al menos 4 caracteres",
                                isDefaultRequiredValue: "No confirmaste tu contraseña",
                                equalsField: "Las contraseñas no coinciden"
                            }}
                            name="password2"
                            validations="minLength:4,equalsField:password"
                            required
                            onChange={e=>this.setState({password2:e.target.value})}
                            value={this.state.password2}
                            type="password"
                            placeholder="Confirma tú contraseña"
                            />
                    </Formsy.Form>
                    <GreenButton form="signupForm" disabled={this.props.bigLoading} type="submit" style={style.marginLeft} label="Crear cuenta" />
                </span>
    }

}

function mapStateToProps(state){
    return {
        bigLoading: state.bigLoading,
        signupMsg: state.signupMsg
    }
}


export default connect(mapStateToProps,{resendEmailSignup, fbAuth, googleAuth, SignupAction})(Radium(Landing));

