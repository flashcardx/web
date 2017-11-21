import React, {Component} from "react";
import SelectDeck from "../components/selectDeck.jsx";
import {listDecksName} from "../actions/deck";
import {connect} from "react-redux";

class SelectDeckUserMoveContainer extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<SelectDeck
                decksName={this.props.decksName}
                listDecks={this.props.listDecksName}
                pathText="La ficha sera movida a la ruta:"
                onClose={this.props.onClose}
                buttonTitle="Mover"
                title={this.props.title}
                modalOpened={this.props.modalOpened}
                bigLoading={this.props.bigLoading}/>);
    }
}


function mapStateToProps(state){
    return {
        bigLoading: state.bigLoading,
        decksName: state.decksName
    }
}


export default connect(mapStateToProps, {listDecksName} )(SelectDeckUserMoveContainer);
