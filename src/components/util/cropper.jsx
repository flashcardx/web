import React, { Component } from 'react';
import {Cropper} from 'react-image-cropper'
import Modal from "./modal.jsx";

export default class MyCropper extends Component {
    constructor(props) {
        super();
        this.crop = this.crop.bind(this);
    }

    crop(){
        const {img} = this.props;
        const values =  this.cropper.values();
        console.log("values cropped:", values);
        const r = {
            x: values.x,
            y: values.y,
            width: values.width,
            height: values.height,
            src: img.url
        }
        this.props.onCrop(r);
        this.props.onClose();
    }

    render() {
        const {img} = this.props;
        if(!img)
            return null;
        return (
                        <Modal confirmLabel="Crop it!"
                                handleConfirm={this.crop}
                                autoScroll={true}
                                onClose={this.props.onClose}
                                closeLabel="Cancel"
                                modal={false}
                                title="Crop image"
                                open={this.props.open}>
                                     <Cropper
                                        ref={cropper => { this.cropper = cropper; }}
                                        src={img.url}
                                        width={img.width}
                                        height={img.height}
                                        ratio={1}/>
                        </Modal>
        );
    }



}