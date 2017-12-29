import Tooltip from 'material-ui-next/Tooltip';
import React from "react";

export default function(props){
    const title = <span style={{fontSize:"13px", zIndex:50000, position:"fixed"}} >{props.title}</span>
    return <Tooltip title={title} placement="bottom">
                {props.children}
           </Tooltip>
}