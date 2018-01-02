import React, {Component} from "react";
import {connect} from "react-redux"
import Dictionary from "../components/dictionary"
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import userDeckAdapter from "../adapters/userDeckAdapter.js"

class DictionaryContainer extends Component{

    constructor(props){
        super(props)
        this.state = {deckLang: ""};
        this.updateLang = this.updateLang.bind(this)
    }

    componentDidMount(){
        this.updateLang();
    }

    updateLang(){
        const deckId = deckPathAdapter.getLastIdFromPath(this.props.path);
        const lang = userDeckAdapter.getLang(this.props.userDecks, deckId)
        this.setState({deckLang: lang});
    }

    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.path !== this.props.path)
            this.updateLang();
    }

    render(){
        return <Dictionary
                onDefine={this.props.onDefine}
                lang={this.state.deckLang}
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

export default connect(mapStateToProps, {})(DictionaryContainer)