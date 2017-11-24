import React, {Component} from 'react';
import Radium from "radium";
import config from "../api_config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {change} from 'redux-form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUserDeck} from "../actions/deck.js";
import {successAlert, infoAlert, showLoading, hideLoading} from "../actions/alerts.js";
import Formsy from 'formsy-react';
import {MyOwnInput, MyOwnTextarea, MyOwnSelect} from "./util/form.jsx";
import MultimediaCreator from "./multimediaCreator.jsx";
import IconButton from 'material-ui/IconButton';
import _ from "lodash";

function langOptions(){
        return [{value:"", label:"Elige un lenguaje para tu mazo"},
                {label: "English", value:"en"},
                {label: "Español", value:"es"},
                {label: "Čeština", value:"cs"},
                {label: "Dansk", value:"da"},
                {label: "Deutsch", value:"de"},
                {label: "Français", value:"fr"},
                {label: "Indonesia", value:"id"},
                {label: "Italiano", value:"it"},
                {label: "Magyar", value:"hu"},
                {label: "Nederlands", value:"nl"},
                {label: "Norsk", value:"no"},
                {label: "Polski", value:"pl"},
                {label: "Português", value:"pt"},
                {label: "Română", value:"ro"},
                {label: "Slovenčina", value:"sk"},
                {label: "Suomi", value:"fi"},
                {label: "Svenska", value:"sv"},
                {label: "Türkçe", value:"tr"},
                {label: "Việt", value:"vi"},
                {label: "ไทย", value:"th"},
                {label: "Български", value:"bq"},
                {label: "Русский", value:"ru"},
                {label: "Ελληνική", value:"el"},
                {label: "한국어", value:"ko"},
                {label: "日本語", value:"ja"},
                {label: "简体中文", value:"zh"}];
    }

class CreateDeck extends Component{

    constructor(props){
        super(props);
        this.state = {form:{name:props.name, description:props.description, lang:props.lang, errorMsj:null}};
        this.renderForm = this.renderForm.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.loadImageOnForm = this.loadImageOnForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFormName = this.onChangeFormName.bind(this);
        this.onChangeFormDescription = this.onChangeFormDescription.bind(this);
        this.onChangeFormLang = this.onChangeFormLang.bind(this); 
        this.closeModal = this.closeModal.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset(){
        this.setState({form:{name:"", description:"", lang:"", errorMsj:null}}, ()=>{
             this.refs.form.reset();
        });
        this.props.onImgDelete();
    }

    closeModal(){
           this.props.closeModal();
    }

     onCrop(r){
      
    }

    componentWillReceiveProps(nextProps){
            if(!_.isEqual(nextProps.pickedImages, this.props.pickedImages)){
                this.loadImageOnForm(nextProps.pickedImages);
            }
            if(this.state.errorMsg && nextProps.pickedImages.length != 0)
                this.setState({errorMsg: null});
    }

    loadImageOnForm(img){
            this.props.dispatch(change(this.props.formName, "img", img));
    }

    onImgDelete(){
        this.props.onImgDelete();
    }

     onChangeFormName(e){
        var newForm = _.clone(this.state.form);
        newForm.name = e.target.value;
        this.setState({form:newForm});
    }

    onChangeFormLang(e){
        var newForm = _.clone(this.state.form);
        newForm.lang = e.target.value;
        this.setState({form:newForm});
    }

    onChangeFormDescription(e){
        var newForm = _.clone(this.state.form);
        newForm.description = e.target.value;
        this.setState({form:newForm});
    }

    onSubmit({name, description, lang}){
        if(this.props.pickedImages.length == 0)
            return this.setState({errorMsg:"Tu mazo necesita una imagen de portada!"});
        this.props.onSubmit(name, description, lang, ()=>{
            this.reset();
            this.closeModal();
        });
    }

    renderForm(){
        const {handleSubmit} = this.props;
        return (
            <div className="container">
                <div className="row">
                <Formsy.Form ref="form" className="col" id="deckForm" onValidSubmit={this.onSubmit}>                         
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                                <MyOwnInput
                                                validationErrors={{
                                                    minLength: "El nombre de tu mazo debe tener al menos 2 caracteres",
                                                    isDefaultRequiredValue: "Tu mazo debe contener un nombre"
                                                    }}
                                                validations="minLength:2"
                                                name="name"
                                                required
                                                onChange={this.onChangeFormName}
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre del mazo"
                                                value={this.state.form.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <MyOwnTextarea
                                                validationErrors={{
                                                    minLength: "La descripcion de tu mazo debe contener almenos 4 caracteres",
                                                    isDefaultRequiredValue: "Tu mazo necesita una descripcion!"
                                                    }}
                                                required
                                                validations="minLength:4"
                                                onChange={this.onChangeFormDescription}
                                                value={this.state.form.description}
                                                className="form-control"
                                                name="description"
                                                type="text"
                                                placeholder="Descripcion, ¿que tipo/tema de contenido vas a guardar en este mazo?"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col">
                                                    <MyOwnSelect
                                                        validationErrors={{
                                                            isDefaultRequiredValue: "Por favor elegí un idioma para tú mazo"
                                                            }}
                                                        required
                                                        name="lang"
                                                        options={langOptions()}
                                                        onChange={this.onChangeFormLang}
                                                        value={this.state.form.lang}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <i className="fa fa-info-circle" style={{margin:"5px"}} aria-hidden="true" data-for="modal-tooltip"	 data-tip="El lenguaje en el que vas a crear los titulos de las fichas adentro de este mazo, <br/> es importante ya que otros servicios como por ejemplo la &quot;pronunciacion automatica&quot; se basan en este campo. <br/>Si experimentas problemas relacionados al idioma puede que tengas que cambiar este campo"></i>
                                                </div>
                                            </div>                                           
                                            </div>
                                    </div>
                        </Formsy.Form>
                    </div>
                    <div className="container">
                        <MultimediaCreator  image
                                            errorMsg={this.state.errorMsg}
                                            searchQuery={this.state.form.name}
                                            onImageCrop={this.onCrop}
                                            onImgDelete={this.props.onImgDelete}
                                            pickedImages={this.props.pickedImages}
                                            maxPickedImgs={1}
                                            bigLoading={this.props.bigLoading}
                                            onImgPick={this.props.onImgPick}
                                            onImgUpload={this.props.onImgUpload}/>
                    </div>
            </div>
        );
    }
    render(){
        var confirmObject = (
                         <RaisedButton
                                disabled={this.props.bigLoading}
                                label={this.props.buttonTitle}
                                primary={true}
                                type="submit"
                                form="deckForm"
                                buttonStyle={{backgroundColor:"#f4424b"}}  
                                />
                        );
        return (
            <div style={{"display":"inline-block","marginRight":"20px"}}>
                <Modal titleStyle={{backgroundColor:"#f4424b", padding:"10px 10px 10px 15px", marginBottom:"10px"}} confirmObject={confirmObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.props.modalOpened} closeLabel="Cancelar" title={this.props.title}>
                    {this.renderForm()}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

CreateDeck.PropTypes = {
    path: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Radium(CreateDeck));