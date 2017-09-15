import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm } from 'redux-form';
import TextField from "./textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";
import {connect} from "react-redux";
import {signin as SigninAction} from "../actions/auth";
import {withRouter} from "react-router-dom";

const style = {
    marginLeft:{
        marginLeft: "5px"
    }
}

class SigninForm extends Component{
    constructor(props){
        super(props);
        this.state = {className: props.className};
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
       return ( <form onSubmit={handleSubmit(this.onSubmit)} className={this.state.className}>
            <TextField
                name="email"
                type="text"
                placeholder="Email"
            />
            <TextField
                style={style.marginLeft}
                name="password"
                type="password"
                placeholder="password"
            />
            <RaisedButton type="submit" style={style.marginLeft} backgroundColor="#5cb85c" label="Sign in" />
        </form>
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

export default reduxForm({validate, form:"SigninForm"})(connect(null, {SigninAction})(Radium(SigninForm)));



