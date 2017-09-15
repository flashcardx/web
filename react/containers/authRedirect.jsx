import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {reSignin} from "../actions/auth";

export function requireAuth(ComposedComponent, route){
    class Authenticate extends Component{

        componentWillMount(){
            if(!this.props.isAuthenticated){
                if(!localStorage.getItem("jwt"))
                    return this.props.history.push(route);
                else
                    this.props.reSignin();
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated)
                return this.props.history.push(route);
        }

        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {isAuthenticated: state.isAuthenticated};
    }

    return connect(mapStateToProps, {reSignin})(withRouter(Authenticate));
}

export function redirectIfAuth(ComposedComponent, route){
    class Authenticate extends Component{

        componentWillMount(){
        if(this.props.isAuthenticated)
                return this.props.history.push(route);
        }

        componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated)
                return this.props.history.push(route);
        }

        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {isAuthenticated: state.isAuthenticated};
    }

    return connect(mapStateToProps)(withRouter(Authenticate));
}
