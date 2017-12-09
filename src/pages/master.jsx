import React, {Component} from "react";
import Page from "../components/page.jsx";
import Radium from "radium";
import _ from "lodash";     
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import {fetchCardCount, fetchUserCount, fetchLogins, submitCodeGen} from "../actions/master";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
class Master extends Component{

    constructor(props){
        super(props);
        this.state = {months:0, school:"", count:0}
        this.renderLogins = this.renderLogins.bind(this);
        this.submitCodeGen = this.submitCodeGen.bind(this);
    }

    componentDidMount(){
        this.props.fetchCardCount();
        this.props.fetchUserCount();
        this.props.fetchLogins();    
    }

    renderLogins(){
        if(!this.props.master.logins)
            return <CircularProgress style={{margin:"auto"}} size={50} thickness={6} />
        return this.props.master.logins.map(l=>{
            return <tr key={Math.random()}>
                        <td>
                            {l.userEmail}
                        </td> 
                        <td>
                            <span style={{margin:"10px"}}>
                                {l.userId}
                            </span>
                        </td> 
                        <td>
                        {l.date}
                        </td>
                    </tr>
        });
    }

    submitCodeGen(){
        this.props.submitCodeGen(this.state.count, this.state.months,  this.state.school);
    }

    render(){
        if(_.isEmpty(this.props.master))
        return <Page name="master">
                        <div className="container"> 
                            <div className="row">
                                <div style={{textAlign: "center"}} className="col">
                                    <CircularProgress style={{margin:"auto"}} size={130} thickness={7} />
                                </div>
                            </div>;
                        </div>
                   </Page>
        return (
            <Page name="master">
                <div className="container">
                    <div className="row">
                        <h2>Master access</h2>
                    </div>
                    <div className="row">
                    <div className="container">
                            <div className="row">
                                <h3>Code generator</h3>
                            </div>
                            <div className="row">
                                    <TextField
                                        onChange={ e=>this.setState({school: e.target.value})}
                                        hintText="SCHOOL"
                                        floatingLabelText="SCHOOL"
                                        />
                                    <TextField
                                        onChange={ e=>this.setState({count: e.target.value})}
                                        hintText="AMOUNT(NUMBER)"
                                        floatingLabelText="AMOUNT(NUMBER)"
                                        />
                                    <SelectField
                                        floatingLabelText="MONTHS"
                                        value={this.state.months}
                                        onChange={ (e, i, v)=>this.setState({months: v})}
                                        >
                                            <MenuItem value={1} primaryText="1" />
                                            <MenuItem value={2} primaryText="2" />
                                            <MenuItem value={3} primaryText="3" />
                                            <MenuItem value={4} primaryText="4" />
                                            <MenuItem value={5} primaryText="5" />
                                            <MenuItem value={6} primaryText="6" />
                                    </SelectField>
                                    <FlatButton backgroundColor="red" onClick={this.submitCodeGen} label="GENERATE" />
                                </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3>Stats</h3>
                        <div className="col">
                            Total cards: {this.props.master.cardCount}
                        </div>
                        <div className="col">
                            Total users: {this.props.master.userCount}
                        </div>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h3>Login registry</h3>
                            </div>
                            <div className="row">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            userId
                                        </th>
                                        <th>
                                            Date(UTC)
                                        </th> 
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderLogins()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
    
            </Page>
        );
    }
}

function mapStateToProps(state){
    return {
        master: state.master
    }
}
    

export default connect(mapStateToProps, {submitCodeGen, fetchCardCount, fetchUserCount, fetchLogins})(Radium(Master));