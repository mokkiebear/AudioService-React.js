import React from "react";
import { shallow } from "enzyme";
import Select from "./select";
import checkPropTypes from "check-prop-types";

describe("Component <Select />", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        name: "Test name",
        value: "Test value",
        label: "Test label",
        options: ["test1", "test2"],
        error: "",
        onChange: () => {}
      };

      const propsErr = checkPropTypes(
        Select.propTypes,
        expectedProps,
        "props",
        Select.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        name: "Test name",
        value: "Test value",
        label: "Test label",
        options: [{ _id: "1", name: "test1" }, { _id: "2", name: "test2" }],
        error: "",
        onChange: () => {}
      };
      wrapper = shallow(<Select {...props} />);
    });

    it("Should render without errors", () => {
      wrapper = wrapper.find(`[data-test='SelectComponent']`);
      expect(wrapper).toHaveLength(1);
    });

    it("With setted props it should render three options (one is empty)", () => {
      wrapper = wrapper.find("option");
      expect(wrapper.length).toBe(3);
    });

    it("Should render a label element", () => {
      wrapper = wrapper.find("label");
      expect(wrapper.length).toBe(1);
    });

    it("Should render a select element", () => {
      wrapper = wrapper.find("select");
      expect(wrapper.length).toBe(1);
    });
  });

  describe("Have NO props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Select />);
    });

    it("Should not render", () => {
      wrapper = wrapper.find(`[data-test='SelectComponent']`);
      expect(wrapper).toHaveLength(0);
    });
  });
});
