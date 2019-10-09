import React, { Component } from "react";
import Pagination from "../common/pagination/pagination";
import {
  getComments,
  deleteComment,
  saveComment
} from "../../services/commentService";
import paginate from "../../utils/paginate";
import _ from "lodash";
import CommentsTable from "./commentsTable";
import { getCurrentUser } from "../../services/authService";

class Comments extends Component {
  state = {
    comments: [],
    currentPage: 1,
    pageSize: 8
  };

  async componentDidMount() {
    console.log(this.props);
    const { data: comments } = await getComments(this.props.audioId);
    this.setState({ comments });
  }

  handleDelete = async comment => {
    const originalComments = this.state.comments;
    const comments = originalComments.filter(c => c._id !== comment._id);
    this.setState({ comments });
    try {
      await deleteComment(comment._id);
    } catch (ex) {
      console.log("Something goes wrong!");
      this.setState({ comments: originalComments });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, comments: allComments } = this.state;

    const comments = paginate(allComments, currentPage, pageSize);

    return { totalCount: allComments.length, data: comments };
  };

  addComment = async () => {
    var commentNode = document.getElementById("comment");
    let comments = [...this.state.comments];
    let comment = {};
    comment.text = commentNode.value;
    comment.audioId = this.props.audioId;
    comment.user = getCurrentUser().name;

    let { data: result } = await saveComment(comment);
    comments.push(result);
    this.setState({ comments });
    commentNode.value = "";
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: comments } = this.getPagedData();
    return (
      <div>
        <h2>Комментарии</h2>
        {getCurrentUser() && (
          <div>
            <textarea id="comment" />
            <br />
            <button onClick={this.addComment}>Добавить Комментарий</button>
          </div>
        )}
        <CommentsTable comments={comments} onDelete={this.handleDelete} />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Comments;
