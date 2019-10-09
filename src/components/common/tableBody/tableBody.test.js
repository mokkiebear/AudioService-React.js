import React from "react";
import { shallow } from "enzyme";
import TableBody from "./tableBody";
import checkPropTypes from "check-prop-types";

const defaultProps = {
  data: [
    { _id: 1, name: "Maxim", email: "maxim@gmail.com" },
    { _id: 2, name: "Test", email: "test@gmail.com" },
    { _id: 3, name: "Bot", email: "bot@gmail.com" },
    { _id: 4, name: "Danik", email: "danik@gmail.com" }
  ],
  columns: [
    { path: "email", label: "Электронный адрес" },
    { path: "name", label: "ФИО" }
  ]
};

describe("Component <TableBody />", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = { ...defaultProps };

      const propsErr = checkPropTypes(
        TableBody.propTypes,
        expectedProps,
        "props",
        TableBody.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = { ...defaultProps };
      wrapper = shallow(<TableBody {...props} />);
    });

    it("should render without errors", () => {
      wrapper = wrapper.find("tbody");
      expect(wrapper).toHaveLength(1);
    });

    it("With setted props it should render four <tr /> elements", () => {
      wrapper = wrapper.find("tr");
      expect(wrapper.length).toBe(4);
    });

    it("With setted props it should render eight <td /> elements", () => {
      wrapper = wrapper.find("td");
      expect(wrapper.length).toBe(8);
    });

    it("Checking method createKey", () => {
      expect(
        wrapper
          .instance()
          .createKey(
            { _id: 1, name: "Maxim", email: "maxim@gmail.com" },
            { path: "name", label: "ФИО" }
          )
      ).toEqual("1name");
    });

    it("Checking method renderCell (without content)", () => {
      expect(
        wrapper
          .instance()
          .renderCell(
            { _id: 1, name: "Maxim", email: "maxim@gmail.com" },
            { path: "name", label: "ФИО" }
          )
      ).toEqual("Maxim");
    });

    it("Checking method renderCell (with content)", () => {
      expect(
        wrapper.instance().renderCell(
          { _id: 1, name: "Maxim", email: "maxim@gmail.com" },
          {
            path: "name",
            label: "ФИО",
            content: user => <span>{user.name}</span>
          }
        )
      ).toEqual(<span>Maxim</span>);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TableBody />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find("tbody");
      expect(wrapper).toHaveLength(0);
    });
  });
});
