import React, {Component} from "react";
import Radium from "radium";
import {connect} from "react-redux";
import _ from "lodash"
import {define} from "../actions/dictionary"
import {infoAlert} from "../actions/alerts"


const style = {
    marginRight:{
        marginRight: "7px"
    },
    marginTop:{
        marginTop: "20px"
    },
    btn:{
            cursor:"pointer",
            fontSize: "25px",
            ":hover":{
                color: "#f0d141"
            }
        }
}

class Dictionary extends Component{

    constructor(props){
        super(props);
        this.renderButton = this.renderButton.bind(this);
        this.define = this.define.bind(this);
        this.langIsAvailable = this.langIsAvailable.bind(this);
    }
    
    renderButton(){
        return (<span>
                <i className="fa fa-bolt" aria-hidden="true"
                    style={style.btn}
                    data-tip="Buscar definiciones"
                    onClick={this.define}>
                </i>            
            </span>);
    }

    define(){
        if(_.isEmpty(this.props.searchQuery))
            return this.props.infoAlert("Primero debes completar el nombre de tu ficha para poder buscar definiciones");
        this.props.define(this.props.lang, this.props.searchQuery);
    }

    langIsAvailable(){
        if(this.props.lang === "en")
            return true;
        return false;
    }

    render(){
        return (
            <div>
                        {this.renderButton()}
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.dictionaryDefinition !== this.props.dictionaryDefinition){
            if(_.isEmpty(nextProps.dictionaryDefinition.text)){
                this.props.infoAlert("No se encontro definición para el término");
            }
            else{
                this.props.onDefine(nextProps.dictionaryDefinition.text);
            }
        }
    }

}

function mapStateToProps(state){
    return {
        dictionaryDefinition: state.dictionaryDefinition
    }
}

export default connect(mapStateToProps, {define, infoAlert})(Radium(Dictionary));