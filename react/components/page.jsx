import React, {Component} from "react";
import Navbar from "./navbar.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Page extends Component{

    constructor(props){
        super(props);
        this.state = {name: props.name};
    }

    render(){
        return (
                <MuiThemeProvider>            
            <div>
                <Navbar active={this.state.name}/>
                <div className="container">
                     {this.props.children}
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Page;