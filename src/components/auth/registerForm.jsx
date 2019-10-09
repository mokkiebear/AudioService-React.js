import React from "react";
import Form from "../common/form/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Имя пользователя"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Пароль"),
    name: Joi.string()
      .required()
      .label("Имя")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/audios";
      toast.success("Вы успешно зарегистрированы!");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          textAlign: "center",
          border: "2px solid black",
          padding: "10px",
          boxShadow: "0px 1px 2px black"
        }}
      >
        <h1>Регистрация</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Электронный адрес")}
          {this.renderInput("password", "Пароль", "password")}
          {this.renderInput("name", "Имя")}
          {this.renderButton("Регистрация")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
