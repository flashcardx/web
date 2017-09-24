import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";
import _ from "lodash";
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Truncate from "./util/truncate.jsx";
import config from "../../config";
const CLOUDFRONT_URL = config.cloudfrontUrl;
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
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

    renderLang(code){
        switch (code) {
            case "en": return "English";
            case "es": return "Español";
            default:
                return "not available";
        }
    }

    renderDeck(deck){
        var img;
        if(deck.thumbnail)
            img = CLOUDFRONT_URL + deck.thumbnail.hash;
        else
            img= "/assets/img/default.jpg";
        return (
             <Card style={style.deck} className="col-lg-3 col-md-4 col-sm-12" key={deck._id}>
                    <CardMedia>
                    <img src={img} alt="no img" />
                    </CardMedia>
                    <CardTitle titleStyle={{wordBreak: "break-all"}} title={deck.name} subtitle={this.renderLang(deck.lang)}/>
                    <CardText>
                        <Truncate>
                            <span style={style.wordBreak}>
                                {deck.description}
                            </span>
                        </Truncate>
                    </CardText>
                     <CardActions>
                        <FlatButton label="Delete"/>
                        <FlatButton label="Duplicate"/>
                     </CardActions>
            </Card>
        );
    }


    componentWillReceiveProps(nextProps){
        //the function could be called even when props didnt change, so we need to check before doing somehing crazy
        if(!_.isEqual(this.props,nextProps)){
            this.setState({isFetching: false});
        }
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
        var parentId;
        if(path.length != 0){
            parentId = path.pop().id;
        }
        if(!parentId){
            var decksArray = [];
            _.forEachRight(decks, d=>{
                 decksArray.push(this.renderDeck(d));
            })
            return (
                <InfiniteScroll onReachRight={()=>this.increasePage()} horizontal>
        	            {decksArray} 
                </InfiniteScroll>
            );
        }
        return <p>Holis</p>
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