import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import RegisterForm from "./components/auth/registerForm";
import LoginForm from "./components/auth/loginForm";
import Logout from "./components/auth/logout";
import Profile from "./components/users/profile";
import UserForm from "./components/users/userForm";
import AudioForm from "./components/audios/audioForm/audioForm";
import Audio from "./components/audios/audio/audio";
import Audios from "./components/audios/audios/audios";
import NavBar from "./components/navbar/navbar";
import NotFound from "./components/common/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";

import logo from "./logo.svg";
import "./styles/App.scss";

class App extends Component {
  state = {};
  constructor() {
    super();
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div>
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />

            <ProtectedRoute path="/users/edit/:id" component={UserForm} />
            <ProtectedRoute path="/profile/" component={Profile} />

            <ProtectedRoute path="/audios/edit/:id" component={AudioForm} />
            <Route path="/audios/:id" component={Audio} />
            <Route
              path="/audios"
              render={props => <Audios {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/audios" />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
