import React, {Component} from "react";
import Radium from "radium";
import _ from "lodash";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CroppedImage from "./util/croppedImage.jsx";
import Truncate from "./util/truncate.jsx";
import language from "./util/language.js";
import {Link} from "react-router-dom";
import ImageGallery from "./imageGallery.jsx";
import EditUserFlashcardContainer from "../containers/editUserFlashcardContainer.jsx";

const style = {
    card: {
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
    },
    speaker:{
        fontSize:"18px",
        marginLeft:"10px",
        cursor:"pointer",
        ":hover":{
            color:"red"
        }
    }
}


class Flashcard extends Component{
    

    renderTitle(card){
        return (<div className="row">
                    <div className="col-9">
                        {card.name}
                        <i style={style.speaker} className="fa fa-volume-up" aria-hidden="true"></i>
                    </div>
                    <div className="col-3">
                         <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                >
                                <MenuItem primaryText="Mover" />
                        </IconMenu>
                    </div>           
                    
                </div>);
    }

    generateImgs(imgs){
        var r = [];
        imgs.forEach(img=>{
            r.push({src: img.src});
        });
        return r;
    }

    render(){
        const {card} = this.props;
        var title = this.renderTitle(card);
        var imgs = this.generateImgs(card.imgs);
        return (
            <Card style={style.card} className="col-lg-3 col-md-4 col-sm-12">
                <CardMedia>
                    <ImageGallery imgs={imgs}/>
                </CardMedia>
                <CardTitle style={{paddingBottom:"0px", paddingLeft:"0px", paddingRight:"8px", paddingLeft:"8px"}} titleStyle={{wordBreak: "break-all" }} title={title} />
                <CardText>
                    <Truncate>
                        <span style={style.wordBreak}>
                            {card.description}
                        </span>
                    </Truncate>
                </CardText>
                <CardActions>
                    <div className="row">
                        <IconButton onClick={()=>this.props.onDelete(card._id)} iconStyle={{ color: "red" }} data-tip="Delete" iconClassName="material-icons">
                            clear
                        </IconButton>
                        <EditUserFlashcardContainer
                        deckId={this.props.deckId}
                        card={card}/>
                    </div>
                </CardActions>
            </Card>
        );
    }
} 

export default Radium(Flashcard);