import React from "react";
import Like from "./like";
import { shallow } from "enzyme";

const props = {
  audio: { likes: [] },
  onClick: jest.fn()
};

describe("Component: <Like />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Like {...props} />);
  });

  it("should render element with onClick method and audio prop", () => {
    let classes = "far fa-heart clickable icon-button";
    expect(
      wrapper.contains(
        <i
          className={classes}
          style={{ color: "red" }}
          onClick={props.onClick}
        />
      )
    ).toBe(true);
  });
});
