import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {fetchTextToSpeech} from "../actions/audio";
import Speaker from "../components/util/speaker.jsx";
import ReactAudioPlayer from 'react-audio-player';
import ReactHowler from 'react-howler'

const style = {
    speaker:{
        fontSize:"18px",
        marginLeft:"10px",
        padding: "3px",
        cursor:"pointer",
        border: "1px solid gray",
        ":hover":{
            color:"red",
            border: "1px solid red"
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
        console.log("play");
        if(this.state.src)
            this.rap.audioEl.play()
        else
            this.props.fetchTextToSpeech(this.props.lang, this.props.text, r=>{
                this.setState({src:r, play: true}, ()=>{
                    this.inputElement.click();
                });
            });
    }

   render(){
       return(
           <span>
                <ReactAudioPlayer
                    src={this.state.src}
                    preload="auto"
                    ref={(element) => { this.rap = element; }}
                    style={{display:"none"}}
                 />
                <i ref={input => this.inputElement = input} onClick={this.play} style={style.speaker} className="fa fa-volume-up" aria-hidden="true"></i>
           </span>
       )
   } 
}

export default connect(null, {fetchTextToSpeech})(Radium(SpeakerLangContainer));