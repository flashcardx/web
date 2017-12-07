import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm } from 'redux-form';
import TextField from "../components/util/textField.jsx";
import GreenButton from "../components/util/greenButton.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {signin as SigninAction} from "../actions/auth";
import Formsy from 'formsy-react';
import {MyOwnInput} from "../components/util/form.jsx";

const style = {
    marginLeft:{
        marginLeft: "5px"
    }
}

class SigninForm extends Component{
    constructor(props){
        super(props);
        this.state = {className: props.className, email:"", password:""};
        this.captchaExecute = props.captchaExecute.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }    

    onSubmit(values){
        this.captchaExecute(key=>{
            this.props.SigninAction(values, key);
        });
    }

    render(){
       const {handleSubmit} = this.props;
       return ( 
                <span>
                    <Formsy.Form ref="form" onValidSubmit={this.onSubmit} className={this.state.className}>
                        <MyOwnInput
                            validationErrors={{
                                isEmail: "Debes ingresar un email valido",
                                isDefaultRequiredValue: "No ingresaste un email"
                            }}
                            required
                            style={{backgroundColor:"white"}}
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
                            style={{...style.marginLeft, backgroundColor:"white"}}
                            name="password"
                            required
                            onChange={e=>this.setState({password:e.target.value})}
                            value={this.state.password}
                            type="password"
                            placeholder="contraseña"
                            />
                    </Formsy.Form>
                    <GreenButton disabled={this.props.bigLoading} type="submit" style={style.marginLeft} label="Sign in" />
                </span>
       );
    }
}

function validate({email, password}){
    var errors = {};
    if(!email)
        errors.email = "Insert an email";
    if(!password)
        errors.password = "Insert a password";
    return errors;
}

SigninForm.propTypes = {
    className: PropTypes.string
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

export default reduxForm({validate, form:"SigninForm"})(connect(mapStateToProps, {SigninAction})(Radium(SigninForm)));



