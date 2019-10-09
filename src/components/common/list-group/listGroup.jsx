import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const {
    id,
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;

  if (!items) {
    return null;
  }

  return (
    <ul id={id} data-test="ListGroupComponent">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={item === selectedItem ? "active clickable" : "clickable"}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  id: PropTypes.string,
  items: PropTypes.array,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func
};

export default ListGroup;
