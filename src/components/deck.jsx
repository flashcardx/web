import React, {Component} from "react";
import Radium from "radium";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CroppedImage from "./util/croppedImage.jsx";
import Truncate from "./util/truncate.jsx";
import language from "./util/language.js";
import {Link} from "react-router-dom";
import ImageGallery from "./imageGallery.jsx";
import EditUserDeckContainer from "../containers/editUserDeckContainer.jsx";
import AskConfirmation from "./util/askConfirmation.jsx";

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

    constructor(props){
        super(props);
        this.state = {deleteDeck: false};
    }

    render(){
        const {deck} = this.props;
        var img = {
            src: deck.img.src,
            onClick: ()=>this.props.pushToPath(deck._id, deck.name),
            style:{cursor:"pointer"}
        }
        return (
            <Card style={style.deck} className="col-lg-3 col-md-4 col-sm-12">
                <CardMedia>
                    <ImageGallery imgs={[img]}/>
                </CardMedia>
                <CardTitle titleStyle={{ wordBreak: "break-all" }} title={<a style={style.a} onClick={()=>this.props.pushToPath(deck._id, deck.name)}>{deck.name}</a>} subtitle={language(deck.lang)} />
                <CardText>
                    <Truncate>
                        <span style={style.wordBreak}>
                            {deck.description}
                        </span>
                    </Truncate>
                </CardText>
                <CardActions>
                    <div className="row">
                            <AskConfirmation onClose={()=>this.setState({deleteDeck:false})} show={this.state.deleteDeck} text="Cuidado: Si eliminas el mazo, todo el contenido que se encuentre dentro del mismo sera borrado de forma permanente" onConfirm={()=>{this.props.onDelete(deck._id);this.setState({deleteDeck:false})}}/>
                            <IconButton onClick={()=>this.setState({deleteDeck:true})} iconStyle={{ color: "red" }} data-tip="Delete" iconClassName="material-icons">
                                clear
                            </IconButton>
                        <EditUserDeckContainer deck={deck}/>
                    </div>
                </CardActions>
            </Card>
        );
    }
} 

export default Radium(Deck);