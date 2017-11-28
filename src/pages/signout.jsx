import React, {Component} from "react";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Radium from "radium";
import {Link} from "react-router-dom";
import {signout} from "../actions/auth";
import InstagramEmbed from 'react-instagram-embed';

const style = {
    header:{
        backgroundColor: "#4286f4"
    }
}

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

class Signout extends Component{

    componentDidMount(){
        this.props.signout();
    }

    render(){
        return (
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
        )
    }
}

function mapStateToProps(state){
    console.log("user props: ", state);
    if(!state.user)
        return {username:"Anonymus"}
    var name = getFirstName(state.user.name);
    return {username: name};
}

function getFirstName(name){
    return name.split(' ')[0];
}


export default connect(mapStateToProps, {signout})(Radium(Signout));

