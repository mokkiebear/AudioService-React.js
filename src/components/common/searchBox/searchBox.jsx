import React from "react";
import PropTypes from "prop-types";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      placeholder="Поиск..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchBox;
