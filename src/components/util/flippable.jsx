import React from "react"
import CreateReactClass from "create-react-class"
import "../../css/flippable.css"

var rotate = null
var Flippable = CreateReactClass({
    getInitialState: function() {
      return {
        flipped: false
      }
    },
    flip: function() {
      rotate = rotate? null: "rotate"
        //this is meant to be called from the parent of this component by using a ref of this one
      this.setState({
        flipped: !this.state.flipped
      });
    } ,
    render: function() {
      var parentContainerCSS = "flipper-container";
      var innerContainerCSS = "flipper";
      if(rotate){
        innerContainerCSS += " rotate"
        parentContainerCSS += " rotate"
      }
      return (
        <div className={parentContainerCSS}>
          <div className={innerContainerCSS}>
              <div className="front">
                {this.props.children[0]}
              </div>
              <div className="back">
                {this.props.children[1]}
              </div>
          </div>
        </div>
      );
    }
  });

export default Flippable;