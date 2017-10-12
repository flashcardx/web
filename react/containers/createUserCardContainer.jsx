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

class CreateUserCardContainer extends Component{

    constructor(props){
        super(props);
        this.state = {pickedImages: [], indexImageBeingReplaced: -1};
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
    }

    render(){
        return (
            <CreateCard onCrop={this.onCrop}
                        onImgDelete={this.onImgDelete}
                        pickedImages={this.state.pickedImages}
                        onImgPick={this.onImgPick}
                        onImgUpload={this.onImgUpload}
                        {...this.props}
                        />
        );
    }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteImageReady, createUserCard, successAlert, proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserCardContainer);
