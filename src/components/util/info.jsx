import React, {Component} from "react"
import {connect} from "react-redux"
import {infoAlert} from "../../actions/alerts.js"

class Info extends Component{

    constructor(props){
        super(props);
        this.show = this.show.bind(this);
    }

    show(){
       this.props.infoAlert(this.props.text, this.props.time || 13000);
    }

    render(){
        return  <i onClick={this.show} style={{cursor:"pointer", margin:"5px", ...this.props.style}} className="fa fa-info-circle" aria-hidden="true"></i>
    }
        
}



export default connect(null, {infoAlert})(Info);