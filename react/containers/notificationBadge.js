import React, {Component} from "react";
import {connect} from "react-redux";
import Radium from "radium";
import axios from "axios";
import Badge from 'material-ui/Badge';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconButton from 'material-ui/IconButton';
import {fetchCount} from "../actions/notifications";
import InfiniteScroll from "react-infinite";

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
    },
    noscroll:{
        overflowY: "hidden"
    }
};

class NotificationBadge extends Component{ 
    
    constructor(props){
        super(props);
        this.state = {count: props.count, open:false};
        this.loadMore = this.loadMore.bind(this);
        this.renderModal = this.renderModal.bind(this);
  }

    loadMore() {
        console.log("handle scroll");
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount(){
        this.props.fetchCount();
    }


    componentWillReceiveProps(nextProps){
        this.setState({count: nextProps.count});
    }

    renderModal(){
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
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={false}>
                        <InfiniteScroll
                        className="activity-feed"
                        containerHeight={500}
                        elementHeight={50}
                        infiniteLoadBeginEdgeOffset={70}
                        onInfiniteLoad={this.loadMore}>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-17T14:29:37.296Z">
                                        <div className="date">30 days ago.</div>
                                        <div className="text seen">asdf joined class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                                    <div className="feed-item" data-date="2017-08-14T03:32:37.037Z">
                                        <div className="date">33 days ago.</div>
                                        <div className="text seen">Agustina Marino added you to the class: best class ever</div>
                                    </div>
                        </InfiniteScroll>
                </Dialog>
        );
    }

    render(){
    if(this.state.count)
            return (
                <div>
                    {this.renderModal()}
                    <div style={style.notifications}>
                        <Badge
                            style={style.notifications}
                            badgeStyle={style.badge}
                            badgeContent={this.state.count}
                            secondary={true}
                            >
                            <IconButton style={style.notifications} onClick={this.handleOpen} tooltip="Notifications">
                                <NotificationsIcon style={style.notifications} />
                            </IconButton>
                        </Badge>
                    </div>
                </div>
            );
    else
        return (<div>
                    {this.renderModal()}
                    <IconButton style={style.notifications} onClick={this.handleOpen} tooltip="Notifications">
                        <NotificationsIcon style={style.notifications} />
                    </IconButton>
                </div>);
    }
}

function mapStateToProps(state){
    return {count: state.notificationCount};
}

const radiumComponent = Radium(NotificationBadge)


export default connect(mapStateToProps, {fetchCount})(radiumComponent);
