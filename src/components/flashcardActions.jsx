import React from "react"
import IconButton from 'material-ui/IconButton';
import EditUserFlashcardContainer from "../containers/editUserFlashcardContainer.jsx";

function Actions(props){
    return <div className="container">
                <div className="row">
                <IconButton className="p-2" onClick={props.onDelete} iconStyle={{ color: "red" }} data-tip="Eliminar" iconClassName="material-icons">
                    clear
                </IconButton>
                <EditUserFlashcardContainer
                {...props.edit}
                className="p-2"/>
                <IconButton className="ml-auto" style={{float:"right"}} onClick={props.onFlip} iconStyle={{ color: "#22A6BB"}} data-tip="Rotar" iconClassName="material-icons">
                    3d_rotation
                </IconButton>
                </div>
            </div>

}

export default Actions