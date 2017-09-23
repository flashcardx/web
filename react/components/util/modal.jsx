import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
 

class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {opened:props.open, closeLabel:props.closeLabel, title:props.title};
        this.onClose = props.onClose;
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(){
        setTimeout(function() {
            ReactTooltip.rebuild();
        }, 1000);
    }

    componentWillReceiveProps(nextProps){
        this.setState({opened:nextProps.open, closeLabel:nextProps.closeLabel});
    }

     handleClose(){
        if(this.onClose)
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
                    modal={this.props.modal}
                    open={this.state.opened}
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
    title:PropTypes.node,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    modal: PropTypes.bool
}


export default Modal;