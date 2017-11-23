import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import {reduxForm } from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserCard} from "../actions/flashcard.js";
import {successAlert} from "../actions/alerts.js";
import RaisedButton from 'material-ui/RaisedButton';
import {proxyImgFromUrl, proxyImgFromData, deleteImageReady} from "../actions/image";
import CreateFlashcard from "../components/createFlashcard.jsx";
import userPathAdapter from "../adapters/deckPathAdapter";
import _ from "lodash";

class CreateUserCardContainer extends Component{

    constructor(props){
        super(props);
        this.state = {pickedImages: [], modalOpened:false};
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps){
            if(!_.isEqual(this.props.imageReady, nextProps.imageReady) && nextProps.imageReady){
                if(this.state.pickedImages.length >=3)
                    return;
                var newImages = this.state.pickedImages.slice(); 
                newImages.push(nextProps.imageReady);
                return this.setState({pickedImages: newImages});
            }
    }

    onImgDelete(src){
        if(!src)//delete all images if not src
            return this.setState({pickedImages: []});
        var newImages = this.state.pickedImages.slice();
        var index = newImages.findIndex(i=>{return i.src == src});
        newImages.splice(index, 1);
        this.setState({pickedImages: newImages});
        this.props.deleteImageReady();
    }

    onSubmit(name, description, callback){
        var deckId = userPathAdapter.getLastIdFromPath(this.props.userDecksPath);
        var imgs = this.state.pickedImages;
        this.props.createUserCard(name, description, imgs, deckId, ()=>{
             callback();
        });
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
                <RaisedButton onClick={this.openModal} labelColor="#ffffff" disabled={this.props.bigLoading} backgroundColor="#66b543" label="Crear ficha" />                   
                <CreateFlashcard
                                resetOnClose
                                modalOpened={this.state.modalOpened}
                                closeModal={this.closeModal}
                                buttonTitle="Crear"
                                title="Nueva ficha"
                                name=""
                                description=""
                                onCrop={this.onCrop}
                                onImgDelete={this.onImgDelete}
                                pickedImages={this.state.pickedImages}
                                onImgPick={this.onImgPick}
                                onImgUpload={this.onImgUpload}
                                onSubmit={this.onSubmit}
                                {...this.props}
                            />
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteImageReady, createUserCard, successAlert, proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady,
        userDecksPath: state.userDecksPath
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserCardContainer);
