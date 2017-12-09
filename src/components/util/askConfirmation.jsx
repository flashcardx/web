import React from "react";
import Modal from "./modal.jsx";
import GreenButton from './greenButton.jsx';

function AskConfirmation(props){
    const confirmObject = (
                         <GreenButton
                                label="Confirmar"
                                onClick={props.onConfirm}
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