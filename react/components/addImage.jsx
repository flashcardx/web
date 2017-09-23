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
        this.state = {imgs:[], openModal: false, searchQuery:"", isLoading:false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchImg = this.searchImg.bind(this);
        this.searchGif = this.searchGif.bind(this);
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
            this.setState({isLoading: false, imgs:parseImgs(r.data.msg.value)});
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
            this.setState({isLoading: false, imgs: parseGifs(r.data.msg.results)});
        })
        .catch(err=>{
            console.error(err);
        })
    }

    renderBody(){
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
                            <ImgPicker imgs={this.state.imgs} isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Modal onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Cancel" title={this.renderTitle()}>
                    {this.renderBody()}
                </Modal>
                    <RaisedButton onClick={this.openModal} labelColor="#ffffff"  disabled={this.props.bigLoading} backgroundColor="#f4424b" label={this.props.label} />
            </div>
        );
    }

}

export default Radium(AddImage);