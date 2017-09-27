import React, { Component } from 'react';
import Responsive from 'react-responsive';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class MyCropper extends Component {
    constructor(props) {
        super();
    }

    onCrop(){
        console.log("on crop");
        //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    renderDesktop(){
        return (
                   <div style={{width: "auto", maxHeight: "400px"}}>
                        <Cropper
                                        ref='cropper'
                                        src={this.props.src}
                                        style={{height: 400, width: '100%'}}
                                        // Cropper.js options
                                        aspectRatio={1}
                                        guides={false}
                                        crop={this.onCrop.bind(this)} />
                    </div>
        );
    }

    renderMobile(){
        return (
                   <div style={{width: "auto", height: "300px"}}>
                        <Cropper
                                        ref='cropper'
                                        src={this.props.src}
                                        style={{height: 300, width: '100%'}}
                                        // Cropper.js options
                                        aspectRatio={1}
                                        guides={false}
                                        crop={this.onCrop.bind(this)} />
                    </div>
        );
    }

    render() {
        return (
                <Responsive minWidth={670}>
                        {(matches) => {
                            if (matches)
                                return this.renderDesktop();
                            else 
                                return this.renderMobile();
                        }}
                </Responsive>
        );
    }



}