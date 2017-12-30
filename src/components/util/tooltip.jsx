import React from "react";
import {Tooltip} from 'react-lightweight-tooltip';
  

export default function(props){
    return <Tooltip content={props.title}
            > {props.children}
            </Tooltip>
}