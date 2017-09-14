import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import Alert from "../components/alert.jsx";
import {flushAlertsAction} from "../actions/alerts";

class AlertsDisplay extends Component{

    render(){
        const {alert} = this.props;
        if(!alert)
            return null;
        return <Alert msg={alert.msg} type={alert.type}/>;     
    }
}

function mapStateToProps(state){
    return {alert: state.alert};
}

export default connect(mapStateToProps)(AlertsDisplay);