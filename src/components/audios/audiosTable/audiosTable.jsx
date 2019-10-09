import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../../common/like/like";
import Table from "../../common/table/table";
import auth from "../../../services/authService";

class AudiosTable extends Component {
  state = {
    classes: "fas fa-play"
  };

  columns = [
    {
      key: "Play",
      content: audio => (
        <span className="icon-button clickable">
          <i
            className={this.state.classes}
            style={{ cursor: "pointer" }}
            onClick={() => this.props.onClick(audio)}
          />
        </span>
      )
    },
    {
      path: "title",
      label: "Название",
      content: audio => <Link to={`/audios/${audio._id}`}>{audio.title}</Link>
    },
    { path: "singers", label: "Исполнитель" },
    { path: "genres", label: "Жанры" },
    /*{ path: "likes", label: "Количество лайков" },*/
    { path: "auditions", label: "Прослушивания" }
  ];

  likeColumn = {
    key: "Like",
    path: "likes",
    label: "Лайки",
    content: audio => (
      <Like
        liked={this.props.likedAudios.includes(audio._id)}
        audio={audio}
        onClick={() => this.props.onLike(audio)}
      />
    )
  };

  actionsColumn = {
    key: "actions",
    label: "Действия",
    content: audio => (
      <span>
        <Link
          to={`/audios/edit/${audio._id}`}
          className="icon-button"
          style={{ color: "orange" }}
        >
          <i className="fas fa-edit" />
        </Link>
        <a
          onClick={() => this.props.onDelete(audio)}
          className="icon-button clickable"
        >
          <i className="far fa-trash-alt" />
        </a>
      </span>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.columns.push(this.likeColumn);
    if (user && user.isAdmin) {
      this.columns.push(this.actionsColumn);
    }
  }

  render() {
    const { audios, sortColumn, onSort } = this.props;
    return (
      <div style={{ marginBottom: "200px" }}>
        <Table
          data={audios}
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default AudiosTable;
