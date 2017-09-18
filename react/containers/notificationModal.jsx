import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import axios from "axios";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {hideNotifs} from "../actions/notifications";
import Date from "../components/date.jsx";
import ReactTooltip from 'react-tooltip';

class NotificationModal extends Component{

    constructor(props){
        super(props);
        this.state = {loading:false};
        this.loadMore = this.loadMore.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    loadMore() {
        this.setState({loading:true});
    }

    componentWillMount(){
         ReactTooltip.rebuild();
    }

    componentDidUpdate(){
        setTimeout(function() {
            ReactTooltip.rebuild();
        }, 1000);
    }

    handleClose(){
        this.props.hideNotifs();
        this.setState({open: false, loading:false});
    };

    renderNotif(n){
        console.log("rendering: ", n);
        const cssClass = n.seen? "seen": "unseen";
        return (
            <li key={n._id} className="list-group-item feed-item">
                            <div className="date"><Date>{n.date}</Date></div>
                            <div className={"text "+cssClass}>{n.text}</div>
            </li>
        );
    }

    render(){
        const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
                <Dialog
                    title="Notifications"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <ReactTooltip delayShow={500}/>
                            <ul className="list-group activity-feed">
                                {this.props.notifs.length!=0? (this.props.notifs.map(n=>this.renderNotif(n)))
                                : (<p>You don't have notifications at the moment :( </p>)}
                            </ul>
                            <div style={{textAlign:"center"}}>
                                {this.state.loading?
                                    (<p>Loading...</p>)
                                :
                                    this.props.notifs.length!=0 &&(<FlatButton onClick={this.loadMore}label="Show more" primary={true} />)
                                }
                            </div>
                </Dialog>
        );
    }
}

function mapStateToProps(state){
    return {open: state.showNotifs, notifs: state.notifs};
}

export default connect(mapStateToProps,{hideNotifs})(Radium(NotificationModal));