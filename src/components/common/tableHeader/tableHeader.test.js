import React from "react";
import { shallow } from "enzyme";
import TableHeader from "./tableHeader";
import checkPropTypes from "check-prop-types";

const defaultProps = {
  columns: [
    { path: "email", label: "Электронный адрес" },
    { path: "name", label: "ФИО" }
  ],
  onSort: jest.fn(),
  sortColumn: { path: "name", order: "asc" }
};

describe("Component <TableHeader />", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = { ...defaultProps };

      const propsErr = checkPropTypes(
        TableHeader.propTypes,
        expectedProps,
        "props",
        TableHeader.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = { ...defaultProps };
      wrapper = shallow(<TableHeader {...props} />);
    });

    it("should render without errors", () => {
      wrapper = wrapper.find("thead");
      expect(wrapper).toHaveLength(1);
    });

    it("With setted props it should render two <th /> elements", () => {
      wrapper = wrapper.find("th");
      expect(wrapper.length).toBe(2);
    });

    it("Checking method renderSortIcon (with sortColumn / asc order)", () => {
      expect(
        wrapper.instance().renderSortIcon({ path: "name", label: "ФИО" })
      ).toEqual(<i className="fas fa-sort-up" />);
    });

    it("Checking method renderSortIcon (with sortColumn / desc order)", () => {
      let props = { ...defaultProps };
      props.sortColumn = { path: "name", order: "desc" };
      wrapper.setProps({ ...props });
      expect(
        wrapper.instance().renderSortIcon({ path: "name", label: "ФИО" })
      ).toEqual(<i className="fas fa-sort-down" />);
    });

    it("Checking method renderSortIcon (without sortColumn)", () => {
      const props = { ...defaultProps };
      props.sortColumn = undefined;
      wrapper.setProps({ ...props });
      expect(
        wrapper.instance().renderSortIcon({ path: "name", label: "ФИО" })
      ).toEqual(null);
    });

    it("Checking method renderSortIcon (if sortColumn.path !== column.path)", () => {
      let props = { ...defaultProps };
      props.sortColumn = { path: "email", order: "desc" };
      wrapper.setProps({ ...props });
      expect(
        wrapper.instance().renderSortIcon({ path: "name", label: "ФИО" })
      ).toEqual(null);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TableHeader />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find("thead");
      expect(wrapper).toHaveLength(0);
    });
  });
});
