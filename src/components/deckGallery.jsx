import React, {Component} from 'react';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import config from "../api_config";
import InfiniteScroll from './util/infiniteScroll.jsx';
import Deck from "../components/deck.jsx";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import userDeckAdapter from "../adapters/userDeckAdapter.js";
const DECKS_PER_PAGE = 14;

const style = {
    deck:{
        padding: "0px",
        margin: "6px",
        display: "inline-block"
    },
    wordBreak:{
        whiteSpace: "-webkit-pre-wrap", /*Chrome & Safari */ 
        whiteSpace: "-pre-wrap",      /* Opera 4-6 */
        whiteSpace: "-o-pre-wrap",    /* Opera 7 */
        whiteSpace: "pre-wrap",       /* css-3 */
        wordWrap: "break-word",       /* Internet Explorer 5.5+ */
        wordBreak: "break-all",
        whiteSpace: "normal"
    }
}

class DeckGallery extends Component{

    constructor(props){
        super(props);
        this.state = {skip:0, isFetching: false, wasRendered: false};
        this.renderDecks = this.renderDecks.bind(this);
        this.renderDeck = this.renderDeck.bind(this);
        this.increasePage = this.increasePage.bind(this);
    }

    componentWillMount(){
       this.props.fetch(this.state.skip);
    }

    componentDidMount(){
        this.setState({wasRendered: true});
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.wasRendered != this.state.wasRendered)
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

    componentWillReceiveProps(nextProps){
        //the function could be called even when props didnt change, so we need to check before doing somehing nasty
        if(!_.isEqual(this.props,nextProps))
            this.setState({isFetching: false});
    }

    increasePage(){
        if(this.state.isFetching)
            return;
        this.setState({isFetching: true, skip:(this.state.skip+DECKS_PER_PAGE)}, ()=>{
            this.props.fetch(this.state.skip);
        });
    }

    renderDecks(decks, path){
        const parentId = deckPathAdapter.getLastIdFromPath(path);
        const decksArray = userDeckAdapter.getDecks(decks, parentId);
        if(this.state.wasRendered && _.isEmpty(decksArray))
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

    render(){
        if(!this.state.wasRendered && _.isEmpty(this.props.decks))
            return <p>Loading...</p>
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