import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert, infoAlert, showLoading, hideLoading} from "../actions/alerts.js";
import {reset} from 'redux-form';
import CreateDeck from "../components/createDeck.jsx";
const CLOUDFRONT_URL = config.cloudfrontUrl;
const FORM_NAME = "userdeckForm";
const IMAGE_PROXY_URL = config.apiImageProxy;


class CreateUserDeckContainer extends Component{

    constructor(props){
        super(props);
        this.state = {modalIsOpen:false, pickedImgs: []};
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
    }

    onImgDelete(){
        console.log("delete");
        this.setState({pickedImgs:[]});
    }

    closeModal(){
           this.setState({modalIsOpen:false});
    }

    openModal(){
        this.setState({modalIsOpen:true});
    }

    onSubmit({name, description, lang, img}){
        console.log("img: ", img);
        this.props.createUserDeck(name, description, lang, img, this.state.parentId,()=>{
            this.closeModal();
            this.props.successAlert("Deck created succesfully !");
            this.props.dispatch(reset(FORM_NAME));  //reset form
        });
    }

    onImgPick(img, callback){
        this.props.showLoading();
        axios.post(IMAGE_PROXY_URL, img, {headers:{'x-access-token': localStorage.getItem("jwt")}})
        .then(r=>{
            this.props.hideLoading();
            if(r.data.success == false){
                this.props.infoAlert("This image can not be downloaded, please try with another one");
                return console.error(r.data.msg);
            }
            const url = CLOUDFRONT_URL + r.data.hash;
            const img2 = {url:url,
                          hash: r.data.hash,
                          width: img.width,
                          height: img.height,
                          x:0,
                          y:0};
            callback(img2);
            this.setState({pickedImgs: [img2]});
        })
        .catch(err=>{
            console.error(err);
        });
    }

    render(){
        return (
            <CreateDeck onImgDelete={this.onImgDelete}
                        pickedImgs={this.state.pickedImgs}
                        modalIsOpen = {this.state.modalIsOpen}
                        closeModal={this.closeModal}
                        openModal={this.openModal}
                        onSubmit={this.onSubmit}
                        onImgPick={this.onImgPick}
                        maxPickedImgs={1}
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
  return bindActionCreators({ createUserDeck, successAlert, infoAlert, showLoading, hideLoading}, dispatch);
}


export default connect(null, mapDispatchToProps)(reduxForm({validate, form:FORM_NAME, initialValues: { lang: "" }})(CreateUserDeckContainer));