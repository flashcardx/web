import React, {Component} from 'react';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import config from "../api_config";
import InfiniteScroll from './util/infiniteScroll.jsx';
import Flashcard from "../components/flashcard.jsx";
import userDeckAdapter from "../adapters/userDeckAdapter.js";
const CLOUDFRONT_URL = config.cloudfrontUrl;
const CARDS_PER_PAGE = 14;

const style = {
    card:{
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

class FlashcardGallery extends Component{

    constructor(props){
        super(props);
        this.state = {skip:0, isFetching: false, wasRendered: false};
        this.renderCards = this.renderCards.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.increasePage = this.increasePage.bind(this);
    }

    componentWillMount(){
       this.props.fetch(this.state.skip);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.deckId != this.props.deckId)
            this.props.fetch(this.state.skip);
        //the function could be called even when props didnt change, so we need to check before doing somehing nasty
        if(!_.isEqual(this.props, nextProps))
            this.setState({isFetching: false});
    }

    componentDidMount(){
        this.setState({wasRendered: true});
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.wasRendered != this.state.wasRendered)
            return false;
        return true;
    }

    renderCard(card){
        if(!card)
            return null;
        return (
            <Flashcard lang={this.props.lang} key={card._id} onDelete={this.props.onDelete} deckId={this.props.deckId} card={card}/>
        );
    }
    
    increasePage(){
        if(this.state.isFetching)
            return;
        this.setState({isFetching: true, skip:(this.state.skip+CARDS_PER_PAGE)}, ()=>{
            this.props.fetch(this.state.skip);
        });
    }
    

    renderCards(cards){
        const parentId = this.props.deckId;
        if(this.state.wasRendered && _.isEmpty(cards))
            return <p>No tenes fichas en esta ruta :(</p>
        var renderedCards = [];
        cards.forEach(card=>{
            renderedCards.push(this.renderCard(card));
        });
        return (
                <InfiniteScroll onReachRight={()=>this.increasePage()} horizontal>
                     {renderedCards} 
                </InfiniteScroll>
        );
    }

    render(){
        if(!this.state.wasRendered && _.isEmpty(this.props.cards))
            return <p>Cargando...</p>
        return (            
            <div style={{overflow:"hidden"}}>
                {this.renderCards(this.props.cards)}
            </div>
        );
    }

}

FlashcardGallery.propTypes = {
    cards: PropTypes.array.isRequired,
    deckId: PropTypes.string.isRequired,
    fetch: PropTypes.func.isRequired
}

export default Radium(FlashcardGallery);