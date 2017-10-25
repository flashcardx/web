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
import _ from "lodash";
import Toggle from 'material-ui/Toggle';
import Formsy from 'formsy-react';
import {MyOwnInput, MyOwnTextarea} from "./util/form.jsx";
import MultimediaCreator from "./multimediaCreator.jsx";

const style = {
    toggle:{
        marginBottom: 16
    }
}



class CreateCard extends Component{

    constructor(props){
        super(props);
        this.state = {modalIsOpen:false, form:{name:"", description:""}, multimediaBox: null}
        this.renderForm = this.renderForm.bind(this);
       this.onCrop = this.onCrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
       this.restartForm = this.restartForm.bind(this);
        this.onChangeFormName = this.onChangeFormName.bind(this);
        this.onChangeFormDescription = this.onChangeFormDescription.bind(this);
        this.updateMultimediaBox = this.updateMultimediaBox.bind(this);
    }

    closeModal(){
           this.setState({modalIsOpen:false});
           this.onImgDelete();
    }

    restartForm(){
        this.onImgDelete();
        this.setState({form:{name:"", description: ""}}, ()=>{
            this.refs.form.reset();
        });
    }

    openModal(){
        this.setState({modalIsOpen:true});
    }

     onCrop(r){
    }

    onImgDelete(url){
            this.props.onImgDelete(url);
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

    onSubmit({name, description}){
            this.props.onSubmit(name, description,()=>{
                this.onImgDelete();
                this.restartForm();
            });
    }

    onChangeFormName(e){
        var newForm = _.clone(this.state.form);
        newForm.name = e.target.value;
        this.setState({form:newForm});
    }

    onChangeFormDescription(e){
        var newForm = _.clone(this.state.form);
        newForm.description = e.target.value;
        this.setState({form:newForm});
    }

    updateMultimediaBox(data){
        this.setState({multimediaBox: data});
    }

    renderForm(){
        const {handleSubmit} = this.props;
        return (
            <div className="container">
                <div className="row">
                <Formsy.Form ref="form" className="col" id="cardForm" onValidSubmit={this.onSubmit}>                         
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <MyOwnInput
                                                validationErrors={{
                                                    minLength: "Card's name must be at least 2 characters long",
                                                    isDefaultRequiredValue: "Please enter the card's name"
                                                    }}
                                                validations="minLength:2"
                                                name="name"
                                                required
                                                onChange={this.onChangeFormName}
                                                type="text"
                                                className="form-control"
                                                placeholder="Cards's name"
                                                value={this.state.form.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <MyOwnTextarea
                                                validationErrors={{
                                                    minLength: "Card's description must be at least 4 characters long",
                                                    isDefaultRequiredValue: "Please enter the card's description"
                                                    }}
                                                required
                                                validations="minLength:4"
                                                onChange={this.onChangeFormDescription}
                                                value={this.state.form.description}
                                                className="form-control"
                                                name="description"
                                                type="text"
                                                placeholder="Description, anything that helps you remember the concept"
                                            />
                                        </div>
                                    </div>
                        </Formsy.Form>
                </div>
                <div className="container">
                            <MultimediaCreator image drawing audio video
                                            searchQuery={this.state.form.name}
                                            onImageCrop={this.onCrop}
                                            onImgDelete={this.props.onImgDelete}
                                            pickedImages={this.props.pickedImages}
                                            maxPickedImgs={3}
                                            bigLoading={this.props.bigLoading}
                                            onImgPick={this.props.onImgPick}
                                            onImgUpload={this.props.onImgUpload}
                                />
                </div>
                <div className="row" style={{margin:"5px"}}>
                    <div className="col">
                            Autocomplete:
                            <Toggle/>
                    </div>
                    <div className="col">
                            <RaisedButton labelColor="#ffffff" type="submit" backgroundColor="#4286f4" label="Open translator" />
                    </div>
                </div>
            </div>
        );
    }

    render(){
        var titleObject = (
                         <RaisedButton
                                disabled={this.props.bigLoading}
                                label="Create"
                                primary={true}
                                type="submit"
                                form="cardForm"
                                buttonStyle={{backgroundColor:"#5cb85c"}}  
                                />
                        );
        return (
            <div>
                <Modal titleStyle={{backgroundColor:"#5cb85c", marginBottom:"5px"}} titleObject={titleObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.modalIsOpen} closeLabel="Cancel" title="Create new card">
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



export default connect(mapStateToProps)(Radium(CreateCard));

