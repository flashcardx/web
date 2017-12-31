import React from "react";
import ReactTooltip from 'react-tooltip';
  

export default function(props){
    const id = Math.random().toString();
    return  <span>
                <span style={{width:"100%", overflow:"hidden"}} data-place="bottom" data-effect="float" data-tip={props.title} data-for={id}>
                    {props.children}
                </span>
                <ReactTooltip html={true} place="bottom" effect="float" id={id}/>
            </span>
}