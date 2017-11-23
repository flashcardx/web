import React, {Component} from "react";
import {connect} from "react-redux";
import FlashcardGallery from "../components/flashcardGallery.jsx";
import {fetchUserCards} from "../actions/flashcard.js";
import userDeckAdapter from "../adapters/userDeckAdapter";


class FlashcardGalleryUserContainer extends Component{

    constructor(props){
        super(props);
        var lang = userDeckAdapter.getLang(this.props.decks, this.props.deckId);
        this.state = {lang: lang};
        this.fetchCards = this.fetchCards.bind(this);
    }

    fetchCards(skip){
        this.props.fetchUserCards(skip, this.props.deckId);
    }

    render(){
        if(!this.props.deckId)
            return null;
        const cards = userDeckAdapter.getCards(this.props.decks, this.props.deckId);
        return (
                <FlashcardGallery 
                                  lang={this.state.lang}
                                  deckId={this.props.deckId}
                                  onDelete={this.props.onDelete}
                                  fetch={this.fetchCards}
                                  cards={cards}/> 
        );
    }
}

function mapStateToProps(state){
    return {
        decks: state.userDecks
    }
}

export default connect(mapStateToProps, {fetchUserCards})(FlashcardGalleryUserContainer);