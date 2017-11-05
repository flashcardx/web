import React from "react";
import Radium from "radium";


export default Radium(props=>{

    const {height, width} = props;

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
        WebkitTransform: "translate(-50%,-50%)",
        MsTransform: "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)"
        }

    return (
        <div data-src={props["data-src"]} style={styleWrapperImg}>
            <img className="owl-lazy" {...props} style={[styleImg, props.style]}/>
        </div>
    );
});