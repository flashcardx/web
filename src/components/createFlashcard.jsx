import React, {Component} from 'react';
import Radium from "radium";
import Modal from "./util/modal.jsx";
import GreenButton from "./util/greenButton";
import {connect} from "react-redux";
import {infoAlert} from "../actions/alerts.js";
import _ from "lodash";
import Formsy from 'formsy-react';
import {MyOwnInput} from "./util/form.jsx";
import MultimediaCreator from "./multimediaCreator.jsx";

class CreateFlashcard extends Component{

    constructor(props){
        super(props);
        this.state = {form:{name: this.props.name, description:this.props.description}, multimediaBox: null}
        this.renderForm = this.renderForm.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.reset = this.reset.bind(this);
        this.onChangeFormName = this.onChangeFormName.bind(this);
        this.onChangeFormDescription = this.onChangeFormDescription.bind(this);
        this.updateMultimediaBox = this.updateMultimediaBox.bind(this);
    }

    closeModal(){
           this.props.closeModal();
    }

    reset(){
        this.onImgDelete();
        this.setState({form:{name:"", description: ""}}, ()=>{
            this.refs.form.reset();
        });
    }

     onCrop(r){
    }

    onImgDelete(src){
            this.props.onImgDelete(src);
    }

    onSubmit({name, description}){
            if(!description && this.props.pickedImages.length === 0)
                return this.props.infoAlert("Ouch!, Tu ficha debe contener una descripcion o algun contenido multimedia");
            this.props.onSubmit(name, description,()=>{
                if(this.props.resetOnClose)
                    this.reset();
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
        return (
            <div style={{marginTop:"10px"}} className="container">
                <div className="row">
                <Formsy.Form ref="form" className="col" id="cardForm" onValidSubmit={this.onSubmit}>                         
                                     <div className="col-sm-12">
                                            <MyOwnInput
                                                validationErrors={{
                                                    maxLength: "El nombre de tu ficha debe contener menos de 40 caracteres",
                                                    isDefaultRequiredValue: "Tu ficha necesita un nombre"
                                                    }}
                                                name="name"
                                                required
                                                validations="maxLength:40"
                                                onChange={this.onChangeFormName}
                                                placeholder="Nombre de la ficha, concepto que queres recordar"
                                                value={this.state.form.name}
                                            />
                                        </div>
                                     <div className="col-sm-12">
                                            <MyOwnInput
                                                validationErrors={{
                                                    maxLength: "La descripcion de tu ficha debe contener menos de 850 caracteres",
                                                    }}
                                                validations="maxLength:850"
                                                onChange={this.onChangeFormDescription}
                                                value={this.state.form.description}
                                                name="description"
                                                multiLine={true}
                                                placeholder="Descripción, algo que te ayude a recordar el concepto"
                                            />
                                        </div>
                        </Formsy.Form>
                </div>
                <div style={{marginTop:"10px"}} className="container">
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
            </div>
        );
    }

    render(){
        var confirmObject = (
                         <GreenButton
                                disabled={this.props.bigLoading}
                                label={this.props.buttonTitle}
                                type="submit"
                                form="cardForm"
                                />
                        );
        return (
            <div style={{"display":"inline-block","marginRight":"20px"}}>
                <Modal titleStyle={{backgroundColor:"#5cb85c", padding:"10px 10px 10px 15px", marginBottom:"10px"}} confirmObject={confirmObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.props.modalOpened} closeLabel="Cancelar" title={this.props.title}>
                    {this.renderForm()}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}




export default connect(mapStateToProps, {infoAlert})(Radium(CreateFlashcard));

