import TextCollapse from "./truncateHelper.jsx";
import React from "react";

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false,
  collapseText: 'Mostrar más',
  expandText: 'Mostrar menos',
  minHeight: 40
}

function T(props){
    return (
           <TextCollapse
            options={TEXT_COLLAPSE_OPTIONS}
            >
                {props.children}
            </TextCollapse>
    );
}

export default T;