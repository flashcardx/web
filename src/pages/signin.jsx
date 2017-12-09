import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {fbAuth, googleAuth} from "../actions/auth";
import ReCAPTCHA from "react-google-recaptcha";
import {signin as SigninAction} from "../actions/auth";
import Formsy from 'formsy-react';
import {MyOwnInput} from "../components/util/form.jsx";
import config from "../api_config";
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin} from 'react-google-login';
import GreenButton from "../components/util/greenButton.jsx";
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
        this.state = {email:"", password:""}
        this.onSubmit = this.onSubmit.bind(this);
        this.recaptchaChange = this.recaptchaChange.bind(this);
        this.signupSight = this.signupSight.bind(this);
    }

    signupSight(state){
        if(state.type === 1)
            return (
                <div className="alert alert-success" role="alert">
                    {state.msg}
                </div>
            );
        return null;
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
                            <nav style={style.base} className="navbar navbar-expand-lg">
                                <Link style={style.logo} className="navbar-brand mr-auto" to="/"><img style={style.logoImg} src={process.env.PUBLIC_URL+"/img/logo_text_white.png"}/><sub style={style.beta}>BETA</sub></Link>
                                <span className="p-2">
                                    <Link to="/signup" className="nav-item btn btn-light"> Registrate</Link>
                                </span>
                            </nav>
                            <div className="container">
                            <div style={style.box}>
                                <h1>Ingresa con tu usuario</h1>
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
                                            <div className="row" style={style.center}>
                                                <span style={style.center}>
                                                    <FacebookLogin 
                                                        appId={FB_APPID}
                                                        fields="name,email,picture"
                                                        textButton="Facebook"
                                                        size="small"
                                                        icon="fa fa-facebook-official"
                                                        callback={this.props.fbAuth} />
                                                </span>
                                            </div>
                                            <div className="row" style={style.center}>
                                                    <GoogleLogin
                                                            disabled={this.props.bigLoading}
                                                            style={{...style.center, backgroundColor:"#ffffff", marginBottom:"10px", marginTop:"10px", fontWeight:"500", fontSize: "16px", border:"1px solid gray"}}
                                                            className="btn btn-light"
                                                            type="button"
                                                            scope="profile email"
                                                            clientId={GOOGLE_CLIENTID}
                                                            onSuccess={this.props.googleAuth}
                                                            onFailure={this.props.googleAuth}
                                                            >
                                                                <i style={{marginRight:"5px"}} aria-hidden="true">
                                                                    <img src={process.env.PUBLIC_URL+"/img/icon_google16.png"} alt="Google icon"/>
                                                                </i>
                                                                <span> GOOGLE</span>
                                                            </GoogleLogin>
                                            </div>
                                    </div>
                            </div>

                            </div>
                            </div>
                </span>
        );
    }

    recaptchaChange(key){
        this.props.SigninAction(this.state.email, this.state.password, key);
        captchaRef.reset();
    }

    onSubmit(){
        captchaRef.execute();
    }

    renderSigninForm(){
        return <span style={style.center}>
                    <Formsy.Form id="signinForm" onValidSubmit={this.onSubmit}>
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
                    </Formsy.Form>
                    <GreenButton form="signinForm" disabled={this.props.bigLoading} type="submit" style={style.marginLeft} label="Ingresar" />
                </span>
    }

}

function mapStateToProps(state){
    return {
        bigLoading: state.bigLoading,
        signupMsg: state.signupMsg
    }
}


export default connect(mapStateToProps,{fbAuth, googleAuth, SigninAction})(Radium(Landing));

