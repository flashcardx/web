import React from "react";
import Radium from "radium";


export default Radium(function({src, height, width, x, y, style}){

        console.log("x: " + x + ", y: " + y);
    var styleWrapperImg = {
        position: "relative",
        width: "200px",
        height: "200px",
        overflow: "hidden"
    };

    var styleImg = {
        position: "absolute",
        left: "50%",
        top: "50%",
        height: "auto",
        width: "auto",
        WebkitTransform: "translate(-50%,-50%)",
        MsTransform: "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)"
        }
        styleWrapperImg.width = width;
        styleWrapperImg.height = height;
        styleImg.width = width;
        styleImg.height = height;
        styleImg.left = x;
        styleImg.top = y;
        var rotate = "translate(-"+x+"px,"+"-"+y+"px)";
        console.log("rotate: " , rotate);
        styleImg.WebkitTransform = rotate;
        styleImg.MsTransform = rotate;
        styleImg.transform = rotate;
    return (
        <div style={styleWrapperImg}>
            <img style={styleImg} src={src}/>
        </div>
    );

});