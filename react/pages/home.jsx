import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {deleteUserFlashcard} from "../actions/card";
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
    path:{
        p:{ color: "grey",
            fontWeight:"400",
            fontSize:"18px",
            cursor: "pointer",
            lineHeight:"36px" 
          },
        angle:{ 
            paddingBottom:"6px",
            paddingLeft:"10px",
            paddingRight:"10px",
            fontSize:"20px"
        }
        
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
        this.renderPath = this.renderPath.bind(this);
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
            this.props.successAlert("Deck deleted succesfully !");
            this.forceUpdate();
        });
    }

    onFlashcardDelete(flashcardId){
        const deckId = deckPathAdapter.getLastIdFromPath(this.props.path);
        this.props.deleteUserFlashcard(deckId, flashcardId, ()=>{
            this.props.successAlert("Card deleted succesfully !");
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
                                <div className="col-lg-6  col-md-12 col-sm-12">
                                     {this.renderPath()}
                                </div>
                                <div className="text-center col-lg-6 col-md-12 col-sm-12">
                                    {createCard}
                                    <CreateUserDeckContainer parentId={parentId}/>                          
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                    parentId &&
                      <div className="container">
                        <div style={style.rowContent}  className="row">
                            <div className="col">
                                <h2>Cards:</h2>
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
                                <h2>Decks:</h2>
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

    renderPath(){
        return (
            <span>
                <span onClick={()=>this.goToIndex(0)} style={style.path.p}>Root</span>
                {this.props.path.map((p, i)=>{
                    return <span key={(i+1)}><i style={style.path.angle} className="fa fa-angle-right fa-lg"></i><span onClick={()=>this.goToIndex(i+1)} style={style.path.p}>{p.name}</span></span>
                    })
                }
            </span>
        );
    }


}

function mapStateToProps(state){
    return {decks: state.userDecks, path: state.userDecksPath};
}

export default connect(mapStateToProps, {getUserInfo, deleteUserDeck,deleteUserFlashcard, successAlert, fetchUserDecks, pushToPath, dropFromPath})(Radium(Home));