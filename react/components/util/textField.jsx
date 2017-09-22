import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import Radium from "radium";

const style = {
  error:{
    color: "red",
    fontWeight: "bold"
  }
}

function renderField(field){
  return(
    <div className="form-group has-danger">
        <input {...field.input} type={field.type} placeholder={field.placeholder} className="form-control"/>
        <div style={style.error}>
          {field.meta.touched && field.meta.error}
        </div>
    </div>
  );
}

const TextInput = ({name, label, onChange, placeholder, value, type="text", style}) => {
  let wrapperClass = 'form-group';
  return (
    <div style={style} className={wrapperClass}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field">
        <Field
          component={renderField}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}/>
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default Radium(TextInput);