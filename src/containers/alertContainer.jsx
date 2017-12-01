import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import Alert from "../components/util/alert.jsx";
import {flushAlertsAction} from "../actions/alerts";

class AlertContainer extends Component{

    render(){
        const {alert} = this.props;
        if(!alert)
            return null;
        return <Alert msg={alert.msg} time={alert.time} theme={alert.theme} type={alert.type}/>;     
    }
}

function mapStateToProps(state){
    return {alert: state.alert};
}

export default connect(mapStateToProps)(AlertContainer);