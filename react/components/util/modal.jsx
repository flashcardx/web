import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import Radium from "radium";

const style = {
    dialogStyles:{
         position: 'absolute',
         left: '50%',
         top: '50%',
         transform: 'translate(-50%, -50%)'
    }
}

class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {opened:props.open, closeLabel:props.closeLabel, title:props.title};
        this.onClose = props.onClose;
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentDidUpdate(){
        setTimeout(function() {
            ReactTooltip.rebuild();
        }, 1000);
    }

    componentDidMount(){
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

     handleConfirm(){
        this.props.handleConfirm();
        this.handleClose();
    };

    render(){
         var actions = [
      <FlatButton
        label={this.state.closeLabel}
        onClick={this.handleClose}
      />
    ];

        if(this.props.confirmLabel){
            actions.unshift(      <FlatButton
                                label={this.props.confirmLabel}
                                primary={true}
                                onClick={this.handleConfirm}
                                />
                        );
        }

        return (
                <Dialog
                        contentStyle={ style.dialogStyles }
                        title={this.state.title}
                        actions={actions}
                        modal={this.props.modal}
                        open={this.state.opened}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={this.props.autoScroll}>
                        <ReactTooltip delayShow={500}/>
                            {this.props.children}
                </Dialog>
        );
    }

}

Modal.propTypes = {
    closeLabel: PropTypes.string,
    title: PropTypes.node,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    modal: PropTypes.bool
}


export default Radium(Modal);