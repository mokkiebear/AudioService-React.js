import React, { Component } from "react";
import SearchBox from "../common/searchBox/searchBox";
import Pagination from "../common/pagination/pagination";
import UsersTable from "./usersTable";
import { getUsers, deleteUser } from "../../services/userService";
import paginate from "../../utils/paginate";
import _ from "lodash";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 8,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u._id !== user._id);
    this.setState({ users });
    try {
      await deleteUser(user._id);
    } catch (ex) {
      console.log("Something goes wrong!");
      this.setState({ users: originalUsers });
    }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      users: allUsers,
      searchQuery
    } = this.state;

    let filtered = allUsers;
    if (searchQuery) {
      filtered = allUsers.filter(u => {
        return (
          u.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      });
    }
    let sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { sortColumn, searchQuery, pageSize, currentPage } = this.state;
    const { totalCount, data: users } = this.getPagedData();
    return (
      <div>
        <h2>Пользователи</h2>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <UsersTable
          users={users}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          onClick={this.playAudio}
        />
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

export default Users;
