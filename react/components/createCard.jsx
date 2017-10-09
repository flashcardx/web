import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Radium from "radium";
import axios from "axios";
import config from "../../config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm, change} from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert, infoAlert, showLoading, hideLoading} from "../actions/alerts.js";
import {reset} from 'redux-form';
import AddImage from "./addImage.jsx";
import _ from "lodash";

class CreateCard extends Component{

    constructor(props){
        super(props);
        this.state = {searchQuery: ""}
        this.renderForm = this.renderForm.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }

     onCrop(r){
            this.props.onCrop(r, img=>{
                this.props.dispatch(change(this.props.formName, "img", img));
            });
    }

    onImgDelete(url){
            this.props.onImgDelete(url);
    }

    onChangeName(e){
        this.setState({searchQuery:e.target.value});
    }

    renderForm(){
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.props.onSubmit)} >
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                onChange={this.onChangeName} 
                                                name="name"
                                                type="text"
                                                placeholder="Cards's name"
                                                fieldType="input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <TextField
                                                name="description"
                                                type="text"
                                                placeholder="Description, anything that helps you remember the concept"
                                                fieldType="textarea"
                                            />
                                        </div>
                                    </div>
                                      <div className="form-group">
                                        <div className="col-sm-12">
                                            <AddImage searchQuery={this.state.searchQuery}
                                                      onCrop={this.onCrop}
                                                      onDelete={this.onImgDelete}
                                                      pickedImgs={this.props.pickedImages}
                                                      maxPickedImgs={3}
                                                      disabled={this.props.bigLoading}
                                                      onImgPick={this.props.onImgPick}
                                                      onImgUpload={this.props.onImgUpload}
                                                      titleModal="Add image for card"
                                                      label="Add image"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-12">
                                            <RaisedButton labelColor="#ffffff" disabled={this.props.bigLoading} type="submit" backgroundColor="#5cb85c" label="Create" />
                                        </div>
                                    </div>
                        </form>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Modal autoScroll={true} onClose={this.props.closeModal} modal={false} open={this.props.modalIsOpen} closeLabel="Cancel" title="Create new card">
                    {this.renderForm()}
                </Modal>
                <RaisedButton onClick={this.props.openModal} labelColor="#ffffff" disabled={this.props.bigLoading} backgroundColor="#66b543" label="Create card" />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

CreateCard.PropTypes = {
    parentId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Radium(CreateCard));