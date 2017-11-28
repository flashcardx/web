import React, {Component} from "react";
import {connect} from "react-redux";
import Alert from "../components/util/alert.jsx";

class AlertContainer extends Component{

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

export default connect(mapStateToProps)(AlertContainer);