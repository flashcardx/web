import React, {Component} from "react";
import Radium from "radium";
import {connect} from "react-redux";
import Modal from "./util/modal.jsx";
import {MyOwnInput, MyOwnSelect} from "./util/form.jsx";
import FlatButton from 'material-ui/FlatButton';
import {infoAlert} from "../actions/alerts.js";
import {reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import PropTypes from "prop-types";
import ImgPicker from "./imgPicker.jsx";
import Formsy from 'formsy-react';
import PreviewImage from "./previewImage.jsx";
import Cropper from "./util/cropper.jsx";
import {langs} from "./util/language.js";
import SwapIcon from 'material-ui/svg-icons/action/swap-horiz';
import {fullWhite} from 'material-ui/styles/colors';
import {searchImg, searchGif, resetSearchImages} from "../actions/image";

const style = {
    marginRight:{
        marginRight: "7px"
    },
    marginTop:{
        marginTop: "20px"
    },
    btn:{
            cursor:"pointer",
            fontSize: "25px",
            ":hover":{
                color: "red"
            }
        }
}

class Translator extends Component{

    constructor(props){
        super(props);
        this.state = {openModal:false, from:"", to:""};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderTranslator = this.renderTranslator.bind(this);
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
    }
    
    renderButton(){
        return (<span>
                <i className="fa fa-language" aria-hidden="true"
                    style={style.btn}
                    data-for="modal-tooltip"
                    data-tip="Traductor"
                    onClick={this.openModal}>
                </i>            
            </span>);
    }

    renderTranslator(){
         return (
            <div className="container">
                    renderTranslator
            </div>
        );
    }

    openModal(){
        this.setState({openModal: true});
    }

    closeModal(){
        this.setState({openModal: false});
    }

    onChangeFrom(event, index, value){
        this.setState({from: value});
    }

    onChangeTo(event, index, value){
        this.setState({to: value});
    }

    translate(){

    }

    renderTitle(){
        return  <div className="row">
                    <div className="col-5">
                        <MyOwnSelect
                                 name="from"
                                 options={langs}
                                 onChange={this.onChangeFrom}
                                 value={this.state.from}
                        />
                    </div>
                   <div className="col-2">
                       <FlatButton  backgroundColor="#4286f4"
                                    labelStyle={{padding:"0px"}}
                                    hoverColor="#346bc3"
                                    icon={<SwapIcon color={fullWhite} />}/>
                   </div>
                   <div className="col-5">
                        <MyOwnSelect
                                 name="to"
                                 options={langs}
                                 onChange={this.onChangeTo}
                                 value={this.state.to}
                        />
                    </div>
                </div>
   }


    render(){
        return (
            <div>
                    <Formsy.Form ref="form" onValidSubmit={this.translate}>    
                        <Modal autoScroll={true} onClose={this.closeModal} modal={false} open={this.state.openModal} closeLabel="Listo" title={this.renderTitle()}>
                                {this.renderTranslator()}
                        </Modal>
                    </Formsy.Form>
                        {this.renderButton()}
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        searchImages: state.searchImages
    }
}

export default connect(mapStateToProps, {})(Radium(Translator));