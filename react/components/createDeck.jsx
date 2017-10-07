import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm, change} from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert, infoAlert, showLoading, hideLoading} from "../actions/alerts.js";
import {reset} from 'redux-form';
import AddImage from "./addImage.jsx";
import _ from "lodash";

const FORM_NAME = "userdeckForm";

function langOptions(){
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

class CreateDeck extends Component{

    constructor(props){
        super(props);
        this.renderForm = this.renderForm.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.loadImageOnForm = this.loadImageOnForm.bind(this);
    }

     onCrop(r){
            this.props.onCrop(r, img=>{
                this.props.dispatch(change(this.props.formName, "img", img));
            });
    }


    componentWillReceiveProps(nextProps){
            console.log("will receive props: ", nextProps.pickedImg);
            if(!_.isEqual(nextProps.pickedImg, this.props.pickedImg)){
                    console.log("load image on form");
                    this.loadImageOnForm(nextProps.pickedImg);
            }
    }

    loadImageOnForm(img){
                this.props.dispatch(change(this.props.formName, "img", img));
    }

    onImgDelete(){
            this.props.dispatch(change(this.props.formName, "img", null));
            this.props.onImgDelete();
    }

    renderForm(){
        const {handleSubmit} = this.props;
        const imgs = (this.props.pickedImg)? [this.props.pickedImg]: [];
        return (
            <div>
                <form onSubmit={handleSubmit(this.props.onSubmit)} >
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
                                            <AddImage onCrop={this.onCrop}
                                                      onDelete={this.onImgDelete}
                                                      pickedImgs={imgs}
                                                      maxPickedImgs={1}
                                                      disabled={this.props.bigLoading}
                                                      onImgPick={this.props.onImgPick}
                                                      onImgUpload={this.props.onImgUpload}
                                                      titleModal="Add cover for deck"
                                                      label="Add cover image"/>
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
                                                options={langOptions()}
                                            />
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-12">
                                            <RaisedButton labelColor="#ffffff" disabled={this.props.bigLoading} type="submit" backgroundColor="#5cb85c" label="Create" />
                                        </div>
                                    </div>
                        </form>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Modal autoScroll={true} onClose={this.props.closeModal} modal={false} open={this.props.modalIsOpen} closeLabel="Cancel" title="Create new deck">
                    {this.renderForm()}
                </Modal>
                <RaisedButton onClick={this.props.openModal} labelColor="#ffffff" disabled={this.props.bigLoading} backgroundColor="#f4424b" label="Create deck" />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

CreateDeck.PropTypes = {
    path: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Radium(CreateDeck));