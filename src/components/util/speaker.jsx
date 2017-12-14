import React, {Component} from "react";
import Radium from "radium";
import ReactAudioPlayer from 'react-audio-player';


class Speaker extends Component{


    constructor(props){
        super(props);
        this.play = this.play.bind(this);
    }

    play(){
        if(this.props.play)
            this.rap.audioEl.play();
    }


   render(){
    if(this.props.play){
        const audio = new Audio(this.props.src);
        audio.play()
    }
       return null;
   } 
}

export default Radium(Speaker);