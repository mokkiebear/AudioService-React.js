import React from "react";
import Form from "../common/form/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import auth from "../../services/authService";

import { saveUser, getUser } from "../../services/userService";

class UserForm extends Form {
  state = {
    user: {},
    data: { name: "", email: "" },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Имя"),
    email: Joi.string()
      .email()
      .required()
  };

  async componentDidMount() {
    const userId = this.props.userId || this.props.match.params.id;
    const { data: user } = await getUser(userId);
    const currentUser = auth.getCurrentUser();
    if (!user || (!currentUser.isAdmin && currentUser._id !== userId))
      return this.props.history.replace("/not-found");
    this.setState({ user, data: this.mapToViewModel(user) });
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email
    };
  }

  doSubmit = async () => {
    const user = { ...this.state.user, ...this.state.data };
    console.log(user);
    await saveUser(user);
    toast.success("Данные изменены! Необходимо перезайти в аккаунт!");
  };

  render() {
    return (
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
        <h2>Изменение данных</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Имя")}
          {this.renderInput("email", "Электронный адрес")}
          {this.renderButton("Изменить данные")}
        </form>
      </div>
    );
  }
}

export default UserForm;
