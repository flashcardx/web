import React, {Component} from "react";
import {connect} from "react-redux";
import FlashcardGallery from "../components/flashcardGallery.jsx";
import {fetchUserCards} from "../actions/card.js";
import userDeckAdapter from "../adapters/userDeckAdapter";


class FlashcardGalleryUserContainer extends Component{

    constructor(props){
        super(props);
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
                <FlashcardGallery deckId={this.props.deckId}
                                  onDelete={this.props.onDelete}
                                  fetch={this.fetchCards}
                                  cards={cards}/> 
        );
    }
}

export default connect(null, {fetchUserCards})(FlashcardGalleryUserContainer);