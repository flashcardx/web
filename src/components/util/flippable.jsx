import React from "react"
import CreateReactClass from "create-react-class"
import "../../css/flippable.css"

var Flippable = CreateReactClass({
    getInitialState: function() {
      return {
        flipped: false,
        clicked: false
      }
    },
    flip: function() {
        //this is meant to be called from the parent of this component by using a ref of this one
      this.setState({
        flipped: !this.state.flipped,
        clicked: true
      });
    } ,
    render: function() {
      var flippedCSS = this.state.flipped ? " Card-Back-Flip" : " Card-Front-Flip";
      if (!this.state.clicked) flippedCSS =  "";
      return (
        <div className="Card">
          <div className={"Card-Front"+flippedCSS}>
            {this.props.children[0]}
          </div>
          <div className={"Card-Back"+flippedCSS}>
            {this.props.children[1]}
          </div>
        </div>
      );
    }
  });

export default Flippable;