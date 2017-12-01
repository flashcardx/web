import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {fetchTextToSpeech} from "../actions/audio";
import Speaker from "../components/util/speaker.jsx";

const style = {
    speaker:{
        fontSize:"18px",
        marginLeft:"10px",
        cursor:"pointer",
        ":hover":{
            color:"red"
        }
    }    
}

class SpeakerLangContainer extends Component{

    constructor(props){
        super(props);
        this.state = {src: null, play: false}
        this.play = this.play.bind(this);
    }

    componentWillUpdate(nextProps){
        if(nextProps.lang !== this.props.lang || nextProps.text !== this.props.text){
            this.setState({src: null});
        }
    }

    play(){
        if(this.state.src)
            this.setState({play: true});
        else
            this.props.fetchTextToSpeech(this.props.lang, this.props.text, r=>{
                this.setState({src:r, play: true});
            });
    }

   render(){
       return(
           <span>
                <Speaker
                        play={this.state.play}
                        src={this.state.src}
                        onEnded={()=>this.setState({play:false})}
                />
                <i onClick={this.play} style={style.speaker} className="fa fa-volume-up" aria-hidden="true"></i>
           </span>
       )
   } 
}

export default connect(null, {fetchTextToSpeech})(Radium(SpeakerLangContainer));