import React, {Component} from "react";
import {connect} from "react-redux";
import DeckGallery from "../components/deckGallery.jsx";
import {fetchUserDecks} from "../actions/deck.js";

class Container extends Component{

    constructor(props){
        super(props);
        this.fetchDecks = this.fetchDecks.bind(this);
    }

    fetchDecks(skip){
        this.props.fetchUserDecks(this.props.parentId, skip, this.props.path);
    }

    render(){
        return (
                <DeckGallery pushDeck={this.props.pushDeck} onDelete={()=>{}} path={this.props.path} fetch={this.fetchDecks} decks={this.props.decks}/> 
        );
    }
}

export default connect(null, {fetchUserDecks})(Container);