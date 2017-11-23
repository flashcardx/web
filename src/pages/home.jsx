import React, {Component} from "react";
import Page from "../components/page.jsx";
import Path from "../components/util/path.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {deleteUserFlashcard} from "../actions/flashcard";
import {deleteUserDeck, fetchUserDecks, pushToPath, dropFromPath} from "../actions/deck.js";
import Button from 'material-ui/RaisedButton';
import CreateUserDeckContainer from "../containers/createUserDeckContainer.jsx";
import CreateUserFlashcardContainer from "../containers/createUserFlashcardContainer.jsx";
import DeckGalleryUserContainer from "../containers/deckGalleryUserContainer.jsx";
import FlashcardGalleryUserContainer from "../containers/flashcardGalleryUserContainer.jsx";
import _ from "lodash";
import deckPathAdapter from "../adapters/deckPathAdapter.js";

const style = {
    row1:{
        margin: "0px",
        backgroundColor:"white",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
        padding:"10px"
    },
    rowContent:{
        marginTop:"30px"
    }
}

class Home extends Component{
    constructor(props){
        super(props);
        this.pushToPath = this.pushToPath.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onDeckDelete = this.onDeckDelete.bind(this);
        this.onFlashcardDelete = this.onFlashcardDelete.bind(this);
    }

    componentDidMount(){
        this.props.getUserInfo();
    }

    pushToPath(deckId, deckName){
        this.props.pushToPath(deckId, deckName);
    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(nextProps.path, this.props.path)){
            this.props.fetchUserDecks(0, nextProps.path);
        }
    }

    onDeckDelete(deckId){
        this.props.deleteUserDeck(deckId, ()=>{
            this.props.successAlert("Mazo eliminado exitosamente!");
            this.forceUpdate();
        });
    }

    onFlashcardDelete(flashcardId){
        const deckId = deckPathAdapter.getLastIdFromPath(this.props.path);
        this.props.deleteUserFlashcard(deckId, flashcardId, ()=>{
            this.props.successAlert("Ficha eliminada exitosamente!");
            this.forceUpdate();
        });
    }

    render(){
        const parentId = deckPathAdapter.getLastIdFromPath(this.props.path);
        var createCard = null;
        if(parentId)
            createCard = <CreateUserFlashcardContainer parentId={parentId}/>;
                        
        return (
            <Page noWrap name="my collection">
                <div>
                    <div style={style.row1} >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8  col-md-7 col-sm-12">
                                     <Path goToIndex={this.goToIndex} path={this.props.path}/>
                                </div>
                                <div className="text-center col-lg-4 col-md-5 col-sm-12">
                                    <div className="row">
                                        {createCard}
                                        <CreateUserDeckContainer parentId={parentId}/>                          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                    parentId &&
                      <div className="container">
                        <div style={style.rowContent}  className="row">
                            <div className="col">
                                <h2>Fichas:</h2>
                                <FlashcardGalleryUserContainer
                                            onDelete={this.onFlashcardDelete}
                                            deckId={parentId}
                                            decks={this.props.decks}/> 
                            </div>
                        </div>
                       </div>
                    }
                    <div className="container">
                        <div style={style.rowContent} className="row">
                            <div className="col">
                                <h2>Mazos:</h2>
                                <DeckGalleryUserContainer
                                             pushToPath={this.pushToPath}
                                             onDelete={this.onDeckDelete}
                                             path={this.props.path.slice()}
                                             decks={this.props.decks}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    goToIndex(pathLastIndex){
        this.props.dropFromPath(pathLastIndex);
    }

}

function mapStateToProps(state){
    return {decks: state.userDecks, path: state.userDecksPath};
}

export default connect(mapStateToProps, {getUserInfo, deleteUserDeck,deleteUserFlashcard, successAlert, fetchUserDecks, pushToPath, dropFromPath})(Radium(Home));