import React, {Component} from "react";
import {listDecksName} from "../../actions/deck";
import {connect} from "react-redux";
import SelectDeck from "../../components/selectDeck.jsx";
import _ from "lodash";
import {Redirect} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import WhiteBar from "../../components/util/whiteBar.jsx";
import Page from "../../components/page.jsx";

class DeckChooser extends Component{
    constructor(props){
        super(props);
        this.state = {redirect: null, method: props.match.params.method, path:[]};
        this.addDeck = this.addDeck.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onDeckPick = this.onDeckPick.bind(this);
        this.submit = this.submit.bind(this);
    }

    onDeckPick(deckId, name){
        this.addDeck(name, deckId);
        this.props.listDecksName(deckId);  
    };

    goToIndex(index){
        const limitToDrop = this.state.path.length - index;
        const newPath = _.dropRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
        var lastId = newPath.length>0?newPath[newPath.length - 1]._id : undefined;
        this.props.listDecksName(lastId);
    }

    addDeck(deckName, deckId){
        var newPath = this.state.path.slice();
        newPath.push({name:deckName, _id:deckId});
        this.setState({path:newPath});
    }

    submit(){
        var deckId;
        if(!_.isEmpty(this.state.path))
            deckId = this.state.path[this.state.path.length-1]._id;
        const path = this.state.method+"/"+(deckId?deckId:"all");
        this.setState({redirect: path});
    }

    render(){
        if(this.state.redirect)
            return  <Redirect push to={"/practice/"+this.state.redirect} />
      return ( <Page noWrap name="practice">
                <WhiteBar>
                        <h4>Elige el mazo a practicar</h4>
                </WhiteBar>
                <div className="container">
                    <WhiteBar>
                            <div className="col-7">
                                <SelectDeck onDeckPick={this.onDeckPick}
                                            goToIndex={this.goToIndex}
                                            decksName={this.props.decksName}
                                            path={this.state.path}
                                            description=""
                                            listDecks={this.props.listDecksName}/>   
                            </div>
                            <div className="col-5">
                                <RaisedButton
                                        label="Practicar"
                                        primary={true}
                                        onClick={this.submit}
                                        buttonStyle={{backgroundColor:"#f952ae"}}  
                                        />
                            </div>
                    </WhiteBar>
                </div>
        </Page>);
    }
}

function mapStateToProps(state){
    return {
        decksName: state.decksName
    }
}
export default connect(mapStateToProps, {listDecksName})(DeckChooser);