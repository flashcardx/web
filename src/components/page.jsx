import React, {Component} from "react";
import Navbar from "./navbar.jsx";
import PropTypes from 'prop-types';
 
class Page extends Component{

    constructor(props){
        super(props);
        this.state = {name: props.name};
    }

    render(){
        return (     
            <div>
                <Navbar active={this.state.name}/>
                <div className={this.props.noWrap?null:"container"}>
                     {this.props.children}
                </div>
            </div>   
        );
    }
}

Page.propTypes = {
    name: PropTypes.string.isRequired
}

export default Page;