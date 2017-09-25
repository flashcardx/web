import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import {connect} from "react-redux";
import {getUserInfo} from "../actions/user";
import {fetchUserDecks} from "../actions/deck.js";
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
        super(props);
        this.state = {parentId:null, path:[]};
        this.fetchDecks = this.fetchDecks.bind(this);
        this.renderPath = this.renderPath.bind(this);
   //     this.goTo = this.goTo.bind(this);
    }

    componentWillMount(){
        this.props.getUserInfo();
    }

    fetchDecks(skip){
        this.props.fetchUserDecks(this.state.parentId, skip, this.state.path);
    }

    goTo(pathLastIndex){
        var limitToDrop = this.state.path.length - pathLastIndex;
        var newPath = _.dropRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
    }

    renderPath(){
        var path = <span onClick={()=>this.goTo(0)} style={style.path}>Root</span>;
        this.state.path.forEach((p, i)=>{
            if(i != 0)
                path += "/";
            ṕath += <span onClick={()=>this.goTo(i+1)} style={style.path}>p.name</span>
        });
        return (
            <span>{path}</span>
        );
    }

    render(){
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
                            <DeckGallery path={this.state.path} fetch={this.fetchDecks} decks={this.props.decks}/>
                    </div>
                </div>
            </Page>
        );
    }
}

function mapStateToProps(state){
    return {decks: state.userDecks};
}

export default connect(mapStateToProps, {getUserInfo, fetchUserDecks})(Radium(Home));