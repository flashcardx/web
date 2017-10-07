import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert} from "../actions/alerts.js";
import {proxyImgFromUrl, proxyImgFromData} from "../actions/image";
import {reset} from 'redux-form';
import CreateDeck from "../components/createDeck.jsx";
import _ from "lodash";
const FORM_NAME = "userdeckForm";


class CreateUserDeckContainer extends Component{

    constructor(props){
        super(props);
        this.state = {modalIsOpen:false, pickedImg: null};
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
    }

    onImgDelete(){
        this.setState({pickedImgs:[]});
    }

    closeModal(){
           this.setState({modalIsOpen:false});
    }

    openModal(){
        this.setState({modalIsOpen:true});
    }

    onSubmit({name, description, lang, img}){
        this.props.createUserDeck(name, description, lang, img, this.props.parentId,()=>{
            this.closeModal();
            this.props.successAlert("Deck created succesfully !");
            this.props.dispatch(reset(FORM_NAME));  //reset form
            this.onImgDelete();
        });
    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.imageReady, nextProps.imageReady)){
            console.log("img");
            this.setState({pickedImg: nextProps.imageReady});
        }
    }

    onImgPick(img){
        this.props.proxyImgFromUrl(img);
    }

    onImgUpload(img){
        var form = new FormData();
        form.append("data", img.data);
        this.props.proxyImgFromData(form, img);
    }

    onCrop(img, callback){
        var pickedImg = this.state.pickedImg;
        var i=0;
        if(pickedImg.url == img.src){
                pickedImg.x = img.x;
                pickedImg.y = img.y;
                pickedImg.width = img.width;
                pickedImg.height = img.height;
        }
        this.setState({pickedImg: pickedImg});
        callback(pickedImg);
        console.log("pickedImg after: ", this.state.pickedImg);
    }

    render(){
        return (
            <CreateDeck onCrop={this.onCrop}
                        onImgDelete={this.onImgDelete}
                        pickedImg={this.state.pickedImg}
                        modalIsOpen = {this.state.modalIsOpen}
                        closeModal={this.closeModal}
                        openModal={this.openModal}
                        onSubmit={this.onSubmit}
                        onImgPick={this.onImgPick}
                        onImgUpload={this.onImgUpload}
                        formName={FORM_NAME}
                        {...this.props}
                        />
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


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUserDeck, successAlert, proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({validate, form:FORM_NAME, initialValues: { lang: "" }})(CreateUserDeckContainer));