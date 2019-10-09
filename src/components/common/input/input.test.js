import React from "react";
import { shallow } from "enzyme";
import Input from "./input";
import checkPropTypes from "check-prop-types";

describe("Component <Input />", () => {
  describe("Checking PropTypes", () => {
    const expectedProps = {
      name: "Test Name",
      label: "Test Label"
    };

    const propsErr = checkPropTypes(
      Input.propTypes,
      expectedProps,
      "props",
      Input.name
    );

    expect(propsErr).toBeUndefined();
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        name: "Test Name",
        label: "Test Label"
      };
      wrapper = shallow(<Input {...props} />);
    });

    it("should render without errors", () => {
      wrapper = wrapper.find(`[data-test='InputComponent']`);
      expect(wrapper).toHaveLength(1);
    });

    it("should render a label", () => {
      expect(wrapper.find("label").length).toBe(1);
    });

    it("should render an input", () => {
      expect(wrapper.find("input")).toHaveLength(1);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Input />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find(`[data-test='InputComponent']`);
      expect(wrapper).toHaveLength(0);
    });
  });
});
