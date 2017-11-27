import React from "react";
import Radium from "radium";

const style = {
    whiteBar:{
        margin: "0px",
        backgroundColor:"white",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
        padding:"10px",
        marginBottom:"30px"
    }
}


function WhiteBar(props){
    return (
         <div style={style.whiteBar} >
                    <div className="container">
                        <div className="row">
                            {props.children}
                         </div>
                    </div>
          </div>
    );
}

export default Radium(WhiteBar); 