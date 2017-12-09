import React, {Component} from "react";
import SelectDeckModal from "../components/selectDeckModal.jsx";
import {listDecksName} from "../actions/deck";
import {moveUserFlashcardToDeck} from "../actions/flashcard";
import {connect} from "react-redux";

class MoveUserFlashcardContainer extends Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(newDeckId, callback){
        const oldDeckId = this.props.deckId;
        const cardId = this.props.cardId;
        this.props.moveUserFlashcardToDeck(cardId, oldDeckId, newDeckId, callback);
    }

    render(){
        return (<SelectDeckModal
                confirmLabel="Mover aqui:"
                description="Mover a:"
                onSubmit={this.onSubmit}
                decksName={this.props.decksName}
                listDecks={this.props.listDecksName}
                onClose={this.props.onClose}
                buttonTitle="Mover aqui"
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


export default connect(mapStateToProps, {listDecksName, moveUserFlashcardToDeck})(MoveUserFlashcardContainer);
