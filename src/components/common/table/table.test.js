import React from "react";
import { shallow } from "enzyme";
import Table from "./table";
import checkPropTypes from "check-prop-types";
import TableHeader from "../tableHeader/tableHeader";
import TableBody from "../tableBody/tableBody";

const defaultProps = {
  columns: [
    { path: "email", label: "Электронный адрес" },
    { path: "name", label: "ФИО" }
  ],
  data: [
    { _id: 1, name: "Maxim", email: "maxim@gmail.com" },
    { _id: 2, name: "Test", email: "test@gmail.com" },
    { _id: 3, name: "Bot", email: "bot@gmail.com" },
    { _id: 4, name: "Danik", email: "danik@gmail.com" }
  ],
  onSort: jest.fn(),
  sortColumn: { path: "name", order: "asc" }
};

describe("Component <Table />", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = { ...defaultProps };

      const propsErr = checkPropTypes(
        Table.propTypes,
        expectedProps,
        "props",
        Table.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = { ...defaultProps };
      wrapper = shallow(<Table {...props} />);
    });

    it("Should render without errors", () => {
      wrapper = wrapper.find("table");
      expect(wrapper).toHaveLength(1);
    });

    it("Should render <TableHeader />", () => {
      wrapper = wrapper.find(TableHeader);
      expect(wrapper).toHaveLength(1);
    });

    it("Should render <TableBody />", () => {
      wrapper = wrapper.find(TableBody);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Table />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find("table");
      expect(wrapper).toHaveLength(0);
    });
  });
});
