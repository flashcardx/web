import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {fetchUserDecks, deleteUserDeck} from "../actions/deck.js";
import RaisedButton from 'material-ui/RaisedButton';
import CreateUserDeckContainer from "../containers/createUserDeckContainer.jsx";
import DeckGallery from "../components/deckGallery.jsx";
import _ from "lodash";

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
        console.log("home constructor");
        super(props);
        this.state = {parentId:null, path:[]};
        this.fetchDecks = this.fetchDecks.bind(this);
        this.renderPath = this.renderPath.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.pushDeck = this.pushDeck.bind(this);
    }

    componentWillMount(){
        this.props.getUserInfo();
    }

    fetchDecks(skip){
        this.props.fetchUserDecks(this.state.parentId, skip, this.state.path);
    }

    goToIndex(pathLastIndex){
        console.log("goto index", this.state.path);
        var limitToDrop = this.state.path.length - pathLastIndex;
        var newPath = _.dropRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
    }

    pushDeck(id, name){
        this.setState((prevState, props)=>{
            var newDeck = [{id: id, name: name}];
            console.log("new path: ", prevState.path.concat(newDeck));
            return {path: prevState.path.concat(newDeck)};
        });

    }

    componentWillUpdate(nextProps, nextState){
        console.log("nextstate: ",  nextState);
    }

    renderPath(){
        return (
            <div>
                <span onClick={()=>this.goToIndex(0)} style={style.path}>Root</span>
                {this.state.path.map((p, i)=>{
                    <span key={(i+1)} onClick={()=>this.goToIndex(i+1)} style={style.path}>{p.name}</span>
                    })
                }
            </div>
        );
    }

    onDelete(deckId){
        this.props.deleteUserDeck(deckId, this.state.path, ()=>{
            this.props.successAlert("Deck deleted succesfully !");
            this.forceUpdate();
        });
    }

    render(){
         console.log("path at render: ", this.state.path);
        return (
            <Page name="my collection">
                <div className="container">
                    <div style={style.row1} className="row">
                        <div className="col-lg-9  col-sm-6">
                            <h2>Your decks</h2>
                             Path: {this.renderPath()}
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <CreateUserDeckContainer path={this.state.path}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <DeckGallery pushDeck={this.pushDeck} onDelete={this.onDelete} path={this.state.path} fetch={this.fetchDecks} decks={this.props.decks}/>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

function mapStateToProps(state){
    return {decks: state.userDecks};
}

export default connect(mapStateToProps, {getUserInfo, fetchUserDecks, deleteUserDeck, successAlert})(Radium(Home));