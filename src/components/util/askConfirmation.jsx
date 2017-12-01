import React from "react";
import Modal from "./modal.jsx";
import FlatButton from 'material-ui/FlatButton';

function AskConfirmation(props){
    const confirmObject = (
                         <FlatButton
                                className="white"
                                label="Confirmar"
                                onClick={props.onConfirm}
                                backgroundColor="#5cb85c"
                                hoverColor="#499349"
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