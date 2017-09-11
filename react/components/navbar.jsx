import React, {Component} from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


var style = {
    colorBase:{
        backgroundColor: "#4286f4"
    },
    inkBar:{
        backgroundColor: "green",
        color: "green"
    },
    logo:{
        color: "white",
        float: "left"
    },
    options:{
        color: "white"
    },
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

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {active: props.active};
        this.handleActive = this.handleActive.bind(this);
    }

    handleActive(tab) {
        this.props.history.push(tab.props['data-route']);
    }

    render(){
    return (
        <div style={style.colorBase} className="row">
            <div className="col-10">
                <Tabs style={style.colorBase} value={this.state.active}>
                        <Tab style={style.colorBase} value="discover" label="Discover" data-route="/discover" onActive={this.handleActive}>
                        </Tab>
                        <Tab style={style.colorBase} value="feed" label="Feed" data-route="/feed" onActive={this.handleActive}>
                        </Tab>
                        <Tab style={style.colorBase} value="my collection" data-route="/" label="My collection"
                        onActive={this.handleActive}>
                        </Tab>
                        <Tab style={style.colorBase} value="classes"
                        label="Classes"
                        data-route="/classes"
                        onActive={this.handleActive}
                        >
                        </Tab>
                        <Tab style={style.colorBase} value="practice" label="Practice"
                        data-route="/practice"
                        onActive={this.handleActive}
                        >
                        </Tab>
                    </Tabs>
            </div>
                <div className="col-2">
                    <div className="row">
                        <div className="col-4">
                            <NotificationBadge/>
                        </div>
                        <div className="col">
                            <Options history={this.props.history}/>
                        </div>
                    </div>
                </div>
        </div>
        );  
    }
}

function Options(props){
    return (
        <IconMenu
                        style={style.colorBase}
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                        >
                        <MenuItem onClick={()=>props.history.push("/settings")} primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
        </IconMenu>
    );
}

function NotificationBadge(){
    return (
         <div style={style.notifications}>
             <Badge
                style={style.notifications}
                badgeStyle={style.badge}
                badgeContent={10}
                secondary={true}
                >
                <IconButton style={style.notifications} tooltip="Notifications">
                    <NotificationsIcon style={style.notifications} />
                </IconButton>
                </Badge>
        </div>
    );
}

export default withRouter(Radium(Navbar));