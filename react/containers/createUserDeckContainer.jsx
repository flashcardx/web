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
import {proxyImgFromUrl, proxyImgFromData, deleteImageReady} from "../actions/image";
import CreateDeck from "../components/createDeck.jsx";
import _ from "lodash";
const FORM_NAME = "userdeckForm";


class CreateUserDeckContainer extends Component{

    constructor(props){
        super(props);
        this.state = {pickedImages:[]};
        this.onSubmit = this.onSubmit.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
    }

    onSubmit(name, description, lang, callback){
        var img = this.state.pickedImages[0];
        this.props.createUserDeck(name, description, lang, img, this.props.parentId, ()=>{
            this.props.successAlert("Deck created succesfully !");
            callback();
        });
    }

    onImgDelete(){
        this.setState({pickedImages:[]});
        this.props.deleteImageReady();
    }


    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.imageReady, nextProps.imageReady)){
            if(nextProps.imageReady) 
                this.setState({pickedImages: [nextProps.imageReady]});
            else 
                this.setState({pickedImages: []});
            

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
        var pickedImages = this.state.pickedImages;
        callback(pickedImages);
    }

    render(){
        return (
            <CreateDeck onSubmit={this.onSubmit}
                        onCrop={this.onCrop}
                        onImgDelete={this.onImgDelete}
                        pickedImages={this.state.pickedImages}
                        onImgPick={this.onImgPick}
                        onImgUpload={this.onImgUpload}
                        formName={FORM_NAME}
                        {...this.props}
                        />
        );
    }

}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteImageReady, createUserDeck, successAlert,
            proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserDeckContainer);
