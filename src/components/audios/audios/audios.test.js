import React from "react";
import { Audios } from "./audios";
import { Link } from "react-router-dom";
import AudiosTable from "../audiosTable/audiosTable";
import { shallow } from "enzyme";

const defaultStore = {
  audios: [{}],
  likedAudios: [],
  genres: [],
  categories: [],
  sortColumn: { path: "title", order: "asc" },
  selectedGenre: null,
  selectedCategory: null,
  searchQuery: "",
  currentAudio: 0,
  limit: 5
};

describe("Component: <Audios />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Audios audiosStore={{ ...defaultStore }} />);
  });

  it("should render the 'add music' button if the user is admin", () => {
    wrapper.setProps({ user: { isAdmin: true } });
    expect(
      wrapper.contains(<Link to="/audios/edit/new">Добавить аудио</Link>)
    ).toBe(true);
  });

  it("should render the 'AudiosTable' component if audios is not empty", () => {
    expect(wrapper.find(AudiosTable)).toHaveLength(1);
  });

  it("should be the 'warning message' if there are no audios", () => {
    const newProps = Object.assign({ ...defaultStore }, { audios: [] });
    wrapper.setProps({ audiosStore: newProps });
    expect(
      wrapper.contains(
        <p className="warning">Нету аудиозаписей в базе данных.</p>
      )
    ).toBe(true);
  });

  it("should return correct paged data", () => {
    const newProps = Object.assign({ ...defaultStore }, { audios: [{}, {}] });
    wrapper.setProps({ audiosStore: newProps });
    expect(wrapper.instance().getPagedData()).toEqual({
      totalCount: 2,
      data: [{}, {}]
    });
  });
});
