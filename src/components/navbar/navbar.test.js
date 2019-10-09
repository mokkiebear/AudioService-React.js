import React from "react";
import { NavLink } from "react-router-dom";
import { shallow } from "enzyme";
import NavBar from "./navbar";

describe("Component: <NavBar />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it("should render without errors", () => {
    wrapper = wrapper.find("header");
    expect(wrapper.length).toBe(1);
  });

  it("should render logo", () => {
    wrapper = wrapper.find(`[data-test='logo']`);
    expect(wrapper.length).toBe(1);
  });

  it("should render four <li> elements if not authenticated", () => {
    expect(wrapper.find("li")).toHaveLength(4);
  });

  it("should render four <li> elements if authenticated", () => {
    wrapper.setProps({ user: true });
    expect(wrapper.find("li")).toHaveLength(4);
  });

  it("should render LogOut element if authenticated", () => {
    wrapper.setProps({ user: true });
    expect(
      wrapper.contains(
        <li>
          <NavLink to="/logout">
            <i className="fas fa-door-open" /> Выйти
          </NavLink>
        </li>
      )
    ).toEqual(true);
  });
});
