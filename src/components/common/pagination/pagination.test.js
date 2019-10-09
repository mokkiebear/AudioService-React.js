import React from "react";
import { shallow } from "enzyme";
import Pagination from "./pagination";
import checkPropTypes from "check-prop-types";

describe("Component <Pagination />", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        itemsCount: 10,
        pageSize: 5,
        currentPage: 1,
        onPageChange: jest.fn()
      };

      const propsErr = checkPropTypes(
        Pagination.propTypes,
        expectedProps,
        "props",
        Pagination.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        itemsCount: 10,
        pageSize: 5,
        currentPage: 1,
        onPageChange: jest.fn()
      };
      wrapper = shallow(<Pagination {...props} />);
    });

    it("should render without errors", () => {
      wrapper = wrapper.find("nav");
      expect(wrapper).toHaveLength(1);
    });

    it("With setted props it should render two <li/> elements", () => {
      wrapper = wrapper.find("li");
      expect(wrapper.length).toBe(2);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Pagination />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find("nav");
      expect(wrapper).toHaveLength(0);
    });
  });
});
