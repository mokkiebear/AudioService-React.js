import React from "react";
import PropTypes from "prop-types";

const Select = ({ name, label, options, error, ...rest }) => {
  if (!options) {
    return null;
  }
  return (
    <div data-test="SelectComponent">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest}>
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div>{error}</div>}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
