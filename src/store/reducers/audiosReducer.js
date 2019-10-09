import * as audiosActions from "../actions/audiosActions";
import { updateObject } from "../../utils/updateObject";
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

export default (state = initialState, action) => {
  switch (action.type) {
    case audiosActions.SET_AUDIOS:
      return updateObject(state, { audios: action.audios });

    case audiosActions.SET_LIKED_AUDIOS:
      return updateObject(state, { likedAudios: action.audios });

    case audiosActions.SET_CURRENT_AUDIO:
      return updateObject(state, { currentAudio: action.audio });

    case audiosActions.SET_GENRES:
      return updateObject(state, { genres: action.genres });

    case audiosActions.SET_CATEGORIES:
      return updateObject(state, { categories: action.categories });

    case audiosActions.CHANGE_LIMIT:
      return updateObject(state, { limit: state.limit - 1 });

    case audiosActions.SELECT_GENRE:
      return updateObject(state, { selectedGenre: action.selectedGenre });

    case audiosActions.SELECT_CATEGORY:
      return updateObject(state, { selectedCategory: action.selectedCategory });

    case audiosActions.SELECT_SORT_COLUMN:
      return updateObject(state, { sortColumn: action.sortColumn });

    case audiosActions.CHANGE_SEARCH_QUERY:
      return updateObject(state, { searchQuery: action.query });
  }
  return state;
};
