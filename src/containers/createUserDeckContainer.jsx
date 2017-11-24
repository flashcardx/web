import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../api_config";
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert} from "../actions/alerts.js";
import RaisedButton from 'material-ui/RaisedButton';
import {proxyImgFromUrl, proxyImgFromData, deleteImageReady} from "../actions/image";
import CreateDeck from "../components/createDeck.jsx";
import _ from "lodash";
const FORM_NAME = "userdeckForm";


class CreateUserDeckContainer extends Component{

    constructor(props){
        super(props);
        this.state = {pickedImages:[], modalOpened:false};
        this.onSubmit = this.onSubmit.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onSubmit(name, description, lang, callback){
        var img = this.state.pickedImages[0];
        this.props.createUserDeck(name, description, lang, img, this.props.parentId, ()=>{
            callback();
        });
    }

    onImgDelete(){
        this.setState({pickedImages:[]});
        this.props.deleteImageReady();
    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.imageReady, nextProps.imageReady) && this.state.modalOpened){
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

    openModal(){
        this.setState({modalOpened:true});
    }

    closeModal(){
        this.setState({modalOpened:false});
    }

    render(){
        return (
            <div>
                <RaisedButton onClick={this.openModal} labelColor="#ffffff" disabled={this.props.bigLoading} backgroundColor="#f4424b" label="Crear mazo" />            
                <CreateDeck
                            resetOnClose
                            modalOpened={this.state.modalOpened}
                            closeModal={this.closeModal}
                            buttonTitle="Crear"
                            title="Nuevo mazo"
                            lang=""
                            description=""
                            name=""
                            onSubmit={this.onSubmit}
                            onCrop={this.onCrop}
                            onImgDelete={this.onImgDelete}
                            pickedImages={this.state.pickedImages}
                            onImgPick={this.onImgPick}
                            onImgUpload={this.onImgUpload}
                            formName={FORM_NAME}
                            {...this.props}
                            />
            </div>
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
