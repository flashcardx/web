import React from "react";

export function Points(props){
    return (
        <span {...props} style={{color:"#499349", fontWeight:"bold"}}>
            {props.children}
        </span>
    )
}

export function Level(props){
    return (
        <span {...props} style={{color:"#92272d", fontWeight:"bold"}}>
            {props.children}
        </span>
    )
}