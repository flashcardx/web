import React from "react";
import FlatButton from 'material-ui/FlatButton';

function Button(props){
    return  <FlatButton
                    {...props}
                    backgroundColor="#5cb85c"
                    hoverColor="#499349"
                    labelStyle={{color:"white"}}
                    />
}

export default Button;