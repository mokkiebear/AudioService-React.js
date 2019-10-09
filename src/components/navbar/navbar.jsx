import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbar.scss";

const NavBar = props => {
  return (
    <header id="navigation-bar">
      <nav>
        <ul>
          <li
            data-test="logo"
            style={{ float: "left", color: "white", fontWeight: "bold" }}
          >
            Enjoy <i className="fas fa-headphones-alt" /> Listen
          </li>
          {/*<li>
            <a id="logo">Всего аудио: {props.totalCount}</a>
          </li>*/}
          <li>
            <NavLink to="/audios">
              <i className="fas fa-music" /> Аудиозаписи
            </NavLink>
          </li>
          {!props.user && (
            <React.Fragment>
              <li>
                <NavLink to="/login">
                  <i className="fas fa-door-open" /> Войти
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <i className="fas fa-user-plus" /> Регистрация
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {props.user && (
            <React.Fragment>
              <li>
                <NavLink to="/profile">
                  <i className="far fa-user" /> {props.user.name}
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout">
                  <i className="fas fa-door-open" /> Выйти
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
