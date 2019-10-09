import React from "react";
import { shallow, render } from "enzyme";
import ListGroup from "./listGroup";
import checkPropTypes from "check-prop-types";

describe("Testing <ListGroup /> component", () => {
  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {
        id: "test-list",
        items: [{}, {}],
        selectedItem: {},
        onItemSelect: jest.fn()
      };
      const propsErr = checkPropTypes(
        ListGroup.propTypes,
        expectedProps,
        "props",
        ListGroup.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        id: "test-list",
        items: [
          { _id: "1", name: "Test Name 1" },
          { _id: "2", name: "Test Name 2" }
        ],
        selectedItem: { _id: "id 1", name: "Test Name 1" },
        onItemSelect: mockFunc
      };
      wrapper = shallow(<ListGroup {...props} />);
    });

    it("Should render without errors", () => {
      wrapper = wrapper.find(`[data-test='ListGroupComponent']`);
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
      wrapper = shallow(<ListGroup />);
    });

    it("Should NOT render", () => {
      wrapper = wrapper.find(`[data-test='ListGroupComponent']`);
      expect(wrapper).toHaveLength(0);
    });
  });
});
