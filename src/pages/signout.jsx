import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import {signout} from "../actions/auth";
/*
import {Link} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InstagramEmbed from 'react-instagram-embed';
*/
import {Redirect} from 'react-router';
/*
const style = {
    header:{
        backgroundColor: "#4286f4"
    }
}*/
/*
function renderInstagram(url){
    return (
        <InstagramEmbed
                    url={url}
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
        />
    );
}
*/
class Signout extends Component{

    render(){
        this.props.signout();
        return  <Redirect push to="/landing"/>
      /*  return (
            <MuiThemeProvider>
                    <div>
                        <div style={style.header}>
                            <div className="container">
                                <h3>Have a great rest of the day {this.props.username}! Hope we see you again soon!</h3>
                                <br/>
                                <img alt="sign out" src={process.env.PUBLIC_URL+"/img/signout.jpg"}/>
                            </div>
                        </div>
                        <br/>
                        <div className="container">
                                <h3>In the meantime here are some study tips from the instagram of our community ;)</h3>
                            <div className="row">
                                <div className="col">
                                    {renderInstagram('https://www.instagram.com/p/BYtefTAgibb/')}
                                </div>
                                <div className="col">
                                    {renderInstagram('https://www.instagram.com/p/BYoXmUSnDwj/')}
                                </div>
                                <div className="col">
                                    {renderInstagram('https://www.instagram.com/p/BYgqGP6HKPd/?taken-by=flashcardx')}
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <Link className="btn btn-primary" to="/landing">Go to landing page</Link>
                        </div>
                    </div>

            </MuiThemeProvider>
        )*/
    }
}

function mapStateToProps(state){
    if(!state.user)
        return {username:"Humano"}
    var name = getFirstName(state.user.name);
    return {username: name};
}

function getFirstName(name){
    if(!name)
        return "Humano";
    return name.split(' ')[0];
}


export default connect(mapStateToProps, {signout})(Radium(Signout));

