import React, {Component} from "react";
import Radium from "radium";
import AddImage from "./addImage.jsx";
import TranslatorContainer from "../containers/translatorContainer.jsx";
import DictionaryContainer from "../containers/dictionaryContainer.jsx";
import PreviewImage from "./previewImage.jsx";

class MultimediaCreator extends Component{
    
    constructor(props){
        super(props);
        this.state = {cropModal:false, imgBeingCropped:null, reloadImage:null};
        this.renderButtons = this.renderButtons.bind(this);
        this.renderPickedImages = this.renderPickedImages.bind(this);
        this.renderPickedImage = this.renderPickedImage.bind(this);
        this.openCropper = this.openCropper.bind(this);
        this.closeCropper = this.closeCropper.bind(this);
        this.renderGallery = this.renderGallery.bind(this);
        this.onImageReload = this.onImageReload.bind(this);
        this.onImageReloadCancel = this.onImageReloadCancel.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onClose(){
        setTimeout(() => {
            this.props.onClose();
        }, 500);
    }

    renderButtons(props){
        var btns = [];
        if(this.props.image && (this.state.reloadImage || (this.props.maxPickedImgs - this.props.pickedImages.length > 0))){
            btns.push(<div key={1} className="col-3 col-sm-3">
                                            <AddImage searchQuery={this.props.searchQuery}
                                                      onClose={this.onClose}
                                                      onCrop={this.props.onImageCrop}
                                                      disabled={this.props.bigLoading}
                                                      onImgPick={this.props.onImgPick}
                                                      onImgUpload={this.props.onImgUpload}
                                                      cropModal= {this.state.cropModal}
                                                      imgBeingCropped={this.state.imgBeingCropped}
                                                      reloadImage={this.state.reloadImage}
                                                      onImageReload={this.onImageReload}
                                                      onImageReloadCancel = {this.onImageReloadCancel}
                                                      />
                                        </div>);
        }
        if(this.props.translator){
            btns.push(<div key={2} className="col-3 col-sm-3">
                                <TranslatorContainer deckId={this.props.deckId} onClose={this.onClose} searchQuery={this.props.searchQuery}/>
                      </div>);
        }
        if(this.props.dictionary){
            btns.push(<div key={3} className="col-3 col-sm-3">
                                <DictionaryContainer onDefine={this.props.onDefine} searchQuery={this.props.searchQuery}/>
                      </div>);
        }
       /* if(this.props.drawing){
            btns.push(<div key={3} className="col-3 col-sm-3">
                                <AddDrawing />
                      </div>);
        }*/
       /* if(this.props.audio){
            btns.push( <div key={4} className="col-3 col-sm-3">
                                <AddAudio />
                        </div>);
        }*/
      /*if(this.props.video){
          btns.push(<div key={5} className="col-3 col-sm-3">
                            <AddVideo />
                    </div>);
      }*/
        return btns;
    }

    onImageReload(){
        this.props.onImgDelete(this.state.reloadImage);
        this.onImageReloadCancel();
    }

    onImageReloadCancel(){
        this.setState({reloadImage: null});
    }

    renderPickedImage(img){
        if(!img)
            return null;
        return (
            <PreviewImage   onDelete={this.props.onImgDelete}
                            cropImg={this.openCropper}
                            onReload={()=>this.reloadImage(img.src)}
                            key={img.src + Math.random()}
                            img={img}/>
        );
    }

    reloadImage(src){
        this.setState({reloadImage:src});
    }

    openCropper(img){
        this.setState({cropModal: true, imgBeingCropped: img});
    }

    closeCropper(){
        this.setState({cropModal: false});
    }

    renderPickedImages(){
        return (
            <div style={{overflowX:"auto", margin:"5px"}}>
                {this.props.pickedImages.map(this.renderPickedImage)}
            </div>
        );
    }

    renderGallery(){
        return (
            <div>
                {this.renderPickedImages()}
            </div>
        );
    }

    render(){
        return (<div className="container"> 
                    <div className="row">
                        {this.renderButtons()}
                        <span style={{color:"red"}}>
                            {this.props.errorMsg}
                        </span>
                    </div>
                    <div className="row">
                        {this.renderGallery()}
                    </div>
                </div>
                );
    }

}

export default Radium(MultimediaCreator);