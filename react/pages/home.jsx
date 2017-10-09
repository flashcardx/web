import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {deleteUserDeck, fetchUserDecks, pushToPath, dropFromPath} from "../actions/deck.js";
import RaisedButton from 'material-ui/RaisedButton';
import CreateUserDeckContainer from "../containers/createUserDeckContainer.jsx";
import CreateUserCardContainer from "../containers/createUserCardContainer.jsx";
import DeckGalleryUserContainer from "../containers/deckGalleryUserContainer.jsx";
import _ from "lodash";
import deckPathAdapter from "../adapters/deckPathAdapter.js";

const style = {
    row1:{
        margin: "5px"
    },
    path:{
        color: "blue",
        cursor: "pointer"
    }
}


class Home extends Component{

    constructor(props){
        super(props);
        this.pushToPath = this.pushToPath.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.renderPath = this.renderPath.bind(this);
        this.onDelete = this.onDelete.bind(this);
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

    onDelete(deckId){
        this.props.deleteUserDeck(deckId, ()=>{
            this.props.successAlert("Deck deleted succesfully !");
            this.forceUpdate();
        });
    }

    renderCardGallery(parentId, cards){
        var cardGallery
        if(!parentId)
            return null;
        else{
            if(_.isEmpty(cards))
                cardGallery=<p> You don't have cards in this deck...</p> 
        }
        return (<div>
                    <h2>Cards:</h2>
                {cardGallery}
                </div>  
                    );
    }

    render(){
        const parentId = deckPathAdapter.getLastIdFromPath(this.props.path);
        var createCard = null;
        if(parentId)
            createCard = (<div className="col-lg-3 col-sm-3">
                            <CreateUserCardContainer parentId={parentId}/>
                        </div>);
        var cardGallery = this.renderCardGallery(parentId);
        return (
            <Page name="my collection">
                <div className="container">
                    <div style={style.row1} className="row">
                        <div className="col-lg-6  col-sm-6">
                             {this.renderPath()}
                        </div>
                        {createCard}
                        <div className="col-lg-3 col-sm-3">
                            <CreateUserDeckContainer parentId={parentId}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {cardGallery}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Your decks</h2>
                            <DeckGalleryUserContainer
                                         pushToPath={this.pushToPath}
                                         onDelete={this.onDelete}
                                         path={this.props.path.slice()}
                                         decks={this.props.decks}/> 
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
                <span onClick={()=>this.goToIndex(0)} style={style.path}>Root</span>
                {this.props.path.map((p, i)=>{
                    return <span key={(i+1)}> > <span onClick={()=>this.goToIndex(i+1)} style={style.path}>{p.name}</span></span>
                    })
                }
            </span>
        );
    }


}

function mapStateToProps(state){
    return {decks: state.userDecks, path: state.userDecksPath};
}

export default connect(mapStateToProps, {getUserInfo, deleteUserDeck, successAlert, fetchUserDecks, pushToPath, dropFromPath})(Radium(Home));