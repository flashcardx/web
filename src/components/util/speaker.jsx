import React, {Component} from "react";
import Radium from "radium";
import ReactAudioPlayer from 'react-audio-player';
import ReactHowler from 'react-howler'

class Speaker extends Component{

    componentDidUpdate(){
        if(this.player){
            console.log("player: ", this.player);
            this.player.howler;
        }
    }

    constructor(props){
        super(props);
        this.play = this.play.bind(this);
    }

    play(){
        if(this.props.play)
            this.rap.audioEl.play();
    }

   render(){
       var play = null;

       if(this.props.play){
            console.log("play: ", this.props.src);
            const audio = new Audio(this.props.src)
            audio.play()    
        }
            return(
           <span>
                {play}
           </span>
       )
   } 
}

export default Radium(Speaker);