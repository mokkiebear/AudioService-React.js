import React, { Component } from "react";
import Table from "../common/table/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

class CommentsTable extends Component {
  columns = [
    {
      path: "text",
      label: "Комментарии"
    },
    { path: "user", label: "Пользователь" },
    {
      key: "actions",
      label: "Действия",
      content: user => {
        const cuser = getCurrentUser();
        if (cuser && (cuser.name === user.user || cuser.isAdmin)) {
          return (
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
          );
        } else return null;
      }
    }
  ];

  render() {
    const { comments } = this.props;
    return (
      <div>{comments && <Table data={comments} columns={this.columns} />}</div>
    );
  }
}

export default CommentsTable;
