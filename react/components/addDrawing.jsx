import React, {Component} from "react";
import _ from "lodash";
import Radium from "radium";
import {connect} from "react-redux";
import config from "../../config";
import Modal from "./util/modal.jsx";
import TextField from "./util/textField.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import {infoAlert} from "../actions/alerts.js";
import {reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import PropTypes from "prop-types";
import ImgPicker from "./imgPicker.jsx";
import PreviewImage from "./previewImage.jsx";
import Cropper from "./util/cropper.jsx";
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
                color: "#731D1D"
            }
        }
}

class AddDrawing extends Component{
        render(){
        return (<span>
                <i className="fa fa-pencil-square-o" aria-hidden="true"
                    style={style.btn}
                    data-tip="Add drawing">
                </i>            
            </span>);
    }
}

export default connect(null, {infoAlert, searchImg, searchGif, resetSearchImages})(Radium(AddDrawing));