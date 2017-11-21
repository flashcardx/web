import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Modal from "./util/modal.jsx";
import Radium from "radium";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

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
        this.renderPath = this.renderPath.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        const lastDeckId = (this.state.path.length>0)?this.state.path[this.state.path.length - 1]._id : undefined;
        console.log("lastdeckid: ", lastDeckId);
        this.props.listDecks(lastDeckId);   
    }

    closeModal(){
        this.props.onClose();
    }

    addDeck(deckName, deckId){
        var newPath = this.state.path.slice();
        newPath.push({name:deckName, _id:deckId});
        this.setState({path:newPath});
    }

    goToIndex(pathLastIndex){
        return _.dropRight(this.state.path.slice(), pathLastIndex);
    }

    handleChange = (event, index, value) =>{
        this.setState({selectedValue: value, ready:false})
    };

    renderPath(){
        console.log("ready: ", this.state.ready);
        console.log("decksName: ", this.props.decksName);
        return (
            <span>
                <div className="row">
                    <div className="col">
                        <span onClick={()=>this.goToIndex(0)} style={style.path.p}>Root <span style={{color:"black"}}> > </span></span>
                        {this.state.path.map((p, i)=>{
                            return <span key={(i+1)}><span onClick={()=>this.goToIndex(i+1)} style={style.path.p}>{p.name}</span> <span style={{color:"black"}}> > </span></span>
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <SelectField
                            value={this.state.selectedValue}
                            onChange={this.handleChange}
                            >
                            <MenuItem disabled value="" primaryText="Selecciona un mazo" />
                            {this.state.ready && this.props.decksName.map(d=><MenuItem key={d._id} value={d._id} primaryText={d.name} />) }
                        </SelectField>
                    </div>
                </div>
            </span>
        );
    }

    render(){
         var titleObject = (
                         <RaisedButton
                                disabled={(this.props.bigLoading || this.state.path.length==0)}
                                label={this.props.buttonTitle}
                                primary={true}
                                onClick={this.addDeck}
                                buttonStyle={{backgroundColor:"#4286f4"}}  
                                />
                );
        return (
            <div style={{"display":"inline-block","marginRight":"20px"}}>
                <Modal titleStyle={{backgroundColor:"#4286f4", padding:"10px 10px 10px 15px", marginBottom:"10px"}} titleObject={titleObject} autoScroll={true} onClose={this.closeModal} modal={false} open={this.props.modalOpened} closeLabel="Cancelar" title={this.props.title}>
                     {this.props.pathText} {this.renderPath()}
                 </Modal>
            </div>
        );
    }

}

export default Radium(SelectDeck);