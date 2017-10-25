import React, {Component} from "react";
import _ from "lodash";
import Radium from "radium";
import {connect} from "react-redux";
import config from "../../config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {infoAlert} from "../actions/alerts.js";
import {reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import PropTypes from "prop-types";
import ImgPicker from "./imgPicker.jsx";
import Cropper from "./util/cropper.jsx";
import {searchImg, searchGif, resetSearchImages} from "../actions/image";
import IconButton from 'material-ui/IconButton';

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
            color: "#4286f4"
        }
    }
}

class AddImage extends Component{
    
    constructor(props){
        super(props);
        this.state = {openModal: false, searchQuery:"", isLoading:false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchImg = this.searchImg.bind(this);
        this.searchGif = this.searchGif.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.renderPicker = this.renderPicker.bind(this);
    }

    componentWillMount(){
        this.props.resetSearchImages();
    }

    openModal(){
        this.setState({openModal: true});
    }

    closeModal(){
        this.setState({openModal: false});
        if(this.props.reloadImage)
            this.props.onImageReloadCancel();
    }

    renderTitle(){
        return (
            <div className="row">
                    <div className="col-4">
                        <RaisedButton  onClick={() => { this.dropzoneRef.open() }}
                                       labelColor="#ffffff"
                                       disabled={this.props.disabled}
                                       backgroundColor="#4286f4"
                                       label="Upload" />
                    </div>
                    <div className="col-8">
                        {this.props.titleModal}
                    </div>
            </div>
        );
    }

    onChange(e){
        this.setState({searchQuery:e.target.value});
    }

    searchImg(){
        this.setState({isLoading: true});     
        this.props.searchImg(this.state.searchQuery);
    }
    
    searchGif(){
        this.setState({isLoading: true});     
        this.props.searchGif(this.state.searchQuery);
    }

    componentWillReceiveProps(nextProps){
        this.setState({isLoading: false});
        if(!_.isEqual(nextProps.searchQuery, this.state.searchQuery))
            this.setState({searchQuery: nextProps.searchQuery});
        if(!_.isEqual(this.props.pickedImgs, nextProps.pickedImgs))
                this.props.updateContainer(this.renderPickedImgs());
        if(nextProps.reloadImage)
                this.openModal();
    }

    onImgPick(img){
        this.closeModal();
        this.props.onImgPick(img);
        if(this.props.reloadImage)
            this.props.onImageReload();
    }

    onDrop(files, rejectedFiles) {
        if(!_.isEmpty(rejectedFiles)){
            return this.props.infoAlert("Can not upload file, remenber you can only upload images with size up to 4mb!");
        }
        this.closeModal();
        const file = files[0];
        const image = new Image()
        image.onload = () => {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                const img = {
                    data: files[0],
                    width: image.width,
                    height: image.height
                }
                this.props.onImgUpload(img);
            }
        }
        image.src = file.preview
    }

    renderPicker(){
        const btnsDisabled = (_.isEmpty(this.state.searchQuery) || this.state.isLoading);
        return (
            <div className="container">
                <Dropzone style={{borderStyle:"none"}}
                          disableClick={true}
                          multiple={false}
                          ref={node=>{this.dropzoneRef=node;}}
                          maxSize={3000000}
                          accept="image/*"
                          onDrop={this.onDrop.bind(this)}>
                    <div className="row">
                        <div className="col">
                                <input onChange={this.onChange} 
                                placeholder="Search"
                                value={this.state.searchQuery}
                                type="text"/>
                        </div>
                        <div className="col">
                            <RaisedButton onClick={this.searchImg}
                                        style={style.marginRight}
                                        labelColor="#ffffff"
                                        disabled={btnsDisabled}
                                        backgroundColor="#4286f4"
                                        label="Search Img"/>                    
                            <RaisedButton onClick={this.searchGif}
                                        labelColor="#ffffff"
                                        disabled={btnsDisabled}
                                        backgroundColor="#4286f4"
                                        label="Search Gif"/>                    
                        </div>
                    </div> 
                    <div style={style.marginTop} className="row">
                        <div className="col mx-auto">
                            <div className="text-center">
                                <ImgPicker  onImgPick={this.onImgPick}
                                            searchImages={this.props.searchImages}
                                            isLoading={this.state.isLoading}/>
                            </div>
                        </div>
                    </div>
                </Dropzone>
            </div>
        );
    }

    
    renderButton(){
        return (
            <span>
                <i className="fa fa-picture-o" aria-hidden="true"
                    style={style.btn}
                    data-tip="Add image"
                    onClick={this.openModal}>
                </i>       
            </span>
        );
    }

    render(){
        return (
            <div>
                    <Cropper onCrop={this.props.onCrop} 
                             onClose={this.closeCropper}
                             open={this.props.cropModal}
                             img={this.props.imgBeingCropped}/>
                    <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Cancel" title={this.renderTitle()}>
                        {this.renderPicker()}
                    </Modal>
                    {this.renderButton()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        searchImages: state.searchImages
    }
}

export default connect(mapStateToProps, {infoAlert, searchImg, searchGif, resetSearchImages})(Radium(AddImage));