import React, {Component} from "react";
import {connect} from "react-redux"
import Translator from "../components/translator"
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import userDeckAdapter from "../adapters/userDeckAdapter.js"

class TranslatorContainer extends Component{

    constructor(props){
        super(props)
        this.state = {deckId:null, defaultLang: ""};
        this.updateLang = this.updateLang.bind(this)
        this.updateDeckId = this.updateDeckId.bind(this);
    }

    componentDidMount(){
        this.updateDeckId();
    }
    
    updateDeckId(){
        const deckId = deckPathAdapter.getLastIdFromPath(this.props.path);
        this.setState({deckId: deckId}, ()=>{
            this.updateLang();
        });
    }

    updateLang(){
        const lang = userDeckAdapter.getLang(this.props.userDecks, this.state.deckId)
        this.setState({defaultLang: lang});
    }

    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.path !== this.props.path){
            this.updateDeckId();
        }
    }

    render(){
        return <Translator
                deckId = {this.state.deckId}
                onClose={this.props.onClose}
                defaultLang={this.state.defaultLang}
                searchQuery={this.props.searchQuery}
        />
    }

}

function mapStateToProps(state){
    return {
        userDecks: state.userDecks,
        path: state.userDecksPath
    }
}

export default connect(mapStateToProps, {})(TranslatorContainer)