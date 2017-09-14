import React, {Component} from 'react'
import AlertContainer from 'react-alert'
import PropTypes from 'prop-types';
 
 const alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 6000,
    transition: 'scale'
  }

class Alert extends Component {
    constructor(props){
        super(props);
        this.state = {type: props.type, msg:props.msg};
        this.showAlert = this.showAlert.bind(this);
    }

    componentWillReceiveProps(nextProps){
      this.setState({type: nextProps.type, msg: nextProps.msg});
    }

  showAlert = () => {
    this.msg.show(this.state.msg, {
      time: 6000,
      type: this.state.type
    })
  }

  componentDidMount(){
      this.showAlert();
  }
    componentDidUpdate(){
        this.showAlert();     
  }
 
  render () {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
      </div>
    )
  }
}

Alert.PropTypes = {
    msg: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'error'])
}

export default Alert;