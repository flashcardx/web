import React from "react";
import 'react-tippy/dist/tippy.css'
import {Tooltip} from 'react-tippy';
  

export default function(props){
    return <Tooltip title={props.title}
                    position="bottom"
            >
            {props.children}
            </Tooltip>
}