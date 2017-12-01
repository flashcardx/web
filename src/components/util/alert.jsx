import React, {Component} from 'react'
import AlertContainer from 'react-alert';
import PropTypes from 'prop-types';
 
const TIME = 9000

 const alertOptions = {
    offset: 14,
    position: 'top center',
    time: TIME,
    transition: 'scale'
  }

class Alert extends Component {
    constructor(props){
        super(props);
        this.showAlert = this.showAlert.bind(this);
    }

  showAlert = () => {
    this.msg.show(this.props.msg, {
      time: this.props.time? this.props.time : TIME ,
      type: this.props.type,
      theme: this.props.theme? this.props.theme: "light" 
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

Alert.propTypes = {
    msg: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'error', "success-game", "error-game", "info-game"])
}

export default Alert;