import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserCard} from "../actions/card.js";
import {successAlert} from "../actions/alerts.js";
import {proxyImgFromUrl, proxyImgFromData, deleteImageReady} from "../actions/image";
import CreateCard from "../components/createCard.jsx";
import _ from "lodash";
const FORM_NAME = "usercardForm";


class CreateUserCardContainer extends Component{

    constructor(props){
        super(props);
        this.state = {modalIsOpen:false, pickedImages: [], indexImageBeingReplaced: -1};
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
    }

    onImgDelete(url){
        if(!url)//delete all images if not url
            this.setState({pickedImages: []});
        var newImages = this.state.pickedImages.slice();
        var index = newImages.findIndex(i=>{return i.url == url});
        newImages.splice(index, 1);
        this.setState({pickedImages: newImages});
        this.props.deleteImageReady();
    }

    closeModal(){
           console.log("close modal");
           this.setState({modalIsOpen:false});
           this.onImgDelete();
           this.props.destroy();
    }

    openModal(){
        this.setState({modalIsOpen:true});
        console.log("props: ", this.props);
        console.log("open modal");
        this.props.initialize();
    }

    onSubmit({name, description, lang, imgs}){
            this.closeModal();
            this.props.successAlert("Card created succesfully !");
        /*
        this.props.createUserCard(name, description, lang, imgs, this.props.parentId,()=>{
            this.closeModal();
            this.props.successAlert("Card created succesfully !");
            this.props.destroy(); //resets form
            this.props.initialize();
            this.onImgDelete();
        });
        */
    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.imageReady, nextProps.imageReady) && nextProps.imageReady){
            var newImages = this.state.pickedImages.slice(); 
            if(this.state.indexImageBeingReplaced == -1)
                newImages.push(nextProps.imageReady);
            else{
                newImages = newImages.splice(this.state.indexImageBeingReplaced, 1, nextProps.imageReady);
            }
            return this.setState({pickedImages: newImages});
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
        /*
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
        */
    }

    render(){
        return (
            <CreateCard onCrop={this.onCrop}
                        onImgDelete={this.onImgDelete}
                        pickedImages={this.state.pickedImages}
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

function validate({name, description, lang, imgs}){
    var errors = {};
    if(!name || name.length < 4)
        errors.name = "Card name must be at least 4 characters long!";
    if(!description || description.length < 5)
        errors.description = "Card description must be at least 5 characters long!";
    return errors;
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteImageReady, createUserCard, successAlert, proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({validate, form:FORM_NAME, initialValues: { lang: "" }})(CreateUserCardContainer));
