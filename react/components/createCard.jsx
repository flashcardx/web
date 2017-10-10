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
import AddDrawing from "./addDrawing.jsx";
import AddAudio from "./addAudio.jsx";
import _ from "lodash";
import { Field } from 'redux-form';
const FORM_NAME = "usercardForm";
import Toggle from 'material-ui/Toggle';

const style = {
    toggle:{
        marginBottom: 16
    }
}



class CreateCard extends Component{

    constructor(props){
        super(props);
        this.state = {searchQuery: "", modalIsOpen:false}
        this.renderForm = this.renderForm.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(){
           console.log("close modal");
           this.setState({modalIsOpen:false});
           this.onImgDelete();
    }

    openModal(){
        this.setState({modalIsOpen:true});
        console.log("open modal");
    }

     onCrop(r){
            this.props.onCrop(r, img=>{
                this.props.dispatch(change(this.props.FORM_NAME, "img", img));
            });
    }

    onImgDelete(url){
            this.props.onImgDelete(url);
    }

    onChangeName(e){
        this.setState({searchQuery:e.target.value});
    }

    renderField({
                input,
                placeholder,
                type,
                name,
                value,
                onChange,
                className,
                meta: { touched, error, warning }
                }){
                return (<div>
                    <input {...input} className={className} name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} />
                    {touched &&
                        ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                    </div>);
    }

    renderTextArea({
                input,
                placeholder,
                type,
                name,
                value,
                onChange,
                className,
                meta: { touched, error, warning }
                }){
                return (<div>
                    <textarea {...input} className={className} name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} />
                    {touched &&
                        ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                    </div>);
    }

    onSubmit({name, description, lang, imgs}){
            this.closeModal();
            this.props.successAlert("Card created succesfully !");
    }

    renderForm(){
        const {handleSubmit} = this.props;
        return (
            <div className="container">
                <div className="row">
                <form className="col" onSubmit={handleSubmit(this.onSubmit)} >
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <Field
                                                component={this.renderField}
                                                onChange={this.onChangeName} 
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Cards's name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <Field
                                                className="form-control"
                                                component={this.renderTextArea}
                                                name="description"
                                                type="text"
                                                placeholder="Description, anything that helps you remember the concept"
                                            />
                                        </div>
                                    </div>
                                      <div className="row form-group">
                                        <div className="col-4 col-sm-4">
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
                                         <div className="col-4 col-sm-4">
                                            <AddDrawing label="Add drawing"/>
                                        </div>
                                        <div className="col-4 col-sm-4">
                                            <AddAudio label="Add audio"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-12">
                                            <RaisedButton labelColor="#ffffff" disabled={this.props.bigLoading} type="submit" backgroundColor="#5cb85c" label="Create" />
                                        </div>
                                    </div>
                        </form>
                </div>
                <div className="row">
                    <div className="col">
                            Autocomplete:
                            <Toggle/>
                    </div>
                    <div className="col">
                            <RaisedButton labelColor="#ffffff" disabled={this.props.bigLoading} type="submit" backgroundColor="#4286f4" label="Open translator" />
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.modalIsOpen} closeLabel="Cancel" title="Create new card">
                    {this.renderForm()}
                </Modal>
                <RaisedButton onClick={this.openModal} labelColor="#ffffff" disabled={this.props.bigLoading} backgroundColor="#66b543" label="Create card" />
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


function validate({name, description, lang, imgs}){
    var errors = {};
    console.log("ERRORS EVERYWHERE");
    if(!name || name.length < 4)
        errors.name = "Card name must be at least 4 characters long!";
    if(!description || description.length < 5)
        errors.description = "Card description must be at least 5 characters long!";
    return errors;
}


export default connect(mapStateToProps)(reduxForm({validate, form:FORM_NAME})(Radium(CreateCard)));
