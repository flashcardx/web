import React, {Component} from "react";
import {connect} from "react-redux"
import Translator from "../components/translator"
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import userDeckAdapter from "../adapters/userDeckAdapter.js"

class TranslatorContainer extends Component{

    constructor(props){
        super(props)
        this.state = {defaultLang: ""};
        this.updateLang = this.updateLang.bind(this)
    }

    componentDidMount(){
        this.updateLang();
    }

    updateLang(){
        const deckId = deckPathAdapter.getLastIdFromPath(this.props.path);
        const lang = userDeckAdapter.getLang(this.props.userDecks, deckId)
        this.setState({defaultLang: lang});
    }

    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.path !== this.props.path)
            this.updateLang();
    }

    render(){
        return <Translator
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