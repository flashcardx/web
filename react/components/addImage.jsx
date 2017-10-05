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
import axios from "axios";
import ImgPicker from "./imgPicker.jsx";
import PreviewImage from "./previewImage.jsx";
import Cropper from "./util/cropper.jsx";
import {searchImg, searchGif, resetSearchImages} from "../actions/image";

const style = {
    marginRight:{
        marginRight: "7px"
    },
    marginTop:{
        marginTop: "20px"
    }
}

class AddImage extends Component{
    
    constructor(props){
        super(props);
        this.state = {openModal: false, searchQuery:"", isLoading:false, cropModal:false, imgBeingCropped: null};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchImg = this.searchImg.bind(this);
        this.searchGif = this.searchGif.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.renderPicker = this.renderPicker.bind(this);
        this.renderPickedImgs = this.renderPickedImgs.bind(this);
        this.renderPickedImg = this.renderPickedImg.bind(this);
        this.openCropper = this.openCropper.bind(this);
        this.closeCropper = this.closeCropper.bind(this);
    }

    componentWillMount(){
        this.props.resetSearchImages();
    }

    openModal(){
        this.setState({openModal: true});
    }

    closeModal(){
        this.setState({openModal: false});
    }

    renderTitle(){
        return (
            <div className="row">
                    <div className="col-4">
                        <RaisedButton  onClick={() => { this.dropzoneRef.open() }}
                                       labelColor="#ffffff"
                                       disabled={this.props.bigLoading}
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
    }

    onImgPick(img){
        this.closeModal();
        this.props.onImgPick(img);
    }

    onDrop(files, rejectedFiles) {
        if(!_.isEmpty(rejectedFiles)){
            return this.props.infoAlert("Can not upload file, remenber you can only upload images with size up to 3mb!");
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

    renderPickedImg(img){
        return (
            <PreviewImage   onDelete={this.props.onDelete}
                            cropImg={this.openCropper}
                            onReload={this.openModal}
                            key={img.url}
                            img={img}/>
        );
    }

    openCropper(img){
        this.setState({cropModal: true, imgBeingCropped: img});
    }

    closeCropper(){
        this.setState({cropModal: false});
    }

    renderPickedImgs(){
        return (
            <div>
                {this.props.pickedImgs.map(this.renderPickedImg)}
            </div>
        );
    }

    renderButton(){
        return <RaisedButton onClick={this.openModal} labelColor="#ffffff"  disabled={this.props.disabled} backgroundColor="#f4424b" label={this.props.label} />
    }

    renderBottom(){
        var body = [];
        if(this.props.maxPickedImgs - this.props.pickedImgs.length > 0 ){
            body.push(<div key={1}>{this.renderButton()}</div>);
        }
        body.push(<div key={2}>{this.renderPickedImgs()}</div>);
        return body;
    }


    render(){
        return (
            <div>
                    <Cropper onCrop={this.props.onCrop} 
                            onClose={this.closeCropper}
                            open={this.state.cropModal}
                            img={this.state.imgBeingCropped}/>
                    <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Cancel" title={this.renderTitle()}>
                        {this.renderPicker()}
                    </Modal>
                        {this.renderBottom()}
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