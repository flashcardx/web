import React, { Component } from 'react';

import Cropper from 'react-crop';
import 'react-crop/css';
// You'll need to use async functions
import "babel-core/register";
import "babel-polyfill";

export default class MyCropper extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            previewImage: null
        };
    }

    onChange(evt) {
        this.setState({
            image: evt.target.files[0]
        })
    }

    async crop() {
        let image = await this.refs.crop.cropImage()
        this.setState({
            previewUrl: window.URL.createObjectURL(image)
        })
    }

    clear() {
        this.refs.file.value = null
        this.setState({
            previewUrl: null,
            image: null
        })
    }

    imageLoaded(img) {
        if (img.naturalWidth && img.naturalWidth < 262 &&
            img.naturalHeight && img.naturalHeight < 147) {
            this.crop()
        }
    }

    render() {
        return (
            <div>
                <input ref='file' type='file' onChange={this.onChange} />

                    this.state.image &&

                    <div>
                        <Cropper
                            ref='crop'
                            image={this.state.image}
                            width={100}
                            height={80}
                            onImageLoaded={this.imageLoaded}
                        />

                        <button onClick={this.crop}>Crop</button>
                        <button onClick={this.clear}>Clear</button>
                    </div>

                }

                {
                    this.state.previewUrl &&

                    <img src={this.state.previewUrl} />
                }

            </div>
        );
    }
}