import React, {Component} from "react";
import Radium from "radium";
import ReactAudioPlayer from 'react-audio-player';

class Speaker extends Component{


    constructor(props){
        super(props);
        this.state = {isReady:true};
        this.play = this.play.bind(this);
    }

    play(){
        if(this.props.play){
            this.rap.audioEl.play();
        }
    }

   componentDidUpdate(){
        if(this.props.play && this.state.isReady)
            this.play();
        this.setState({isReady: false}, ()=>{
            setTimeout(() => {
                this.setState({isReady: true});      
            }, 50);
        })
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