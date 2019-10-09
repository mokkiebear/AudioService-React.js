import React from "react";
import Form from "../common/form/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import authService from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .min(4)
      .required()
      .label("Имя пользователя")
      .error(errors => {
        return errors.map(error => {
          switch (error.type) {
            case "string.min":
              return {
                message:
                  "Поле 'Имя пользователя' должно содержать минимум 4 символа."
              };
            case "any.empty":
              return {
                message: "Поле 'Имя пользователя' должно быть заполнено."
              };
          }
        });
      }),
    password: Joi.string()
      .required()
      .min(8)
      .label("Пароль")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await authService.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/audios";
      toast.success("Вы успешно вошли в аккаунт!");
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
        <h1>Логин</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Электронный адрес")}
          {this.renderInput("password", "Пароль", "password")}
          {this.renderButton("Войти")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
