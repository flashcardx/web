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

function renderField(field, type){
  return(
    <div className="form-group has-danger">
        <input {...field.input} type={type} className="form-control"/>
        <div style={style.error}>
          {field.meta.touched && field.meta.error}
        </div>
    </div>
  );
}

const TextInput = ({name, label, onChange, placeholder, value, error, type="text", style}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  return (
    <div style={style} className={wrapperClass}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field">
        <Field
          component={field=>renderField(field, type)}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
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