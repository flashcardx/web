import React, {Component} from "react"
import Radium from "radium";
import {connect} from "react-redux"
import config from "../../api_config";
const GOOGLE_CLIENTID = config.googleClientId;


class GoogleOneTapSign extends Component{

    constructor(props){
        super(props)
        this.init = this.init.bind(this)

    }

    componentDidMount(){
        this.init()
    }

    init(){
       
    }

    render(){
        <span>
        </span>
    }
}

export default connect(null, {})(Radium(GoogleOneTapSign));