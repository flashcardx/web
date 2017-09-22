import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from "radium";

const style ={
}

class CreateDeck extends Component{


    render(){
        return (
            <RaisedButton labelColor="#ffffff"  disabled={this.props.bigLoading} backgroundColor="#f4424b" label="Create deck" />
        );
    }
}

export default Radium(CreateDeck);