import React, { Component } from "react";
import { getUser, saveUser } from "../../services/userService";
import Form from "../common/form/form";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import auth from "../../services/authService";
import Users from "./users";
import UserForm from "./userForm";

class User extends Form {
  state = {
    user: {},
    data: { oldPassword: "", newPassword: "" },
    errors: {}
  };

  schema = {
    newPassword: Joi.string()
      .required()
      .min(8)
      .label("Пароль"),
    oldPassword: Joi.string()
      .required()
      .min(8)
      .label("Пароль")
  };

  async componentDidMount() {
    const currentUser = auth.getCurrentUser();

    const { data: user } = await getUser(currentUser._id);
    user.isAdmin = currentUser.isAdmin;
    this.setState({ user });
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const user = this.state.user;
      user.oldPassword = data.oldPassword;
      user.newPassword = data.newPassword;
      await saveUser(user);
      /*const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/profile";*/
      toast.success("Пароль успешно изменен");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.oldPassword = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { name, email, isAdmin } = this.state.user;
    return (
      <div>
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            textAlign: "center",
            border: "2px solid black",
            padding: "10px",
            boxShadow: "0px 1px 2px black"
          }}
        >
          <h2>Имя пользователя: {name}</h2>
          <p>Электронный адрес: {email}</p>
        </div>
        <br />
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            textAlign: "center",
            border: "2px solid black",
            padding: "10px",
            boxShadow: "0px 1px 2px black"
          }}
        >
          <h2>Изменение пароля</h2>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("oldPassword", "Старый пароль", "password")}
            {this.renderInput("newPassword", "Новый пароль", "password")}
            {this.renderButton("Изменить пароль")}
          </form>
        </div>
        <br />
        {this.state.user._id && <UserForm userId={this.state.user._id} />}

        {isAdmin && <Users />}
      </div>
    );
  }
}

export default User;
