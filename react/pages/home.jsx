import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {deleteUserDeck, fetchUserDecks} from "../actions/deck.js";
import RaisedButton from 'material-ui/RaisedButton';
import CreateUserDeckContainer from "../containers/createUserDeckContainer.jsx";
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
        this.state = {path:[], isLocked:false};
        this.pushDeck = this.pushDeck.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.renderPath = this.renderPath.bind(this);
    }

    pushDeck(id, name){
        console.log(1);
        var newDeck = {id, name};
        this.setState({ path: deckPathAdapter.cloneAndPushOne(this.state.path, newDeck),
                    isLocked:true}, ()=>{
                    console.log("fetching use decks...");
                    this.props.fetchUserDecks(0, this.state.path);
        });
    }

    componentWillReceiveProps(){
        console.log("component will receive props");
        this.setState({isLocked: false});
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("should component update isLocked: ", nextState.isLocked);
        return !nextState.isLocked;
    }

    render(){
        console.log("render");
        const parentId = deckPathAdapter.getLastIdFromPath(this.state.path);
        return (
            <Page name="my collection">
                <div className="container">
                    <div style={style.row1} className="row">
                        <div className="col-lg-9  col-sm-6">
                            <h2>Your decks</h2>
                             Path: {this.renderPath()}
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <CreateUserDeckContainer parentId={parentId}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <DeckGalleryUserContainer
                                         pushDeck={this.pushDeck}
                                         onDelete={()=>{}}
                                         path={this.state.path.slice()}
                                         decks={this.props.decks}/> 
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    goToIndex(pathLastIndex){
        var limitToDrop = this.state.path.length - pathLastIndex;
        var newPath = deckPathAdapter.cloneAndDropFromRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
    }

    renderPath(){
        return (
            <span>
                <span onClick={()=>this.goToIndex(0)} style={style.path}>Root</span>
                {this.state.path.map((p, i)=>{
                    return <span key={(i+1)}> / <span onClick={()=>this.goToIndex(i+1)} style={style.path}>{p.name}</span></span>
                    })
                }
            </span>
        );
    }


}

function mapStateToProps(state){
    return {decks: state.userDecks};
}

export default connect(mapStateToProps, {getUserInfo, deleteUserDeck, successAlert, fetchUserDecks})(Radium(Home));