import React, {Component} from "react";
import Radium from "radium";
import Speaker from "../components/util/speaker.jsx";

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

class SpeakerTTSContainer extends Component{

    constructor(props){
        super(props);
        this.state = {play: false}
        this.play = this.play.bind(this);
    }

    play(){
        this.setState({play:true});
    }

   render(){
       return(
           <span>
                <Speaker
                    src={this.props.src}
                    play={this.state.play}
                    preload="none"
                    ref={(element) => { this.rap = element; }}
                    onEnded={()=>{this.setState({play:false}) }}
                 />
                <i onClick={this.play} style={style.speaker} className="fa fa-volume-up" aria-hidden="true"></i>
           </span>
       )
   } 
}

export default Radium(SpeakerTTSContainer);