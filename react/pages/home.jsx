import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";

class Home extends Component{

    componentWillMount(){
        this.props.getUserInfo();
    }

    render(){
        return (
            <Page name="my collection">
                home
            </Page>
        );
    }
}

export default connect(null, {getUserInfo})(Radium(Home));