import React, {Component} from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NotificationBadge from "../containers/notificationBadge";
import {signout} from "../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
 

var style = {
    colorBase:{
        backgroundColor: "#4286f4"
    },
    options:{
        color: "#fff"
    },
    logo:{
        maxWidth: "40px",
        height: "auto"
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
            <div className="col-1">
                <div className="container">
                        <Link to="/">
                            <img className="img-fluid" style={style.logo} src="/assets/img/favicon.ico"/>
                        </Link>
                </div>
            </div>
            <div className="col-9">
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

const Options = connect(null, {signout})(props=>{
    return (
        <IconMenu
                        style={style.colorBase}
                        iconButtonElement={<IconButton data-tip="Options"><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                        >
                        <MenuItem onClick={()=>props.history.push("/settings")} primaryText="Settings" />
                        <MenuItem onClick={()=>props.history.push("/signout")} primaryText="Sign out" />
        </IconMenu>
    );
})

Navbar.PropTypes = {
    active: PropTypes.string.isRequired
}

export default withRouter(Radium(Navbar));