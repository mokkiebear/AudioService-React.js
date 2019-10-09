import React from "react";
import { shallow } from "enzyme";
import SearchBox from "./searchBox";
import checkPropTypes from "check-prop-types";

describe("Testing <SearchBox /> component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        value: "Test value",
        onChange: jest.fn()
      };

      const propsErr = checkPropTypes(
        SearchBox.propTypes,
        expectedProps,
        "props",
        SearchBox.name
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        value: "Test value",
        onChange: () => {}
      };
      wrapper = shallow(<SearchBox {...props} />);
    });

    it("Should render without errors", () => {
      expect(wrapper.find("input")).toHaveLength(1);
    });
  });
});
