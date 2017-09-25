import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import axios from "axios";
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconButton from 'material-ui/IconButton';
import {fetchCount, showNotifs} from "../actions/notifications";
import NotificationModal from "./notificationModal.jsx";

const style = {
    badge:{
        fontSize:"10px",
        width: "18px",
        height: "18px",
        top: 0,
        right: 0,
        padding: "0px"
    },
    notifications:{
        margin: "0px",
        padding: "0px"
    },
    noscroll:{
        overflowY: "hidden"
    }
};

class NotificationBadge extends Component{ 
    
    constructor(props){
        super(props);
        this.state = {open:false};
        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        this.props.showNotifs();
    };

    componentDidMount(){
        this.props.fetchCount();
    }

    render(){
    if(this.props.count)
            return (
                <div>
                    <NotificationModal/>
                    <div style={style.notifications}>
                        <Badge
                            style={style.notifications}
                            badgeStyle={style.badge}
                            badgeContent={this.props.count}
                            secondary={true}
                            >
                            <IconButton style={style.notifications} onClick={this.openModal} data-tip="Notifications">
                                <NotificationsIcon style={style.notifications} />
                            </IconButton>
                        </Badge>
                    </div>
                </div>
            );
    else
        return (<div>
                    <NotificationModal/>
                    <IconButton style={style.notifications} onClick={this.openModal} data-tip="Notifications">
                        <NotificationsIcon style={style.notifications} />
                    </IconButton>
                </div>);
    }
}

function mapStateToProps(state){
    return {count: state.notificationCount};
}

const radiumComponent = Radium(NotificationBadge)

export default connect(mapStateToProps, {fetchCount, showNotifs})(radiumComponent);
