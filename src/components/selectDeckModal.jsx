import React, {Component} from "react";
import Radium from "radium";
import SelectDeck from "./selectDeck.jsx";
import _ from "lodash";
import FlatButton from 'material-ui/FlatButton';
import Modal from "./util/modal.jsx";

class SelectDeckModal extends Component{

    constructor(props){
        super(props);
        this.state = {path:[]};
        this.addDeck = this.addDeck.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDeckPick = this.onDeckPick.bind(this);
        this.submit = this.submit.bind(this);
    }

    onDeckPick(deckId, name){
        this.addDeck(name, deckId);
        this.props.listDecks(deckId);  
    };

    goToIndex(index){
        const limitToDrop = this.state.path.length - index;
        const newPath = _.dropRight(this.state.path, limitToDrop);
        this.setState({path: newPath});
        var lastId = newPath.length>0?newPath[newPath.length - 1]._id : undefined;
        this.props.listDecks(lastId);
    }

    closeModal(){
        this.props.onClose();
        this.setState({path: []});
    }

    addDeck(deckName, deckId){
        var newPath = this.state.path.slice();
        newPath.push({name:deckName, _id:deckId});
        this.setState({path:newPath});
    }


    submit(){
        const deckId = this.state.path[this.state.path.length-1]._id;
        this.props.onSubmit(deckId, ()=>{
            this.closeModal();
        });
    }

    render(){
        var confirmObject = (
                         <FlatButton
                                disabled={(this.props.bigLoading || this.state.path.length===0)}
                                label={this.props.confirmLabel}
                                labelStyle={{color:"white"}}
                                onClick={this.submit}
                                backgroundColor="#4286f4"
                                hoverColor="#346bc3"
                                />
                );
        return (
            <div style={{"display":"inline-block","marginRight":"20px"}}>
                <Modal titleStyle={{display:"none"}} confirmObject={confirmObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.props.modalOpened}>
                    <SelectDeck
                             onDeckPick={this.onDeckPick}
                             goToIndex={this.goToIndex}
                             decksName={this.props.decksName}
                             path={this.state.path}
                             description={this.props.description}
                             listDecks={this.props.listDecks}/>   
                </Modal>
            </div>        
        );
    }

}

export default Radium(SelectDeckModal);
