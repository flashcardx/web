import React, {Component} from "react";
import Radium from "radium";
import {connect} from "react-redux";
import config from "../../config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import axios from "axios";
import ImgPicker from "./imgPicker.jsx";
import PreviewImage from "./previewImage.jsx";
import Cropper from "./util/cropper.jsx";
const SEARCH_IMG_URL = config.apiSearchImage;
const SEARCH_GIF_URL = config.apiSearchGif;

const style = {
    marginRight:{
        marginRight: "7px"
    },
    marginTop:{
        marginTop: "20px"
    }
}

function parseImgs(data){
    var r = [];
    data.forEach(img=>{
        r.push({
                preview: img.thumbnailUrl,
                real: {
                    url: img.contentUrl,
                    height: img.height,
                    width: img.width
                    }
                });
    });
    return r;
}

function parseGifs(data){
    var r = [];
    data.forEach(img=>{
        r.push({
                preview: img.media[0].tinygif.url,
                real: {
                    url: img.media[0].mediumgif.url,
                    height: img.media[0].mediumgif.dims[1],
                    width: img.media[0].mediumgif.dims[0]
                    }
            });
    });
    return r;
}

class AddImage extends Component{
    
    constructor(props){
        super(props);
        this.state = {searchImgs:[], openModal: false, searchQuery:"", isLoading:false, cropModal:false, imgBeingCropped: null};
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
                        <RaisedButton labelColor="#ffffff"  disabled={this.props.bigLoading} backgroundColor="#4286f4" label="Upload" />
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
        const url = SEARCH_IMG_URL + this.state.searchQuery;
        this.setState({isLoading: true});     
        axios.get(url,
                {headers:{'x-access-token': localStorage.getItem("jwt")}})
        .then(r=>{
            this.setState({isLoading: false, searchImgs:parseImgs(r.data.msg.value)});
        })
        .catch(err=>{
            console.error(err);
        })
    }

    searchGif(){
        const url = SEARCH_GIF_URL + this.state.searchQuery;
        this.setState({isLoading: true});     
        axios.get(url,
                {headers:{'x-access-token': localStorage.getItem("jwt")}})
        .then(r=>{
            this.setState({isLoading: false, searchImgs: parseGifs(r.data.msg.results)});
        })
        .catch(err=>{
            console.error(err);
        })
    }

    onImgPick(img){
        console.log("add image img:", img);
        this.closeModal();
        this.props.onImgPick(img);
    }

    renderPicker(){
        return (
            <div className="container">
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
                                      disabled={this.props.bigLoading}
                                      backgroundColor="#4286f4"
                                      label="Search Img"/>                    
                        <RaisedButton onClick={this.searchGif}
                                      labelColor="#ffffff"
                                      disabled={this.props.bigLoading}
                                      backgroundColor="#4286f4"
                                      label="Search Gif"/>                    
                    </div>
                </div> 
                <div style={style.marginTop} className="row">
                    <div className="col mx-auto">
                        <div className="text-center">
                            <ImgPicker  onImgPick={this.onImgPick}
                                        searchImgs={this.state.searchImgs}
                                        isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
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
                         img={this.state.imgBeingCropped} />
                <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Cancel" title={this.renderTitle()}>
                    {this.renderPicker()}
                </Modal>
                    {this.renderBottom()}
            </div>
        );
    }

}

export default Radium(AddImage);