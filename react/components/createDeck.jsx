import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert} from "../actions/alerts.js";
import {reset} from 'redux-form';
import AddImage from "./addImage.jsx";

const FORM_NAME = "userdeckForm";

const style ={
}

class CreateDeck extends Component{

    constructor(props){
        super(props);
        var parentId = null;
        var lastDeck = props.path.pop();
        if(lastDeck)
            parentId = lastDeck.id;
        this.state = {openModal:false, parentId: parentId};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    openModal(){
        this.setState({openModal:true});
    }

     closeModal(){
        this.setState({openModal:false});
    }

    onSubmit({name, description, lang}){
        this.props.createUserDeck(name, description, lang, this.state.parentId,()=>{
            this.closeModal();
            this.props.successAlert("Deck created succesfully !");
            this.props.dispatch(reset(FORM_NAME));  //reset form
        });
    }

    langOptions(){
        return [{value:"", label:"Choose a language for the deck"},
                {label: "English", value:"en"},
                {label: "Español", value:"es"},
                {label: "Čeština", value:"cs"},
                {label: "Dansk", value:"da"},
                {label: "Deutsch", value:"de"},
                {label: "Français", value:"fr"},
                {label: "Indonesia", value:"id"},
                {label: "Italiano", value:"it"},
                {label: "Magyar", value:"hu"},
                {label: "Nederlands", value:"nl"},
                {label: "Norsk", value:"no"},
                {label: "Polski", value:"pl"},
                {label: "Português", value:"pt"},
                {label: "Română", value:"ro"},
                {label: "Slovenčina", value:"sk"},
                {label: "Suomi", value:"fi"},
                {label: "Svenska", value:"sv"},
                {label: "Türkçe", value:"tr"},
                {label: "Việt", value:"vi"},
                {label: "ไทย", value:"th"},
                {label: "Български", value:"bq"},
                {label: "Русский", value:"ru"},
                {label: "Ελληνική", value:"el"},
                {label: "한국어", value:"ko"},
                {label: "日本語", value:"ja"},
                {label: "简体中文", value:"zh"}];
    }

    renderForm(){
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)} >
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="name"
                                                type="text"
                                                placeholder="Deck's name"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="description"
                                                type="text"
                                                placeholder="Description, What kind of things will your deck hold?"
                                                fieldType="textarea"
                                            />
                                        </div>
                                    </div>
                                      <div className="form-group">
                                        <div className="col-sm-12">
                                            <AddImage titleModal="Add cover for deck" label="Add cover image"/>
                                            <TextField
                                                name="img"
                                                fieldType="input"
                                                type="hidden"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="lang"
                                                placeholder="Description, What kind of things will your deck hold?"
                                                fieldType="select"
                                                options={this.langOptions()}
                                            />
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-12">
                                            <RaisedButton disabled={this.props.bigLoading} type="submit" backgroundColor="#5cb85c" label="Create" />
                                        </div>
                                    </div>
                        </form>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Modal onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Cancel" title="Create new deck">
                    {this.renderForm()}
                </Modal>
                <RaisedButton onClick={this.openModal} labelColor="#ffffff"  disabled={this.props.bigLoading} backgroundColor="#f4424b" label="Create deck" />
            </div>
        );
    }
}

function validate({name, description, lang, img}){
    var errors = {};
    if(!img)
        errors.img = "Please add an mage for your deck";
    if(!name || name.length < 4)
        errors.name = "Deck name must be at least 4 characters long!";
    if(!description || description.length < 5)
        errors.description = "Deck description must be at least 5 characters long!";
    if(!lang)
        errors.lang = "You must select a language for your deck!";
    return errors;
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUserDeck, successAlert}, dispatch);
}

CreateDeck.PropTypes = {
    path: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({validate, form:FORM_NAME, initialValues: { lang: "" }})(Radium(CreateDeck)));