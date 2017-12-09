import React, {Component} from "react";
import Radium from "radium";
import 'react-select/dist/react-select.css';
import Path from "./util/path.jsx";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class SelectDeck extends Component{

    constructor(props){
        super(props);
        this.state = {selectedValue:""};
        this.renderBody = this.renderBody.bind(this);
        this.props.listDecks();   
    }

    renderBody(){
        return (
            <span>
                <div className="row">
                    <div className="col">
                        <List>
                            {this.props.decksName.map(d=><ListItem onClick={()=>this.props.onDeckPick(d._id, d.name)}key={d._id} primaryText={d.name} />) }
                        </List>
                    </div>
                </div>
            </span>
        );
    }

    render(){
        return (
                 <span>
                        {this.props.description} &nbsp;
                        <Path goToIndex={this.props.goToIndex} path={this.props.path}/>           
                        <Divider/>
                     {this.renderBody()}
                </span>  
        );
    }

}

export default Radium(SelectDeck);