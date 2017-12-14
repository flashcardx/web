import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import Radium from "radium";
import Responsive from 'react-responsive';

const style = {
    dialogStyles:{
         position: 'absolute',
         left: '50%',
         top: '50%',
         transform: 'translate(-50%, -50%)'
    },
    mobileStyles:{
        position: 'absolute',
        width: "100%",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }   
}

class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {opened:props.open, closeLabel:props.closeLabel};
        this.onClose = props.onClose;
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderDesktop = this.renderDesktop.bind(this);
        this.renderMobile = this.renderMobile.bind(this);
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

    renderDesktop(actions){
        return <Dialog
        {...this.props}
        contentStyle={ style.dialogStyles }
        title={this.props.title}
        actions={actions}
        modal={this.props.modal}
        open={this.state.opened}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={this.props.autoScroll}>
                <ReactTooltip html={true}  data-multiline={true} id="modal-tooltip" delayShow={500}/>
                    {this.props.children}
        </Dialog>
    }

    renderMobile(actions){
        return <Dialog
                        {...this.props}
                        contentStyle={ style.mobileStyles }
                        title={this.props.title}
                        actions={actions}
                        modal={this.props.modal}
                        open={this.state.opened}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={this.props.autoScroll}>
                                <ReactTooltip html={true}  data-multiline={true} id="modal-tooltip" delayShow={500}/>
                                    {this.props.children}
            </Dialog>
    }
    
    render(){
        var actions = [];
        if(this.props.closeLabel)
            actions.push(<FlatButton
                        label={this.state.closeLabel}
                        onClick={this.handleClose}
                    />);
        if(this.props.confirmObject)
            actions.unshift(this.props.confirmObject);
        else
        if(this.props.confirmLabel){
            actions.unshift(      <FlatButton
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
                    return this.renderDesktop(actions)
                } else {
                    return this.renderMobile(actions)
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