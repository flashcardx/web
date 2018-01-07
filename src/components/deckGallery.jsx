import React, {Component} from 'react';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import InfiniteScroll from './util/infiniteScroll.jsx';
import Deck from "../components/deck.jsx";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import userDeckAdapter from "../adapters/userDeckAdapter.js";
const DECKS_PER_PAGE = 14;

class DeckGallery extends Component{

    constructor(props){
        super(props);
        this.state = {skip:0, wasRendered: false};
        this.renderDecks = this.renderDecks.bind(this);
        this.renderDeck = this.renderDeck.bind(this);
        this.increasePage = this.increasePage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentWillMount(){
       this.props.fetch(this.state.skip);
    }

    componentDidMount(){
        this.setState({wasRendered: true});
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.wasRendered !== this.state.wasRendered)
            return false;
        return true;
    }

    renderDeck(deck){
        if(!deck)
            return null;
        return (
            <span key={deck._id}>
                <Deck pushToPath={this.props.pushToPath} onDelete={this.props.onDelete} deck={deck}/>
            </span>
        );
    }
    increasePage(){
        if(this.props.isFetching)
            return;
        this.setState({skip:(this.state.skip+DECKS_PER_PAGE)}, ()=>{
            this.props.fetch(this.state.skip);
        });
    }

    renderDecks(decks, path){
        const parentId = deckPathAdapter.getLastIdFromPath(path);
        const decksArray = userDeckAdapter.getDecks(decks, parentId);
        if(_.isEmpty(decksArray))
            return <p>Parece que no tenes mazos en esta ruta :(</p>
        var renderedDecks = [];
        decksArray.forEach(deck=>{
            renderedDecks.push(this.renderDeck(deck));
        });
        return (
                <InfiniteScroll onReachRight={()=>this.increasePage()} horizontal>
                     {renderedDecks} 
                </InfiniteScroll>
        );
    }

    isLoading(){
        const parentId = deckPathAdapter.getLastIdFromPath(this.props.path);
        const decksArray = userDeckAdapter.getDecks(this.props.decks, parentId);
        return (!this.state.wasRendered || this.props.isFetching) && ( _.isEmpty(this.props.decks) || _.isEmpty(decksArray) )
    }

    render(){
        if( this.isLoading() )
            return <p>Obteninedo mazos...</p>
        return (            
            <div style={{overflow:"hidden"}}>
                {this.renderDecks(this.props.decks, this.props.path)}
            </div>
        );
    }
}

DeckGallery.propTypes = {
    decks: PropTypes.object.isRequired,
    path: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired
}

export default Radium(DeckGallery);