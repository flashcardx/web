import React, {Component} from "react";
import Radium from "radium";
import _ from "lodash";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CroppedImage from "./util/croppedImage.jsx";
import Truncate from "./util/truncate.jsx";
import language from "./util/language.js";
import {Link} from "react-router-dom";
import ImageGallery from "./imageGallery.jsx";

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
    }
}


class Flashcard extends Component{
    

    renderTitle(card){
        return (<div className="row">
                    <div className="col-8">
                        {card.name}
                        <i style={{fontSize:"18px", margin:"10px"}} className="fa fa-volume-up" aria-hidden="true"></i>
                    </div>
                </div>);
    }

    generateImgs(imgs){
        var r = [];
        imgs.forEach(img=>{
            r.push({src: img.url});
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
                    <IconButton onClick={()=>this.props.onDelete(card._id)} iconStyle={{ color: "red" }} data-tip="Delete" iconClassName="material-icons">
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

export default Radium(Flashcard);