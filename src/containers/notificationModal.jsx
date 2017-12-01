import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import FlatButton from 'material-ui/FlatButton';
import {hideNotifs, appendNotifications} from "../actions/notifications";
import Date from "../components/util/date.jsx";
import Modal from "../components/util/modal.jsx";
import CircularProgress from 'material-ui/CircularProgress';

const style = {
    center:{
        margin: "0 auto"
    },
    noScroll:{
        overflow:"hidden"
    }
}

class NotificationModal extends Component{

    constructor(props){
        super(props);
        this.state = {loadingMore:false, page:1, countLastAdded:0};
        this.loadMore = this.loadMore.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    loadMore() {
        this.setState({loadingMore:true});
        this.setState({page:this.state.page+1});
        this.props.appendNotifications(this.state.page); 
    }

    componentWillReceiveProps(newProps){
        this.setState({loadingMore:false});
        if(newProps.notifs){
            const newCount = newProps.notifs.length - this.state.countLastAdded;
            this.setState({countLastAdded: newCount});
        }
    }

    handleClose(){
        this.props.hideNotifs();
        this.setState({loadingMore:false});
    };

    renderNotif(n){
        const cssClass = n.seen? "seen": "unseen";
        return (
            <li key={n._id} className="list-group-item feed-item">
                            <div className="date"><Date>{n.date}</Date></div>
                            <div className={"text "+cssClass}>{n.text}</div>
            </li>
        );
    }

    render(){
        var content=null;
        if(this.props.notifs == null)
            content =  <div style={style.center} ><CircularProgress size={80} thickness={7}/> </div>;
        else
            if(this.props.notifs.length!==0)
                content = this.props.notifs.map(n=>this.renderNotif(n));
            else
                content = <p style={style.center} >No tienes notificaciones en este momento :( </p>;
        var btn = null;
        if(this.state.countLastAdded>=12)
            btn = <FlatButton onClick={this.loadMore}label="Mostrar mas" primary={true} />;
        return (
                <Modal autoScroll={true} title="Notificaciones" onClose={this.handleClose} closeLabel="Cerrar" open={this.props.open}>
                            <ul style={style.noScroll} className="list-group activity-feed">
                                {content} 
                            </ul>
                            <div style={{textAlign:"center"}}>
                                {this.state.loadingMore?
                                    (<p>Cargando mas...</p>)
                                :
                                    btn
                                }
                            </div>
                </Modal>
        );
    }
}

function mapStateToProps(state){
    return {open: state.showNotifs, notifs: state.notifs};
}

export default connect(mapStateToProps,{hideNotifs, appendNotifications})(Radium(NotificationModal));