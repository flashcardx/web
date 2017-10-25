import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import config from "../../config";
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import Card from "../components/card.jsx";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
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

class CardGallery extends Component{

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
        /*
        if(card.thumbnail)
            card.thumbnail.src = CLOUDFRONT_URL + deck.thumbnail.hash;
        else
            card.thumbnail = {src:"/assets/img/default.jpg"};
        */
        return (
            <Card key={deck._id} pushToPath={this.props.pushToPath} onDelete={this.props.onDelete} card={card}/>
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
        this.setState({isFetching: true, skip:(this.state.skip+CARDS_PER_PAGE)}, ()=>{
            this.props.fetch(this.state.skip);
        });
    }

    renderCards(cards){
        const parentId = this.props.deckId;
        if(this.state.wasRendered && _.isEmpty(cards))
            return <p>You don't have cards in this location :(</p>
        var renderedCards = [];
        cards.forEach(card=>{
            renderedCards.push(this.renderDeck(card));
        });
        return (
                <InfiniteScroll onReachRight={()=>this.increasePage()} horizontal>
                     {renderedCards} 
                </InfiniteScroll>
        );
    }

    render(){
        if(!this.state.wasRendered && _.isEmpty(this.props.cards))
            return <p>Loading...</p>
        return (            
            <div style={{overflow:"hidden"}}>
                {this.renderCards(this.props.cards, this.props.path)}
            </div>
        );
    }

}

CardGallery.propTypes = {
    cards: PropTypes.array.isRequired,
    deckId: PropTypes.string.isRequired,
    fetch: PropTypes.func.isRequired
}

export default Radium(CardGallery);