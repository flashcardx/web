import React from "react";
import Radium from "radium";


export default Radium(function({src, height, width}){

   var styleWrapperImg = {
        position: "relative",
        width: width,
        height: height,
        overflow: "hidden"
    };

    var styleImg = {
        position: "absolute",
        left: "50%",
        top: "50%",
        height: "auto",
        width: "100%",
        WebkitTransform: "translate(-50%,-50%)",
        MsTransform: "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)"
        }

    return (
        <div style={styleWrapperImg}>
            <img style={styleImg} src={src}/>
        </div>
    );
});