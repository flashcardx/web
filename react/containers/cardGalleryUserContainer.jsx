import React, {Component} from "react";
import {connect} from "react-redux";
import CardGallery from "../components/cardGallery.jsx";
import {fetchUserCards} from "../actions/card.js";
import userPathAdapter from "../adapters/deckPathAdapter";

class CardGalleryUserContainer extends Component{

    constructor(props){
        super(props);
        this.fetchCards = this.fetchCards.bind(this);
    }

    fetchCards(skip){
        const deckId = userPathAdapter.getLastIdFromPath(this.props.path);
        this.props.fetchUserCards(skip, deckId);
    }

    render(){
        const deckId = userPathAdapter.getLastIdFromPath(this.props.path);
        if(!deckId)
            return null;
        return (
                <CardGallery pushToPath={this.props.pushToPath}
                             onDelete={this.props.onDelete}
                             deckId={deckId}
                             fetch={this.fetchCards}
                             cards={[]}/> 
        );
    }
}

export default connect(null, {fetchUserCards})(CardGalleryUserContainer);