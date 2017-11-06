import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import Radium from "radium";

const style = {
  error:{
    color: "red",
    fontWeight: "bold"
  }
}



class TextInput extends Component{

  constructor(props){
    super(props);
    this.state = {name:props.name, placeholder:props.placeholder, 
                value: props.value, error: props.error, fieldType:props.fieldType,
                options: props.options,
               type: props.type};
    this.renderField = this.renderField.bind(this);
  }

  renderOption(o){
    return <option key={o.value} value={o.value}>{o.label}</option>
  }

  renderField(field){
  var fieldType = this.state.fieldType;
  var type = this.state.type;
  var component;
  switch (fieldType) {
    case "input": component = <input {...field.input} value={this.props.value} onChange={this.props.onChange} type={type} placeholder={field.placeholder} className="form-control"/>
                  break;
    case "select": component = (<select {...field.input} className="form-control">
                                {this.state.options.map(this.renderOption)}
                                </select>
                          )
                  break;
    case "textarea": component = <textarea {...field.input} type={field.type} placeholder={field.placeholder} className="form-control"/>
                     break;
  }
  return(
    <div className="form-group has-danger">
        {component}
        <div style={style.error}>
          {field.meta.touched && field.meta.error}
        </div>
    </div>
  );
}  


  render(){
        var props = this.state;
        let wrapperClass = 'form-group';
        return (
          <div style={props.style} className={wrapperClass}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <div className="field">
              <Field
                component={this.renderField}
                {...props}
                />
            </div>
          </div>
        );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  fieldType: PropTypes.oneOf(["input", "textarea", "select"]).isRequired
};

export default Radium(TextInput);