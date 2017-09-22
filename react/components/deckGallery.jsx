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
import ReactList from 'react-list';

const style = {
    deck:{
        padding: "0px",
        margin: "6px",
        display: "inline-block"
    },
    gallery:{
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
         webkitScrollbar:{
            display: "none"
        }
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
        this.state = {skip:0};
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
            img = CLOUDFRONT_URL + deck.thumbnail;
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

    renderDecks(decks, path){
        var parentId;
        console.log("decks: ", decks);
        if(path.length != 0){
            parentId = path.pop().id;
        }
        if(!parentId){
            var decksArray = [];
            _.forEach(decks, d=>{
                 decksArray.push(this.renderDeck(d));
            })
            return (
                <div style={style["gallery"]}>
                    {decksArray} 
                </div>
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