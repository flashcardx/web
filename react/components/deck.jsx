import React, {Component} from "react";
import Radium from "radium";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CroppedImage from "./util/croppedImage.jsx";
import Truncate from "./util/truncate.jsx";
import language from "./util/language.js";
import {Link} from "react-router-dom";

const style = {
    deck: {
        padding: "0px",
        margin: "6px",
        display: "inline-block",
        minWidth: "180px"
    },
    wordBreak: {
        whiteSpace: "-webkit-pre-wrap", /*Chrome & Safari */
        whiteSpace: "-pre-wrap",      /* Opera 4-6 */
        whiteSpace: "-o-pre-wrap",    /* Opera 7 */
        whiteSpace: "pre-wrap",       /* css-3 */
        wordWrap: "break-word",       /* Internet Explorer 5.5+ */
        wordBreak: "break-all",
        whiteSpace: "normal"
    },
    a:{
        cursor: "pointer",
        color: "#4286f4",
        ":hover":{
            textDecoration: "underline"
        }
    }
}

class Deck extends Component{

    render(){
        const {deck} = this.props;
        return (
            <Card style={style.deck} className="col-lg-3 col-md-4 col-sm-12">
                <CardMedia>
                    <CroppedImage style={{cursor:"pointer"}}
                                  onClick={()=>this.props.pushDeck(deck._id, deck.name)}
                                  width="auto" height="200px"
                                  src={deck.thumbnail.src} />
                </CardMedia>
                <CardTitle titleStyle={{ wordBreak: "break-all" }} title={<a style={style.a} onClick={()=>this.props.pushDeck(deck._id, deck.name)}>{deck.name}</a>} subtitle={language(deck.lang)} />
                <CardText>
                    <Truncate>
                        <span style={style.wordBreak}>
                            {deck.description}
                        </span>
                    </Truncate>
                </CardText>
                <CardActions>
                    <IconButton onClick={()=>this.props.onDelete(deck._id)} iconStyle={{ color: "red" }} data-tip="Delete" iconClassName="material-icons">
                        clear
                    </IconButton>
                    <IconButton iconStyle={{ color: "#FF664C" }} data-tip="Edit" iconClassName="material-icons">
                        create
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
} 

export default Radium(Deck);