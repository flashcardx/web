import React, {Component} from "react";
import Navbar from "./navbar.jsx";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Redirect } from "react-router";
import {withRouter} from 'react-router-dom';
import DocumentTitle from "react-document-title";

class Page extends Component{

    constructor(props){
        super(props);
        this.state = {name: props.name, redirect:null};
        this.isAlreadyInRedirectPage = this.isAlreadyInRedirectPage.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.redirect !== nextProps.redirect)
            this.setState({redirect: nextProps.redirect.path});
    }

    isAlreadyInRedirectPage(){
        return this.props.location.pathname === this.state.redirect
    }

    render(){
        if(this.state.redirect && !this.isAlreadyInRedirectPage())
            return <Redirect push to={this.state.redirect}/>
        var title = "FlashcardX";
        if(this.props.title)
            title = this.props.title + " - " + title;
        return (     
            <DocumentTitle title={title}>
                <span>
                    <Navbar active={this.state.name}/>
                    <div style={this.props.style} className={this.props.noWrap?null:"container"}>
                        {this.props.children}
                    </div>
                </span>
            </DocumentTitle>   
        );
    }
}

Page.propTypes = {
    name: PropTypes.string.isRequired
}

function mapStateToProps(state){
    return {
        redirect: state.redirect
    }
}

export default connect(mapStateToProps, {})(withRouter(Page));