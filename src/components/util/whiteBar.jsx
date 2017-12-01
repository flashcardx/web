import React from "react";
import Radium from "radium";


function WhiteBar(props){
    const style = {
        backgroundColor:"white",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
        padding:"10px"
    }
    if(!props.noMargin)
        style.margin = "0px 0px 30px 0px"
    return (
         <div style={style} >
                    <div className="container">
                        <div className="row">
                            {props.children}
                         </div>
                    </div>
          </div>
    );
}

export default Radium(WhiteBar); 