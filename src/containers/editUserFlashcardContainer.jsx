import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {editUserFlashcard} from "../actions/flashcard.js";
import {successAlert} from "../actions/alerts.js";
import IconButton from 'material-ui/IconButton';
import {proxyImgFromUrl, proxyImgFromData, deleteImageReady} from "../actions/image";
import CreateFlashcard from "../components/createFlashcard.jsx";
import userDeckAdapter from "../adapters/userDeckAdapter";
import _ from "lodash";
const FORM_NAME = "userdeckForm";


class EditUserFlashcardContainer extends Component{

    constructor(props){
        super(props);
        this.state = {lang:"en", pickedImages:[], modalOpened:false};
        this.onSubmit = this.onSubmit.bind(this);
        this.onImgPick = this.onImgPick.bind(this);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onImgDelete = this.onImgDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setLang = this.setLang.bind(this)
    }

    componentDidMount(){
        this.setLang()
    }

    setLang(){
        const newLang = userDeckAdapter.getLang(this.props.allDecks, this.props.deckId)
        this.setState({lang: newLang})
    }

    onSubmit(name, description, callback){
        const data = {
            imgs: this.state.pickedImages,
            deckId: this.props.deckId,
            name: name,
            description: description,
            cardId: this.props.card._id
        };
        this.props.editUserFlashcard(data, ()=>{
            this.closeModal();
            callback();
        });
    }

    onImgDelete(src){
        if(!src)//delete all images if not src
            return this.setState({pickedImages: []});
        var newImages = this.state.pickedImages.slice();
        var index = newImages.findIndex(i=>{return i.src === src});
        newImages.splice(index, 1);
        this.setState({pickedImages: newImages});
        this.props.deleteImageReady();
    }

    componentWillReceiveProps(nextProps){
            if(!_.isEqual(this.props.imageReady, nextProps.imageReady) && nextProps.imageReady){
                 if(this.state.pickedImages.length>=3)
                    return;
                var newImages = this.state.pickedImages.slice(); 
                newImages.push(nextProps.imageReady);
                return this.setState({pickedImages: newImages});
            }
    }

    componentDidUpdate(prevProps){
        if(prevProps.deckId !== this.props.deckId){
            this.setLang();
        }
    }

    onImgPick(img){
        this.props.proxyImgFromUrl(img);
    }

    onImgUpload(img){
        var form = new FormData();
        form.append("data", img.data);
        this.props.proxyImgFromData(form, img);
    }

    onCrop(img, callback){
    }

    openModal(){
        this.setState({modalOpened:true, pickedImages: this.props.card.imgs});
    }

    closeModal(){
        this.setState({modalOpened:false});
    }

    render(){
        const {card} = this.props;
        return (
            <div>
                <IconButton onClick={this.openModal} iconStyle={{ color: "#FF664C" }} data-tip="Editar" iconClassName="material-icons">
                        create
                </IconButton>
                <CreateFlashcard
                            lang={this.state.lang}
                            deckId={this.props.deckId}
                            modalOpened={this.state.modalOpened}
                            closeModal={this.closeModal}
                            buttonTitle="Confirmar"
                            title="Editar ficha"
                            description={card.description}
                            name={card.name}
                            onSubmit={this.onSubmit}
                            onCrop={this.onCrop}
                            onImgDelete={this.onImgDelete}
                            pickedImages={this.state.pickedImages}
                            onImgPick={this.onImgPick}
                            onImgUpload={this.onImgUpload}
                            formName={FORM_NAME}
                            {...this.props}
                            />
            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteImageReady, editUserFlashcard, successAlert,
            proxyImgFromUrl, proxyImgFromData}, dispatch);
}

function mapStateToProps(state){
    return {
        imageReady: state.imageReady,
        allDecks: state.userDecks
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUserFlashcardContainer);
