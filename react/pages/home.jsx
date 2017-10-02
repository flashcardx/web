import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {successAlert} from "../actions/alerts";
import {deleteUserDeck} from "../actions/deck.js";
import RaisedButton from 'material-ui/RaisedButton';
import CreateUserDeckContainer from "../containers/createUserDeckContainer.jsx";
import DeckGalleryUserContainer from "../containers/deckGalleryUserContainer.jsx";
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
        this.pushDeck = this.pushDeck.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.renderPath = this.renderPath.bind(this);
     }

    componentDidMount(){
        return;
        this.pushDeck("a", "testing");
    }

    pushDeck(id, name){
        console.log("pushing deck...");
        var newDeck = {id, name};
        this.setState({ path: this.state.path.concat([newDeck]) });
    }

    render(){
        console.log("path at render: "+ JSON.stringify(this.state.path));
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
                            <DeckGalleryUserContainer parentId={this.state.parentId}
                                         pushDeck={this.pushDeck}
                                         onDelete={()=>{}}
                                         path={this.state.path}
                                         decks={this.props.decks}/> 
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

    goToIndex(that, this2, pathLastIndex){
        console.log(this===this2);
        console.log(this === that);
        console.log("goto: ", pathLastIndex);
        console.log("path at gotoindex: "+ JSON.stringify(that.state.path));
        return;
        var limitToDrop = that.state.path.length - pathLastIndex;
        var newPath = _.dropRight(that.state.path, limitToDrop);
        that.setState({path: newPath});
    }

    renderPath(){
        const that = this;
        console.log("path at renderpath: "+ JSON.stringify(that.state.path));   
        return (
            <span>
                <span onClick={()=>that.goToIndex(that,this, 0)} style={style.path}>Root</span>
                {this.state.path.map((p, i)=>{
                    return <span key={(i+1)}> / <span onClick={()=>that.goToIndex(that, this, i+1)} style={style.path}>{p.name}</span></span>
                    })
                }
            </span>
        );
    }


}

function mapStateToProps(state){
    return {decks: state.userDecks};
}

export default connect(mapStateToProps, {getUserInfo, deleteUserDeck, successAlert})(Radium(Home));