import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
 

class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {open:props.open, closeLabel:props.closeLabel, title:props.title};
        this.onClose = props.onClose;
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(){
        setTimeout(function() {
            ReactTooltip.rebuild();
        }, 1000);
    }

    componentWillReceiveProps(nextProps){
        this.setState({open:nextProps.open, closeLabel:nextProps.closeLabel});
    }

     handleClose(){
        this.onClose();
        this.setState({opened: false});
    };

    render(){
         const actions = [
      <FlatButton
        label={this.state.closeLabel}
        primary={true}
        onClick={this.handleClose}
      />
    ];

        return (
            <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={this.state.modal}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <ReactTooltip delayShow={500}/>
                    {this.props.children}
            </Dialog>
        );
    }

}

Modal.propTypes = {
    closeLabel: PropTypes.string,
    title:PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.array
}


export default Modal;