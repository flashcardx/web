import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {reSignin, emailVerification, verifySession} from "../actions/auth";

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

        componentWillReceiveProps(nextProps){
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

        componentWillReceiveProps(nextProps){
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


export function validateEmail(ComposedComponent, route){
    class Authenticate extends Component{

        componentWillMount(){
            const {id} = this.props.match.params;
            this.props.emailVerification(id);
        }

        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    return connect(null, {emailVerification, verifySession})(withRouter(Authenticate));
}
