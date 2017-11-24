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
       var play = null;
       if(this.state.play)
            play = (<ReactAudioPlayer
                    src={this.state.src}
                    autoPlay={this.state.play}
                    style={{display:"none"}}
                    onEnded={()=>this.setState({play:false})}
                    />)
       return(
           <span>
                {play}
                <i onClick={this.play} style={style.speaker} className="fa fa-volume-up" aria-hidden="true"></i>
           </span>
       )
   } 
}

export default connect(null, {fetchTextToSpeech})(Radium(Speaker));