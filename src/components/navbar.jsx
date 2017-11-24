import React, {Component} from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NotificationBadge from "../containers/notificationBadge.jsx";
import {signout} from "../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Responsive from 'react-responsive';
import AppBar from 'material-ui/AppBar';

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
        this.renderDesktop = this.renderDesktop.bind(this);
    }

    handleActive(tab) {
        this.props.history.push(tab.props['data-route']);
    }

    renderDesktop(){
        return ( <div style={style.colorBase} className="row">
            <div className="col-1">
                <div className="container">
                        <Link to="/">
                            <img className="img-fluid" style={style.logo} src={process.env.PUBLIC_URL+"/img/favicon.ico"}/>
                        </Link>
                </div>
            </div>
            <div className="col-9">
                <Tabs tabItemContainerStyle={style.colorBase} value={this.state.active}>
                            <Tab  value="my collection" data-route="/" label="Mi colección"
                                onActive={this.handleActive}/>
                            <Tab  value="practice" label="Practica"
                                data-route="/practice"
                                onActive={this.handleActive}/>
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
        </div>);
    }

    mobileMenu(){
        return (
            <IconMenu
                iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <Link to="/"><MenuItem primaryText="Mi colección" /></Link>
                <Link to="/practice"><MenuItem primaryText="Practica" /></Link>
                <Link to="/settings"><MenuItem primaryText="Configuración" /></Link>
                <Link to="/signout"> <MenuItem primaryText="Cerrar sesión" /></Link>
            </IconMenu>
        );
    }

    renderMobile(){
        return (
             <AppBar
                title="FlashcardX"
                style={style.colorBase}
                iconElementLeft = {this.mobileMenu()}
                iconElementRight= {<NotificationBadge/>}
                />
        );
    }

    render(){
        return (
            <div>
                <Responsive minWidth={670}>
                    {(matches) => {
                        if (matches) {
                         return this.renderDesktop()
                        } else {
                        return this.renderMobile()
                        }
                    }}
            </Responsive>
            </div>
        );
    }
}

const Options = connect(null, {signout})(props=>{
    return (
        <IconMenu
                        style={style.colorBase}
                        iconButtonElement={<IconButton data-tip="Opciones"><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                        >
                        <MenuItem onClick={()=>props.history.push("/settings")} primaryText="Configuración" />
                        <MenuItem onClick={()=>props.history.push("/signout")} primaryText="Cerrar sesión" />
        </IconMenu>
    );
})

Navbar.propTypes = {
    active: PropTypes.string.isRequired
}

export default withRouter(Radium(Navbar));