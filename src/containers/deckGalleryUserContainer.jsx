import React, {Component} from "react";
import {connect} from "react-redux";
import DeckGallery from "../components/deckGallery.jsx";
import {fetchUserDecks} from "../actions/deck.js";

class DeckGalleryUserContainer extends Component{

    constructor(props){
        super(props);
        this.fetchDecks = this.fetchDecks.bind(this);
    }

    fetchDecks(skip){
        this.props.fetchUserDecks(skip, this.props.path);
    }

    render(){
        return (
                <DeckGallery pushToPath={this.props.pushToPath}
                             onDelete={this.props.onDelete}
                             path={this.props.path}
                             isFetching={this.props.isFetching}
                             fetch={this.fetchDecks}
                             decks={this.props.decks}/> 
        );
    }
}

function mapStateToProps(state){
    return {
        isFetching: state.isFetching.decks
    }
}

export default connect(mapStateToProps, {fetchUserDecks})(DeckGalleryUserContainer);