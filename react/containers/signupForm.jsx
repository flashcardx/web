import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm } from 'redux-form';
import TextField from "../components/util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";
import {connect} from "react-redux";
import {signup as SignupAction} from "../actions/auth";

const style = {
    borderForm:{
        border: "1px solid gray",
        paddingTop: "8px"
    }
} 
class SignupForm extends Component{

    constructor(props){
        super(props);
        this.captchaExecute = props.captchaExecute.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        this.captchaExecute(key=>{
            this.props.SignupAction(values, key);
        });
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className={this.props.className} style={style.borderForm}>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="email"
                                                type="email"
                                                placeholder="Your email"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="name"
                                                type="text"
                                                placeholder="Your awesome name"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                style={style.marginLeft}
                                                name="password"
                                                type="password"
                                                placeholder="What will be your Password?"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                style={style.marginLeft}
                                                name="password2"
                                                type="password"
                                                placeholder="Confirm password"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-12">
                                        <RaisedButton disabled={this.props.bigLoading} type="submit" backgroundColor="#5cb85c" label="Sign up!" />
                                    </div>
                                </div>
                        </form>
        );
    }
}

function validate({email, name, password, password2}){
    var errors = {};
    if(!email)
        errors.email = "Please enter an email, it is in good hands";
    if(!name || name.length < 4)
        errors.name = "mmm... Your name must at least 4 characters";
    if(!password || password.length < 4)
        errors.password ="Be careful! You need a password with at least 4 characters long";
    if(password !== password2)
        errors.password2 = "Oops! Password and confirmation password must be the same ;)";
    return errors;
}

SignupForm.propTypes = {
    className: PropTypes.string
}

function mapStateToProps(state){
    return {signupMsg: state.signupMsg, bigLoading: state.bigLoading};
}

export default reduxForm({validate, form:"SignupForm"})(connect(mapStateToProps, {SignupAction})(Radium(SignupForm)));
