import React, {Component} from 'react';
import Radium from "radium";
import Modal from "./util/modal.jsx";
import {change} from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import Formsy from 'formsy-react';
import {MyOwnInput, MyOwnSelect} from "./util/form.jsx";
import MultimediaCreator from "./multimediaCreator.jsx";
import _ from "lodash";
import {langs} from "./util/language.js";
import Tooltip from './util/tooltip';

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
            if(this.state.errorMsg && nextProps.pickedImages.length !== 0)
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

    onChangeFormLang(event, index, value){
        var newForm = _.clone(this.state.form);
        newForm.lang = value;
        this.setState({form:newForm});
    }

    onChangeFormDescription(e){
        var newForm = _.clone(this.state.form);
        newForm.description = e.target.value;
        this.setState({form:newForm});
    }

    onSubmit({name, description, lang}){
        if(this.props.pickedImages.length === 0)
            return this.setState({errorMsg:"Tu mazo necesita una imagen de portada!"});
        this.props.onSubmit(name, description, lang, ()=>{
            this.reset();
            this.closeModal();
        });
    }

    renderForm(){
        return (
            <div className="container">
                <div className="row">
                <Formsy.Form ref="form" className="col" id="deckForm" onValidSubmit={this.onSubmit}>                         
                                        <div className="col-sm-12">
                                                <MyOwnInput
                                                validationErrors={{
                                                    minLength: "El nombre de tu mazo debe tener al menos 2 caracteres",
                                                    isDefaultRequiredValue: "Tu mazo debe contener un nombre"
                                                    }}
                                                validations="minLength:2"
                                                name="name"
                                                onEnter={()=>this.refs.form.submit()}
                                                autoFocus
                                                required
                                                onChange={this.onChangeFormName}
                                                placeholder="Nombre del mazo"
                                                value={this.state.form.name}
                                            />
                                        </div>
                                    <div className="col-sm-12">
                                            <MyOwnInput
                                                validationErrors={{
                                                    maxLength: "La descripcion de tu mazo no puede contener mas de 400 caracteres",
                                                    }}
                                                multiLine={true}
                                                validations="maxLength:400"
                                                onChange={this.onChangeFormDescription}
                                                value={this.state.form.description}
                                                onEnter={()=>this.refs.form.submit()}
                                                name="description"
                                                placeholder="Descripcion, ¿que tipo/tema de contenido vas a guardar en este mazo?"
                                            />
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-10 col-sm-10 col-md-11">
                                                    <MyOwnSelect
                                                        validationErrors={{
                                                            isDefaultRequiredValue: "Elige un idioma para tú mazo"
                                                            }}
                                                        required
                                                        placeholder="Idioma de tú mazo"
                                                        name="lang"
                                                        options={langs}
                                                        onChange={this.onChangeFormLang}
                                                        value={this.state.form.lang}
                                                    />
                                                </div>
                                                <div className="col-2 col-sm-2 col-md-1">
                                                    <Tooltip title="El lenguaje en el que vas a crear los titulos de las fichas adentro de este mazo, <br/> es importante ya que otros servicios como por ejemplo la &quot;pronunciacion automatica&quot; se basan en este campo. <br/>Si experimentas problemas relacionados al idioma puede que tengas que cambiar este campo">
                                                        <i className="fa fa-info-circle" style={{margin:"5px", bottom:4, position:"absolute"}} aria-hidden="true"></i>
                                                    </Tooltip>
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
                         <FlatButton
                                disabled={this.props.bigLoading}
                                label={this.props.buttonTitle}
                                primary={true}
                                type="submit"
                                form="deckForm"
                                className="deck-btn"
                                backgroundColor="#f4424b"
                                hoverColor="#92272d"
                                labelStyle={{color:"white"}}
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

export default connect(mapStateToProps)(Radium(CreateDeck));