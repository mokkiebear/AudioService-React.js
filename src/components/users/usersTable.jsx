import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table/table";

class UsersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Имя",
      content: user => <span>{user.name}</span>
    },
    { path: "email", label: "Электронный адрес" },
    {
      path: "isAdmin",
      label: "Роль",
      content: user => (
        <span>{user.isAdmin ? "Администратор" : "Пользователь"}</span>
      )
    },
    {
      key: "actions",
      label: "Действия",
      content: user => (
        <span>
          <Link
            to={`/users/edit/${user._id}`}
            className="icon-button"
            style={{ color: "orange" }}
          >
            <i className="fas fa-edit" />
          </Link>
          <a
            onClick={() => this.props.onDelete(user)}
            className="icon-button clickable"
          >
            <i className="far fa-trash-alt" />
          </a>
        </span>
      )
    }
  ];

  render() {
    const { users, sortColumn, onSort } = this.props;
    return (
      <div>
        {users && (
          <Table
            data={users}
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
        )}
      </div>
    );
  }
}

export default UsersTable;
