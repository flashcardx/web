import React, {Component} from "react";
import Radium from "radium";
import ReactAudioPlayer from 'react-audio-player';

class Speaker extends Component{


    constructor(props){
        super(props);
        this.play = this.play.bind(this);
    }

    play(){
        if(this.props.play){
            this.rap.audioEl.play();
        }
    }

   componentDidUpdate(prevProps, prevState){
        if(prevProps.play === this.props.play)
            return;//avoids playing sound more than once
        if(this.props.play)
            this.play();
   }

   render(){
        
        return   <ReactAudioPlayer
                        preload="auto"
                        ref={(element) => { this.rap = element; }}
                        src={this.props.src}
                        style={{display:"none"}}
                        onEnded={this.props.onEnded}
                />
   } 
}

export default Radium(Speaker);