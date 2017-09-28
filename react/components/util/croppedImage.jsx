import React from "react";
import Radium from "radium";


export default Radium(function({src, height, width, x, y, style}){

    var styleWrapperImg = {
        position: "relative",
        width: "100px",
        height: "100px",
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