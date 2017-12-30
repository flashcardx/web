import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {signout} from "../actions/auth";
import {Redirect} from 'react-router';

class Signout extends Component{

    componentWillMount(){
        this.props.signout();
    }

    render(){
        return  <Redirect push to="/landing"/>
    }
}

function mapStateToProps(state){
    if(!state.user)
        return {username:"Humano"}
    var name = getFirstName(state.user.name);
    return {username: name};
}

function getFirstName(name){
    if(!name)
        return "Humano";
    return name.split(' ')[0];
}


export default connect(mapStateToProps, {signout})(Radium(Signout));

