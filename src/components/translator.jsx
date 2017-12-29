import React, {Component} from "react";
import Radium from "radium";
import {connect} from "react-redux";
import Modal from "./util/modal.jsx";
import _ from "lodash"
import {MyOwnInput, MyOwnSelect} from "./util/form.jsx";
import FlatButton from 'material-ui/FlatButton';
import {translate, updateTranslatorPreferencesTo, updateTranslatorPreferencesFrom} from "../actions/translator"
import Formsy from 'formsy-react';
import {langs} from "./util/language.js";
import IconButton from 'material-ui-next/IconButton';
import SwapIcon from 'material-ui-icons/SwapHoriz';
import SpeakerTTSContainer from "../containers/speakerTTSContainer.jsx";
import CopyToClipboard from "./util/copyToClipboard"
var fromLangs = _.clone(langs);
fromLangs.push({value:"", label:"Autodetect"});

const style = {
    marginRight:{
        marginRight: "7px"
    },
    marginTop:{
        marginTop: "20px"
    },
    btn:{
            cursor:"pointer",
            fontSize: "25px",
            ":hover":{
                color: "red"
            }
        }
}

class Translator extends Component{

    constructor(props){
        super(props);
        this.state = {openModal:false, result:null, from:"", to:"", text:""};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderTranslator = this.renderTranslator.bind(this);
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.swap = this.swap.bind(this);
        this.translate = this.translate.bind(this);
        this.initPreferences = this.initPreferences.bind(this); 
    }

    initPreferences(){
        if(this.props.translationPreferences){
            this.setState({from: this.props.translationPreferences.from, to: this.props.translationPreferences.to});
        }
        else{
            this.setState({to: this.props.defaultLang, from: this.props.defaultLang});
        }
    }

    componentDidMount(){
        this.initPreferences();
    }
    
    renderButton(){
        return (<span>
                <i className="fa fa-language" aria-hidden="true"
                    style={style.btn}
                    data-for="modal-tooltip"
                    data-tip="Traductor"
                    onClick={this.openModal}>
                </i>            
            </span>);
    }


    renderTranslator(){
         return (
            <div className="container">
                    <MyOwnInput
                                validationErrors={{
                                    maxLength:"La cantidad maxima de caracteres es: 40",
                                    isDefaultRequiredValue: "Ingresa lo que deseas traducir",
                                }}
                                required
                                validations="maxLength:40"
                                onChange={e=>this.setState({text:e.target.value})}
                                onEnter={()=>this.refs.form.submit()}
                                value={this.state.text}
                                name="text"
                                multiLine={true}
                                placeholder="¿Que deseas traducir?"
                    />
                    <FlatButton
                    onClick={()=>this.refs.form.submit()}
                    label="Traducir"
                    backgroundColor="#4286f4"
                    hoverColor="#346bc3"
                    labelStyle={{color:"white"}}
                    />
                    {this.state.result && <div style={{wordBreak: "break-all", padding:"5px", fontSize:"20px", color:"white", backgroundColor:"#4286f4", marginTop:"10px"}}>
                                            {this.state.result.text}
                                            <span style={{float:"right"}}>
                                                 <SpeakerTTSContainer src={this.state.result.audioSrc}/>
                                                 <CopyToClipboard text={this.state.result.text} color="white"/>
                                            </span>
                                        </div>
                    }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.from !== prevState.from){
            this.props.updateTranslatorPreferencesFrom(this.state.from);
        }
        if(this.state.to !== prevState.to){
            this.props.updateTranslatorPreferencesTo(this.state.to);
        }
        if(this.props.defaultLang !== prevProps.defaultLang)
            this.initPreferences();
    }

    openModal(){
        this.setState({openModal: true});
    }

    closeModal(){
        this.setState({openModal: false});
    }

    onChangeFrom(event, index, value){
        this.setState({from: value});
    }

    onChangeTo(event, index, value){
        this.setState({to: value});
    }

    translate(){
        this.props.translate(this.state.text, this.state.from, this.state.to);
    }

    swap(){
        const newFrom = this.state.to,
              newTo = this.state.from;
        this.setState({to:newTo, from:newFrom});
    }

    renderTitle(){
        return  <div className="row">
                    <div className="col-5">
                        <MyOwnSelect
                                 name="from"
                                 options={fromLangs}
                                 onChange={this.onChangeFrom}
                                 value={this.state.from}
                        />
                    </div>
                   <div className="col-2">
                   <IconButton onClick={this.swap} aria-label="swap">
                        <SwapIcon />
                    </IconButton>
                   </div>
                   <div className="col-5">
                        <MyOwnSelect
                                 validationErrors={{
                                    isDefaultRequiredValue: "Selecciona un idioma"
                                }}
                                 required
                                 name="to"
                                 options={langs}
                                 onChange={this.onChangeTo}
                                 value={this.state.to}
                        />
                    </div>
                </div>
   }

   componentWillReceiveProps(nextProps){
        if(this.props.translation !== nextProps.translation){
            const result = {
                    text: nextProps.translation.text,
                    audioSrc: nextProps.translation.audioSrc 
            };
            this.setState({from:nextProps.translation.from, result:result});
        }
        if(this.props.searchQuery !== nextProps.searchQuery)
            this.setState({text: nextProps.searchQuery});
   }

   componentdid

    render(){
        return (
            <div>
                    <Formsy.Form ref="form" onValidSubmit={this.translate}>    
                        <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Listo" title={this.renderTitle()}>
                                {this.renderTranslator()}
                        </Modal>
                    </Formsy.Form>
                        {this.renderButton()}
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        translation: state.translation,
        translationPreferences: state.translationPreferences
    }
}

export default connect(mapStateToProps, {translate, updateTranslatorPreferencesTo, updateTranslatorPreferencesFrom})(Radium(Translator));