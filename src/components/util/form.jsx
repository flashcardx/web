import React from "react";
import Formsy from 'formsy-react';
import Radium from "radium";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var createReactClass = require('create-react-class');

const style = {
  error:{
    fontSize:"15px"
  }
}

export const MyOwnInput = Radium(createReactClass({

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

    onKeyDown(e){
      if(e.key ==="Enter" && this.props.onEnter){
          e.preventDefault();
               this.props.onEnter();
          }
    },

    componentDidMount(){
        if(this.props.autoFocus){
          setTimeout(() => {
              this.refInput.focus();
          }, 30);//we need this hack because refs are available after componentDidUpdate
        }
    },

    componentDidUpdate(){
      if(this.props.autoFocus && this.props.regainFocus){
          this.refInput.focus();
          this.props.focusWasResetted();
      }
    },

    onFocus(e){
        this.setState({focus:true})
        if(this.props.autoFocus){//this thing moves the caret to the end of the input if it has text
          var temp_value = e.target.value
          e.target.value = ''
          e.target.value = temp_value
        }
    },

    render() {
      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.getErrorMessage();
      if(this.state.focus || (this.showRequired() && !this.isFormSubmitted()))
           errorMessage = null;
      return (
          <div>
              <TextField
                            type={this.props.type}
                            ref={input=>{ this.refInput = input}} 
                            name={this.props.name}
                            multiLine={this.props.multiLine}
                            value={this.props.value}
                            onKeyDown={this.onKeyDown}
                            floatingLabelText={this.props.floatingLabelText}
                            hintText={this.props.placeholder}
                            className={this.props.className}
                            style={{width:"100%", ...this.props.style}}
                            onFocus={this.onFocus}
                            onBlur={()=>{this.setState({focus:false})}}
                            onChange={this.props.onChange} 
                            errorText={errorMessage}	
                            errorStyle={style.error}
                            />
            
        </div>
      );
    }
  }));

  export const MyOwnSelect = Radium(createReactClass({

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
      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.getErrorMessage();
      if(this.state.focus || (this.showRequired() && !this.isFormSubmitted()))
            errorMessage = null;
      const options = this.props.options.map((option, i)=>(
                    <MenuItem key={option.value}
                              value={option.value}
                              primaryText={option.label}/>
        ));
      return (
            <SelectField
                style={{width:"100%"}}
                name={this.props.name}
                onFocus={()=>{this.setState({focus:true})}}
                onBlur={()=>{this.setState({focus:false})}}
                value={this.props.value}
                onChange={this.props.onChange}
                hintText={this.props.placeholder}
                className={this.props.className}
                errorText={errorMessage}
                errorStyle={style.error}
                >
               {options}
            </SelectField>
      );
    }
  }));

