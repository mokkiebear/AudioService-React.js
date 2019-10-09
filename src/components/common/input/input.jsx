import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, ...rest }) => {
  if (!name) {
    return null;
  }
  return (
    <div data-test="InputComponent">
      <label htmlFor={name}>{label}: </label>
      <input {...rest} name={name} id={name} />
      {error && <div className="warning">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
};

export default Input;
