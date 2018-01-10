import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ImageGallery from "./imageGallery.jsx";
import MoveUserFlashcardContainer from "../containers/moveUserFlashcardContainer.jsx";
import SpeakerTTSContainer from "../containers/speakerTTSContainer.jsx";
import Formsy from 'formsy-react';
import {MyOwnInput} from "./util/form.jsx";
import FlatButton from 'material-ui/FlatButton';
import GreenButton from "./util/greenButton"
import Responsive from 'react-responsive';
import CardFlip from './util/flippable';
import FlashcardActions from "./flashcardActions"

const style = {
    card: {
        display: "inline-block",
        width: "250px",
        bottom: 0
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
        wordBreak: "break-all"
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
        this.state = {openEditModal:false, isFlipped: false};
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.renderNameInput = this.renderNameInput.bind(this);
        this.submitNamePractice = this.submitNamePractice.bind(this);
        this.handleFlip = this.handleFlip.bind(this)
        this.renderSide1 = this.renderSide1.bind(this)
        this.renderSide2 = this.renderSide2.bind(this)
    }

    handleFlip(e) {
        e.preventDefault();
        this.setState({ isFlipped: !this.state.isFlipped });
    }

    renderNameInput(){
        return  <div className="row">
                    <Formsy.Form ref="form" style={{width:"100%"}} className="col" onValidSubmit={this.submitNamePractice}> 
                            <MyOwnInput
                                name="title"
                                required
                                autoFocus
                                value={this.props.nameImput}
                                onEnter={()=>this.refs.form.submit()}
                                onChange={this.props.onNameChange}
                                style={{overflow:"hidden", width:"100%"}}
                                placeholder="Completa el nombre"
                            />
                    </Formsy.Form>
                </div> 
    }


    renderTitle(card){
        return (<div className="row">
                    <div style={{whiteSpace: "pre-line", wordBreak: "break-all" }} className="col-9">
                        {card.name}
                        <SpeakerTTSContainer src={card.TTSSrc}/>
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

    submitNamePractice(){
        this.props.submitName(this.props.nameImput)
    }

    renderSide1(){
        const {card} = this.props;
        var title = (this.props["practice-stage"]===1)? this.renderNameInput() :this.renderTitle(card);
        var imgs = this.generateImgs(card.imgs);
        return <span>
                <MoveUserFlashcardContainer deckId={this.props.deckId} cardId={card._id} title="Mover ficha" onClose={this.closeEditModal} modalOpened={this.state.openEditModal} editModal={this.state.editModal}/>
                <Card style={style.card}>
                    <CardMedia>
                        <ImageGallery imgs={imgs}/>
                    </CardMedia>
                    <CardTitle style={{paddingBottom:"0px", paddingRight:"8px", paddingLeft:"8px"}} titleStyle={{wordBreak: "break-all" }} title={title} />
                    <CardActions>
                        {(this.props["practice-stage"]===1)?
                            <GreenButton onClick={this.submitNamePractice} disabled={!this.props.nameImput} className="col" label="Confirmar" />
                            :
                            (this.props["practice-stage"]===2)?
                                <Responsive minWidth={700}>
                                    {(matches) => {
                                        if (matches) {
                                            return <FlatButton keyboardFocused disabled={this.props.bigLoading} onClick={this.props.onContinue} hoverColor="#346bc3" backgroundColor="#4286f4" className="col" label="Continuar" />
                                        } else {
                                            return <FlatButton disabled={this.props.bigLoading} onClick={this.props.onContinue} hoverColor="#346bc3" backgroundColor="#4286f4" className="col" label="Continuar" />
                                        }
                                    }}
                                </Responsive>
                            :
                            <FlashcardActions
                                onDelete={()=>this.props.onDelete(card._id)}
                                onFlip={()=>this.cardFlip.flip()}
                                edit={{deckId: this.props.deckId, card}}
                            />
                        }
                    </CardActions>
            </Card>
        </span>
    }

    renderSide2(){
        const {card} = this.props;
        return <span>
                    <MoveUserFlashcardContainer deckId={this.props.deckId} cardId={card._id} title="Mover ficha" onClose={this.closeEditModal} modalOpened={this.state.openEditModal} editModal={this.state.editModal}/>
                    <Card style={style.card}>
                        <CardText>
                            <div style={{height:"200px", overflowX:"hidden", overflowY:"auto"}}>
                                <span style={style.wordBreak}>
                                    {(this.props["practice-stage"]===1?  this.hideName(card.description) : card.description)||"No hay descipción."}
                                </span>
                            </div>
                        </CardText>
                        <CardActions>
                            {(this.props["practice-stage"]===1)?
                                <GreenButton onClick={this.submitNamePractice} disabled={!this.props.nameImput} className="col" label="Confirmar" />
                                :
                                (this.props["practice-stage"]===2)?
                                    <Responsive minWidth={700}>
                                        {(matches) => {
                                            if (matches) {
                                                return <FlatButton keyboardFocused disabled={this.props.bigLoading} onClick={this.props.onContinue} hoverColor="#346bc3" backgroundColor="#4286f4" className="col" label="Continuar" />
                                            } else {
                                                return <FlatButton disabled={this.props.bigLoading} onClick={this.props.onContinue} hoverColor="#346bc3" backgroundColor="#4286f4" className="col" label="Continuar" />
                                            }
                                        }}
                                    </Responsive>
                                :
                                <FlashcardActions
                                onDelete={()=>this.props.onDelete(card._id)}
                                onFlip={()=>this.cardFlip.flip()}
                                edit={{deckId: this.props.deckId, card}}
                                />
                            }
                        </CardActions>
                    </Card>
            </span>
    }

    render(){
        return <CardFlip ref={ref=>{ this.cardFlip = ref }} isFlipped={false}>
                    {this.renderSide1()}
                    {this.renderSide2()}
            </CardFlip>
    }
} 

export default connect(null, {})(Radium(Flashcard));