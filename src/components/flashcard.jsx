import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Truncate from "./util/truncate.jsx";
import ImageGallery from "./imageGallery.jsx";
import MoveUserFlashcardContainer from "../containers/moveUserFlashcardContainer.jsx";
import EditUserFlashcardContainer from "../containers/editUserFlashcardContainer.jsx";
import {} from "../actions/audio";
import SpeakerLangContainer from "../containers/speakerLangContainer.jsx";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import GreenButton from "./util/greenButton"
const style = {
    card: {
        padding: "0px",
        margin: "6px",
        display: "inline-block",
        minWidth: "180px"
    },
    wordBreak: {
        // eslint-disable-next-line
        whiteSpace: "-webkit-pre-wrap", /*Chrome & Safari */
        // eslint-disable-next-line
        whiteSpace: "-pre-wrap",      /* Opera 4-6 */
        // eslint-disable-next-line
        whiteSpace: "-o-pre-wrap",    /* Opera 7 */
        // eslint-disable-next-line
        whiteSpace: "pre-wrap",       /* css-3 */
        wordWrap: "break-word",       /* Internet Explorer 5.5+ */
        wordBreak: "break-all",
        // eslint-disable-next-line
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
    
    constructor(props){
        super(props);
        this.state = {openEditModal:false};
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.renderNameInput = this.renderNameInput.bind(this);
    }

    renderNameInput(){
        return  <div className="row">
                    <div style={{width:"100%"}} className="col">
                        <TextField
                            value={this.props.nameImput}
                            onChange={this.props.onNameChange}
                            style={{overflow:"hidden", width:"100%"}}
                            hintText="Completa el nombre"
                        />
                    </div>
                </div> 
    }


    renderTitle(card){
        return (<div className="row">
                    <div style={{whiteSpace: "pre-line", wordBreak: "break-all" }} className="col-9">
                        {card.name}
                        <SpeakerLangContainer lang={this.props.lang} text={card.name}/>
                    </div>
                    {
                    this.props["practice-stage"]? null
                    :
                    <div style={{whiteSpace: "pre-line", wordBreak: "break-all" }} className="col-3">
                         <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                >
                                <MenuItem primaryText="Mover" onClick={this.openEditModal}
                                />
                        </IconMenu>
                    </div>             
                    }
                </div>);
    }

    generateImgs(imgs){
        var r = [];
        imgs.forEach(img=>{
            r.push({src: img.src});
        });
        return r;
    }

    openEditModal(){
        this.setState({openEditModal: true});
    }

    closeEditModal(){
        this.setState({openEditModal: false});
    }

    hideName(description){
        description = description.replace(new RegExp(this.props.card.name, "gi"), "<span class='blur noselect'>"+this.props.card.name+"</span>");
        return <span dangerouslySetInnerHTML={{__html:description}}></span>
    }

    render(){
        const {card} = this.props;
        var title = (this.props["practice-stage"]===1)? this.renderNameInput() :this.renderTitle(card);
        var imgs = this.generateImgs(card.imgs);
        return (
            <span>
                    <MoveUserFlashcardContainer deckId={this.props.deckId} cardId={card._id} title="Mover ficha" onClose={this.closeEditModal} modalOpened={this.state.openEditModal} editModal={this.state.editModal}/>
                    <Card style={style.card} className="col-lg-3 col-md-4 col-sm-12">
                        <CardMedia>
                            <ImageGallery imgs={imgs}/>
                        </CardMedia>
                        <CardTitle style={{paddingBottom:"0px", paddingRight:"8px", paddingLeft:"8px"}} titleStyle={{wordBreak: "break-all" }} title={title} />
                        <CardText>
                            <Truncate>
                                <span style={style.wordBreak}>
                                    {this.props["practice-stage"]===1?  this.hideName(card.description) : card.description}
                                </span>
                            </Truncate>
                        </CardText>
                        <CardActions>
                            {(this.props["practice-stage"]===1)?
                                <GreenButton onClick={this.props.submitName} disabled={!this.props.nameImput} className="col" label="Confirmar" />
                                :
                                (this.props["practice-stage"]===2)?
                                <FlatButton disabled={this.props.bigLoading} onClick={this.props.onContinue} hoverColor="#346bc3" backgroundColor="#4286f4" className="col" label="Continuar" />
                                :
                                <div className="row">
                                    <IconButton onClick={()=>this.props.onDelete(card._id)} iconStyle={{ color: "red" }} data-tip="Delete" iconClassName="material-icons">
                                        clear
                                    </IconButton>
                                    <EditUserFlashcardContainer
                                    deckId={this.props.deckId}
                                    card={card}/>
                                </div>
                            }
                        </CardActions>
                    </Card>
            </span>
        );
    }
} 

export default connect(null, {})(Radium(Flashcard));