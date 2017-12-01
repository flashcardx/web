import React, { Component } from 'react';
import { Motion, spring } from "react-motion";
import PropTypes from 'prop-types';

export default class ReactTextCollapse extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const { options: { collapse } } = this.props;
    this.state = {
      collapse: collapse ? collapse : true,
      childrenHeight: 3000
    }//children height too high so at first expand text is shown
  }

  renderHelperText() {
    const { options: { collapseText, expandText, minHeight } } = this.props;
    const { collapse } = this.state;
    if(this.state.childrenHeight <= minHeight)
      return null;
    if (collapse) {
      return <div style={{ float: 'left', cursor:"pointer", color:"blue"}}>{collapseText}</div>
    } else {
      return <div style={{ float: 'left', cursor:"pointer", color:"blue"}}>{expandText}</div>
    }
  }

  toggleAction() {
    let { collapse } = this.state;
    collapse = !collapse;
    this.setState({ collapse });
  }

  componentDidMount(){
       var clientHeight = this.childrenRef.clientHeight;
       this.setState({childrenHeight: clientHeight});
  }

  render() {
    const { children } = this.props;
    const { minHeight } = this.props.options;
    const maxHeight = this.state.childrenHeight;
    const { collapse } = this.state;
    return (
      <Motion
        defaultStyle={{ h: 0 }}
        style={{ h: spring(collapse ? minHeight : maxHeight) }}>
        {
          ({ h }) => (
            <div>
              <div
                style={{
                  display: `block`,
                  overflow: `hidden`,
                  height: `${h}px`
                }}>
                <span style={{display:"block"}} ref={r => { this.childrenRef = r; }} >
                    {children}
                </span>
              </div>
              <div onClick={this.toggleAction.bind(this)}>{this.renderHelperText()}</div>
            </div>
          )
        }
      </Motion>
    );
  }
}