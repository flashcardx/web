import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import config from "../../config";
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import CroppedImage from "../components/util/croppedImage.jsx";
import Deck from "../components/deck.jsx";
const CLOUDFRONT_URL = config.cloudfrontUrl;
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
        this.state = {skip:0, isFetching: false};
    }

    componentWillMount(){
        this.props.fetch(this.state.skip);
    }

    renderDeck(deck){
        console.log("deck: ", deck);
        if(deck.thumbnail)
            deck.thumbnail.src = CLOUDFRONT_URL + deck.thumbnail.hash;
        else
            deck.thumbnail = {src:"/assets/img/default.jpg"};
        return (
            <span key={deck._id}>
                <Deck pushDeck={this.props.pushDeck} onDelete={this.props.onDelete}deck={deck}/>
            </span>
        );
    }


    componentWillReceiveProps(nextProps){
        //the function could be called even when props didnt change, so we need to check before doing somehing nasty
        if(!_.isEqual(this.props,nextProps)){
            this.setState({isFetching: false});
            this.props.fetch(this.state.skip);
        }
        const {path} = nextProps;
        var parentId = null;
        if(path.length != 0)
            parentId = path[path.length-1];
        this.props.setParentId(parentId);
    }


    increasePage(){
        if(this.state.isFetching){
            return;
        }
        this.setState({isFetching: true, skip:(this.state.skip+DECKS_PER_PAGE)}, ()=>{
            this.props.fetch(this.state.skip);
        });
    }

    renderDecks(decks, path){
        var decksArray = [];
        if(path.length != 0){
            console.log("path: ", path);
            path.forEach(p=>{
                decks = decks[p.id].decks;            
            });
        }
        console.log("decks: ", decks);
        _.forEachRight(decks, d=>{
                 decksArray.push(this.renderDeck(d));
        })
        return (
            <InfiniteScroll onReachRight={()=>this.increasePage()} horizontal>
        	        {decksArray} 
            </InfiniteScroll>
        );
    }

    render(){
        if(_.isEmpty(this.props.decks))
            return <p>You don't have decks :(</p>
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