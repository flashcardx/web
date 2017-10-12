import React from "react";
import Formsy from 'formsy-react';
import Radium from "radium";

const style = {
    error:{
        border: "1px solid red"
    }
}

export const MyOwnInput = Radium(React.createClass({

    getInitialState(){
        return {focus: false}
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },

    render() {
      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid
      var apropiateStyle = (this.showRequired() || this.showError()) ? style.error : null;

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.getErrorMessage();
      if(this.state.focus || (this.showRequired() && !this.isFormSubmitted()))
            apropiateStyle = errorMessage = null;
      return (
          <div>
            <input 
                   placeholder={this.props.placeholder}
                   className={this.props.className}
                   onFocus={()=>{this.setState({focus:true})}}
                   onBlur={()=>{this.setState({focus:false})}}
                   style={apropiateStyle}
                   type="text"
                   onChange={this.changeValue}
                   value={this.getValue()}/>
            
            <span style={{color:"red"}}>{errorMessage}</span>
        </div>
      );
    }
  }));



export const MyOwnTextarea = Radium(React.createClass({

    getInitialState(){
        return {focus: false}
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },

    render() {
      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid
      var apropiateStyle = (this.showRequired() || this.showError()) ? style.error : null;

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.getErrorMessage();
      if(this.state.focus || (this.showRequired() && !this.isFormSubmitted()))
            apropiateStyle = errorMessage = null;
      return (
          <div>
            <textarea 
                   placeholder={this.props.placeholder}
                   className={this.props.className}
                   onFocus={()=>{this.setState({focus:true})}}
                   onBlur={()=>{this.setState({focus:false})}}
                   style={apropiateStyle}
                   type="text"
                   onChange={this.changeValue}
                   value={this.getValue()}/>
            
            <span style={{color:"red"}}>{errorMessage}</span>
        </div>
      );
    }
  }));
