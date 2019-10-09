import reducer from "./audiosReducer";
import * as audiosActions from "../actions/audiosActions";

const initialState = {
  audios: [],
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

describe("Audios reducer", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should change the limit correctly", () => {
    expect(
      reducer(initialState, {
        type: audiosActions.CHANGE_LIMIT,
        limit: initialState.limit - 1
      })
    ).toEqual(Object.assign({}, initialState, { limit: 4 }));
  });

  it("Should return new state if receiving type", () => {
    const audios = [{}, {}, {}];
    const newState = reducer(undefined, {
      type: audiosActions.SET_AUDIOS,
      audios
    });
    expect(newState).toEqual(Object.assign({}, initialState, { audios }));
  });
});
