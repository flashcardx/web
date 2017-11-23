import _ from "lodash";
import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Modal from "./util/modal.jsx";
import Radium from "radium";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Path from "./util/path.jsx";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const style = {
    path:{
        p:{ color: "grey",
            fontWeight:"400",
            fontSize:"18px",
            cursor: "pointer",
            lineHeight:"36px" 
          },
        angle:{ 
            paddingBottom:"6px",
            paddingLeft:"10px",
            paddingRight:"10px",
            fontSize:"20px"
        }
    }
}

class SelectDeck extends Component{

    constructor(props){
        super(props);
        this.state = {selectedValue:"", path:[], ready:true};
        this.addDeck = this.addDeck.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.pickDeck = this.pickDeck.bind(this);
        this.submit = this.submit.bind(this);
        this.props.listDecks();   
    }

    submit(){
        const deckId = this.state.path[this.state.path.length-1]._id;
        this.props.onSubmit(deckId, ()=>{
            this.closeModal();
        });
    }

    closeModal(){
        this.props.onClose();
        this.setState({path: [], ready:true});
    }

    componentWillReceiveProps(nextProps){
        if(!_.isEqual(nextProps.decksName, this.props.decksName)){
            this.setState({ready: true});
        }
    }

    addDeck(deckName, deckId){
        var newPath = this.state.path.slice();
        newPath.push({name:deckName, _id:deckId});
        this.setState({path:newPath});
    }

    goToIndex(index){
        const limitToDrop = this.state.path.length - index;
        const newPath = _.dropRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
        var lastId = newPath.length>0?newPath[newPath.length - 1]._id : undefined;
        this.props.listDecks(lastId);
    }

    pickDeck = (deckId, name) =>{
        this.addDeck(name, deckId);
        this.setState({ready:false})
        this.props.listDecks(deckId);  
    };

    renderBody(){
        var opciones = null;
        if(!this.state.ready)
                return <span>Cargando...</span>;
         return (
            <span>
                <div className="row">
                    <div className="col">
                        <List>
                            {this.props.decksName.map(d=><ListItem onClick={()=>this.pickDeck(d._id, d.name)}key={d._id} primaryText={d.name} />) }
                        </List>
                    </div>
                </div>
            </span>
        );
    }

    render(){
         var confirmObject = (
                         <RaisedButton
                                disabled={(this.props.bigLoading || this.state.path.length==0)}
                                label="Mover aqui"
                                primary={true}
                                onClick={this.submit}
                                buttonStyle={{backgroundColor:"#4286f4"}}  
                                />
                );
        return (
            <div style={{"display":"inline-block","marginRight":"20px"}}>
                <Modal titleStyle={{display:"none"}} confirmObject={confirmObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.props.modalOpened}>
                     <span>
                        Mover a: &nbsp;
                        <Path goToIndex={this.goToIndex} path={this.state.path}/>           
                        <Divider/>
                     </span>
                     {this.renderBody()}
                </Modal>
            </div>
        );
    }

}

export default Radium(SelectDeck);