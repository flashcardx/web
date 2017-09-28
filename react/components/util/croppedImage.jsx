import React from "react";
import Radium from "radium";


export default Radium(function({src, height, width, x, y, style}){

    return (
        <div>
            <img style={style} src={src}/>
        </div>
    );

});