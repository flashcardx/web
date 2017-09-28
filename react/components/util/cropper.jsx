import React, { Component } from 'react';
import Responsive from 'react-responsive';
import Cropper from 'react-cropper';
import Modal from "./modal.jsx";
import 'cropperjs/dist/cropper.css';

export default class MyCropper extends Component {
    constructor(props) {
        super();
        this.crop = this.crop.bind(this);
    }

    renderDesktop(){
        const {img} = this.props;
        console.log("render desktop: ", img);
        return (
                   <div>
                        <Cropper
                                        ref={cropper => { this.cropper = cropper; }}
                                        src={img.url}
                                        style={{height: img.height, width: img.width}}
                                        // Cropper.js options
                                        aspectRatio={1}
                                        guides={false}/>
                    </div>
        );
    }

    renderMobile(){
        const {img} = this.props;
        return (
                   <div style={{width: "auto", height: "300px"}}>
                        <Cropper
                                        ref={cropper => { this.cropper = cropper; }}
                                        src={img.url}
                                        style={{height: 300, width: '100%'}}
                                        // Cropper.js options
                                        aspectRatio={1}
                                        guides={false}/>
                    </div>
        );
    }
    
    crop(){
        const data = this.cropper.getCropBoxData();
        const {img} = this.props;
        const r = {
            x: data.left,
            y: data.top,
            width: data.width,
            height: data.height,
            src: img.url
        }
        this.props.onCrop(r);
        this.props.onClose();
    }

    render() {
        return (
            <Modal confirmLabel="Crop it!"
                       handleConfirm={this.crop}
                       autoScroll={true}
                       onClose={this.props.onClose}
                       closeLabel="Cancel"
                       modal={false}
                       title="Crop image"
                       open={this.props.open}>
                        <Responsive minWidth={670}>
                                {(matches) => {
                                    if (matches)
                                        return this.renderDesktop();
                                    else 
                                        return this.renderMobile();
                                }}
                        </Responsive>
            </Modal>
        );
    }



}