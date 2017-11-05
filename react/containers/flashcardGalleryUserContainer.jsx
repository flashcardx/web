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
        console.log("decks are: ", this.props.decks);
        const cards = userDeckAdapter.getCards(this.props.decks, this.props.deckId);
        console.log("cards", cards);
        return (
                <FlashcardGallery deckId={this.props.deckId}
                                  fetch={this.fetchCards}
                                  cards={cards}/> 
        );
    }
}

export default connect(null, {fetchUserCards})(FlashcardGalleryUserContainer);