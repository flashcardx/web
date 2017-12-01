import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {fetchTextToSpeech} from "../../actions/audio";
import ReactAudioPlayer from 'react-audio-player';

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

class Speaker extends Component{


   render(){
       var play = null;
       if(this.props.play)
            play = (<ReactAudioPlayer
                    src={this.props.src}
                    autoPlay
                    style={{display:"none"}}
                    onEnded={this.props.onEnded}
                    />)
       return(
           <span>
                {play}
           </span>
       )
   } 
}

export default Radium(Speaker);