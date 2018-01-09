import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchSpellSuggestions as fetchSuggestions,
        clearSpellSuggestions as clearSuggestions} from "../actions/dictionary"
import {MyOwnAutocomplete} from "../components/util/form.jsx";

class SpellSuggestionsContainer extends Component{

    constructor(props){
        super(props)
        this.state = {suggestions: []}
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        this.langIsSupported = this.langIsSupported.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps.suggestions !== this.props.suggestions){
            const newSuggestions = this.props.suggestions.map(suggestion=>{
                return suggestion.word
            })
            this.setState({suggestions: newSuggestions})
        }
    }

    langIsSupported(){
        switch (this.props.lang) {
            case "en":
            case "es": return true        
            default:
                    return false
        }
    }

    fetchSuggestions(){
        if(this.langIsSupported()){
            if(this.props.value)
                this.props.fetchSuggestions(this.props.lang, this.props.value)
            else
                this.props.clearSuggestions()
        }
    }

    render(){
        return <MyOwnAutocomplete {...this.props} fetchSuggestions={this.fetchSuggestions} suggestions={this.state.suggestions}/>
    }

}

function mapStateToProps(state){
    return {
        suggestions: state.spellSuggestions
    }
}

export default connect(mapStateToProps, {fetchSuggestions, clearSuggestions})(SpellSuggestionsContainer)