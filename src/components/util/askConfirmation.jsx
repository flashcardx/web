import React from "react";
import Modal from "./modal.jsx";
import RaisedButton from 'material-ui/RaisedButton';

function AskConfirmation(props){
    const confirmObject = (
                         <RaisedButton
                                label="Confirmar"
                                primary={true}
                                onClick={props.onConfirm}
                                buttonStyle={{backgroundColor:"#5cb85c"}}  
                                />
                        );
    return (
        <Modal titleStyle={{padding:"10px 10px 10px 15px", marginBottom:"10px"}} title="¿Estas seguro?" confirmObject={confirmObject} onClose={props.onClose} modal={false} open={props.show} closeLabel="Cancelar">
            <p>
                {props.text}
            </p>
        </Modal>
    );
}

export default AskConfirmation;