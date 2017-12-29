import React from "react";
import {connect} from "react-redux";
import IconButton from 'material-ui-next/IconButton';
import copy from 'copy-to-clipboard';
import {successAlert} from "../../actions/alerts"

export default connect(null, {successAlert})(function(props){
    return (<span>
               <IconButton onClick={()=>{copy(props.text);props.successAlert("Texto copiado al portapapeles", 2000)}} style={{height:"30px"}} aria-label="copy">
                    <i data-tip="Copiar al portapapeles" className="fa fa-clone" aria-hidden="true"
                    style={{color:props.color}}
                    > 
                    </i>     
                </IconButton>
        </span>
    );
})