import React from "react";
import TableHeader from "../tableHeader/tableHeader";
import TableBody from "../tableBody/tableBody";
import PropTypes from "prop-types";
import "../../../styles/table.scss";

const Table = props => {
  const { columns, sortColumn, onSort, data } = props;
  if (!columns) return null;
  return (
    <table>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func,
  data: PropTypes.array
};

export default Table;
