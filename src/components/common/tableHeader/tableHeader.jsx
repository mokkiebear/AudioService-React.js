import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  raiseSort = path => {
    if (!path) return null;
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (!sortColumn || column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-sort-up" />;
    return <i className="fas fa-sort-down" />;
  };

  render() {
    if (!this.props.columns) return null;
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func
};

export default TableHeader;
