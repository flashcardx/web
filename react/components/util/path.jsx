import React, {Component} from "react";
import Radium from "radium";

const style = {
    path:{
        p:{ color: "grey",
            fontWeight:"400",
            fontSize:"18px",
            cursor: "pointer",
            lineHeight:"36px" 
          },
        angle:{ 
            paddingBottom:"6px",
            paddingLeft:"10px",
            paddingRight:"10px",
            fontSize:"20px",
            color: "black"
        }
    }
}

class Path extends Component{

    render(){
        return (
            <span>
                <span onClick={()=>this.props.goToIndex(0)} style={style.path.p}>Root</span>
                {this.props.path.map((p, i)=>{
                    return <span key={(i+1)}><span style={style.path.angle}> > </span><span onClick={()=>this.props.goToIndex(i+1)} style={style.path.p}>{p.name}</span></span>
                    })
                }
            </span>
        );
    }
}

export default Radium(Path);