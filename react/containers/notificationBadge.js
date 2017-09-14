import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import axios from "axios";
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconButton from 'material-ui/IconButton';
import {fetchCount} from "../actions/notifications";


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
    }
};

class NotificationBadge extends Component{ 
    
    constructor(props){
        super(props);
        this.state = {count: props.count};
    }

    componentDidMount(){
        this.props.fetchCount(); 
    }

    componentWillReceiveProps(nextProps){
        this.setState({count: nextProps.count});
    }

    render(){
    if(this.state.count)
            return (
                <div style={style.notifications}>
                    <Badge
                        style={style.notifications}
                        badgeStyle={style.badge}
                        badgeContent={this.state.count}
                        secondary={true}
                        >
                        <IconButton style={style.notifications} tooltip="Notifications">
                            <NotificationsIcon style={style.notifications} />
                        </IconButton>
                    </Badge>
                </div>
            );
    else
        return (<IconButton style={style.notifications} tooltip="Notifications">
                            <NotificationsIcon style={style.notifications} />
                        </IconButton>);
    }
}

function mapStateToProps(state){
    return {count: state.notificationCount};
}

const radiumComponent = Radium(NotificationBadge)


export default connect(mapStateToProps, {fetchCount})(radiumComponent);
