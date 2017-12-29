import React, {Component} from "react";
import _ from "lodash";
import Radium from "radium";
import {connect} from "react-redux";
import Modal from "./util/modal.jsx";
import FlatButton from 'material-ui/FlatButton';
import {infoAlert} from "../actions/alerts.js";
import Dropzone from 'react-dropzone';
import ImgPicker from "./imgPicker.jsx";
import Cropper from "./util/cropper.jsx";
import {searchImg, searchGif, resetSearchImages} from "../actions/image";
import Formsy from 'formsy-react';
import {MyOwnInput} from "./util/form.jsx";
import SearchIcon from 'material-ui/svg-icons/action/search';
import Tooltip from './util/tooltip';

const style = {
    marginTop:{
        marginTop: "20px"
    },
    btn:{
        cursor:"pointer",
        fontSize: "25px",
        ":hover":{
            color: "#4286f4"
        }
    },
    white:{
        color:"#fff",
        margin:"4px"
    }
}

class AddImage extends Component{
    
    constructor(props){
        super(props);
        this.state = {searchingGif: false, searchingImg: false, searchBoxTouched:false, openModal: false, searchQuery:"", isLoading:false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchImg = this.searchImg.bind(this);
        this.searchGif = this.searchGif.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.renderPicker = this.renderPicker.bind(this);
        this.shouldUpdateSearchQuery = this.shouldUpdateSearchQuery.bind(this);
    }

    componentWillMount(){
        this.props.resetSearchImages();
    }

    openModal(){
        this.setState({openModal: true});
    }

    closeModal(){
        this.setState({openModal: false, isLoading:false});
        if(this.props.reloadImage)
            this.props.onImageReloadCancel();
    }

    renderTitle(){
         return <div className="row">
                    <div className="col-4">
                        <FlatButton  onClick={() => { this.dropzoneRef.open() }}
                                     backgroundColor="#4286f4"
                                     hoverColor="#346bc3"
                                     disabled={this.state.isLoading}
                                     labelStyle={style.white}
                                     label="Subir"/>
                    </div>
                    <div className="col-8">
                        {this.props.titleModal}
                    </div>
            </div>
    }

    onChange(e){
        this.setState({searchingGif:false, searchingImg:false, searchQuery:e.target.value, searchBoxTouched:true});
    }

    searchImg(){
        this.setState({isLoading: true, searchingImg:true});     
        this.props.searchImg(this.state.searchQuery);
    }
    
    searchGif(){
        this.setState({isLoading: true, searchingGif:true});     
        this.props.searchGif(this.state.searchQuery);
    }

    shouldUpdateSearchQuery(nextProps){
        return (!this.state.searchBoxTouched || _.isEmpty(this.state.searchQuery)) && !_.isEqual(nextProps.searchQuery, this.state.searchQuery)
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({isLoading: false});
        if(this.props.searchImages !== nextProps.searchImages && _.isEmpty(nextProps.searchImages))
            this.setState({searchQuery:"", searchingGif:false, searchingImg:false}); 
        if(this.shouldUpdateSearchQuery(nextProps)){
            this.setState({searchingGif:false, searchingImg:false, searchQuery: nextProps.searchQuery});
        }
        if(!_.isEqual(this.props.pickedImgs, nextProps.pickedImgs)){
            this.props.updateContainer(this.renderPickedImgs());
        }
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
            return this.props.infoAlert("No se pudo cargar la imagen, recorda que el tamaño maximo permitido por imagen es de 7Mb");
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
        const gifDisabled = this.state.isLoading || _.isEmpty(this.state.searchQuery) || this.state.searchingGif,
              imgDisabled = this.state.isLoading || _.isEmpty(this.state.searchQuery) || this.state.searchingImg;
        return (
            <div className="container">
                <Dropzone style={{borderStyle:"none"}}
                          disableClick={true}
                          multiple={false}
                          ref={node=>{this.dropzoneRef=node;}}
                          maxSize={7000000}
                          accept="image/*"
                          onDrop={this.onDrop.bind(this)}>
                    <div className="row">
                        <div className="col-12 col-sm-7 col-md-7">
                        <Formsy.Form ref="form" className="col" onValidSubmit={this.searchImg}> 
                            <MyOwnInput
                                name="searchQuery"
                                autoFocus
                                onChange={this.onChange}
                                onEnter={()=>this.refs.form.submit()}
                                value={this.state.searchQuery}
                                style={{overflow:"hidden", width:"100%"}}
                                placeholder="Buscar"
                            />
                        </Formsy.Form>
                        </div>
                        <div className="col-12 col-sm-5 col-md-5">
                            <div className="row">
                                <FlatButton onClick={this.searchImg}
                                            style={style.white}
                                            disabled={imgDisabled}
                                            backgroundColor="#4286f4"
                                            hoverColor="#346bc3"
                                            icon={<SearchIcon />}
                                            label="imagen"/>                    
                                <FlatButton onClick={this.searchGif}
                                            style={style.white}
                                            disabled={gifDisabled}
                                            backgroundColor="#4286f4"
                                            hoverColor="#346bc3"
                                            icon={<SearchIcon />}
                                            label="GIF"/>                    
                            </div>
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
                <Tooltip title="Agregar imagen">
                    <i className="fa fa-picture-o" aria-hidden="true"
                        style={style.btn}
                        onClick={this.openModal}>
                    </i>
                </Tooltip>  
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