import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import Radium from "radium";
import Responsive from 'react-responsive';
  
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
  } from 'material-ui-next/Dialog';


class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {opened:props.open, closeLabel:props.closeLabel};
        this.onClose = props.onClose;
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.open !== prevProps.open && this.props.open){
            setTimeout(() => {
                ReactTooltip.rebuild();
            }, 100);
        }
    }

    componentDidMount(){
        if(this.props.open)
            ReactTooltip.rebuild();
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

    renderModal(actions, fullscreen){
        return <Dialog
        fullScreen={fullscreen}
        fullWidth={true}
        open={this.state.opened}
        onRequestClose={this.handleClose}>
                <DialogTitle style={this.props.titleStyle}> 
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                        {this.props.children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
        </Dialog>
    }
    
    render(){
        var actions = [];
        if(this.props.closeLabel)
            actions.push(<FlatButton
                            key="0"
                            label={this.state.closeLabel}
                            onClick={this.handleClose}
                    />);
        if(this.props.confirmObject)
            actions.unshift(<span key="2">{this.props.confirmObject}</span>);
        else
        if(this.props.confirmLabel){
            actions.unshift(    <FlatButton
                                key="2"
                                label={this.props.confirmLabel}
                                primary={true}
                                onClick={this.handleConfirm}
                                />
                        );
        }
        
        return (
            <Responsive minWidth={700}>
            {(matches) => {
                if (matches) {
                    return this.renderModal(actions, false)
                } else {
                    return this.renderModal(actions, true)
                }
            }}
            </Responsive>
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