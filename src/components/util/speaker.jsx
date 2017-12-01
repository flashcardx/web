import React, {Component} from "react";
import Radium from "radium";
import ReactAudioPlayer from 'react-audio-player';


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