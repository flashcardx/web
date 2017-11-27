import React, {Component} from "react";
import Radium from "radium";
import Page from "../../components/page.jsx";
import WhiteBar from "../../components/util/whiteBar.jsx";
import { Link } from 'react-router-dom';
import {getDeckName} from "../../actions/deck";
import {connect} from "react-redux";

class SpacedRepetition extends Component{
    
    constructor(props){
        super(props);
        this.state = {deckId: props.match.params.deckId, deckName:"Cargando..."};
        this.replaceDeckName = this.replaceDeckName.bind(this);
    }

    componentDidMount(){
        this.replaceDeckName();
    }

    replaceDeckName(){
        if(this.state.deckId === "all")
            return this.setState({deckName:"Todos"});
        this.props.getDeckName(this.state.deckId);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.deckName && nextProps.deckName !== this.state.deckName)
            this.setState({deckName: nextProps.deckName});
    }

    render(){
        return(
            <Page noWrap name="practice">
                 <WhiteBar>
                        <span className="col">Método: Repeticion espaceada <Link to="/practice"><i className="fa fa-pencil" aria-hidden="true"></i></Link></span>
                        <span className="col">Mazo: {this.state.deckName} <Link to="/practice/spaced-repetition"><i className="fa fa-pencil" aria-hidden="true"></i></Link></span>
                </WhiteBar>
                <div className="container">
                    deckId: {this.state.deckId}
                </div>
            </Page>
        )
    }
}

function mapStateToProps(state){
    return {
        deckName: state.deckName
    }
}

export default connect(mapStateToProps, {getDeckName})(Radium(SpacedRepetition));