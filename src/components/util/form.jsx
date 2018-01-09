import React from "react";
import Formsy from 'formsy-react';
import Radium from "radium";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
var createReactClass = require('create-react-class');

const style = {
  error:{
    fontSize:"15px"
  }
}

export const MyOwnInput = Radium(createReactClass({


    getInitialState(){
        return {focus: false, onEnter:false}
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],


    onKeyDown(e){
      if(e.key ==="Enter" && this.props.onEnter){
               e.preventDefault();
               this.setState({onEnter: true});
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
        this.setState({focus:true, onEnter:false})
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
      if((this.state.focus && !this.state.onEnter) || (this.showRequired() && !this.isFormSubmitted()))
           errorMessage = null;
      return (
          <div>
              <TextField
                            type={this.props.type}
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
                            ref={input=>{ this.refInput = input}} 
                            />
            
        </div>
      );
    }
  }));

  export const MyOwnSelect = Radium(createReactClass({

    getInitialState(){
        return {focus: false, value:""}
    },

    componentDidMount(){
        this.updateValue();
    },

    updateValue(){
        var valueExists = this.props.options.find(option=>{
          return option.value === this.props.value;
        });
        if(valueExists){
             this.setState({value:this.props.value});
        }
        else{
            this.setState({value:this.props.defaultValue})
        }
    },

    componentDidUpdate(prevProps, prevState){
      if(this.props.value !== prevProps.value)
        this.updateValue();
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

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
                value={this.state.value}
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

  var fetchTimeouteId = null
  export const MyOwnAutocomplete = Radium(createReactClass({


    getInitialState(){
        return {focus: false, onEnter:false}
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    onKeyDown(e){
      if(e.key ==="Enter" && this.props.onEnter){
               e.preventDefault();
               this.setState({onEnter: true});
               this.props.onEnter();
          }
    },

    componentDidMount(){
      if(this.props.autoFocus){
          setTimeout(() => {
            this.refInput.focus();
          }, 30);//we need this hack because refs are available after componentDidMount
      }    
    },

    componentDidUpdate(prevProps){
      if(this.props.autoFocus && this.props.regainFocus){
          this.refInput.focus();
          this.props.focusWasResetted();
      }
      if(this.props.value !== prevProps.value){
          clearTimeout(fetchTimeouteId);
          this.props.onTyping()
          fetchTimeouteId = setTimeout(() => {
                this.props.fetchSuggestions()
            }, this.props.timeToFetch || 400);
      }
    },

    onFocus(e){
        this.setState({focus:true, onEnter:false})
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
      if((this.state.focus && !this.state.onEnter) || (this.showRequired() && !this.isFormSubmitted()))
           errorMessage = null;
      return (
          <div>
              <AutoComplete
                            filter={()=>true}
                            fullWidth={true}
                            dataSource={this.props.suggestions}
                            name={this.props.name}
                            multiLine={this.props.multiLine}
                            searchText={this.props.value}
                            onKeyDown={this.onKeyDown}
                            floatingLabelText={this.props.floatingLabelText}
                            hintText={this.props.placeholder}
                            className={this.props.className}
                            style={{width:"100%", ...this.props.style}}
                            onFocus={this.onFocus}
                            onBlur={()=>{this.setState({focus:false})}}
                            onUpdateInput={this.props.onChange} 
                            errorText={errorMessage}	
                            errorStyle={style.error}
                            ref={input=>{ this.refInput = input}} 
                            />
            
        </div>
      );
    }
  }));