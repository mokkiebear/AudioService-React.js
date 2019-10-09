export const SET_AUDIOS = "SET_AUDIOS";
export const SET_LIKED_AUDIOS = "SET_LIKED_AUDIOS";
export const SET_CURRENT_AUDIO = "SET_CURRENT_AUDIO";
export const SET_GENRES = "SET_GENRES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const SELECT_GENRE = "SELECT_GENRE";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SELECT_SORT_COLUMN = "SELECT_SORT_COLUMN";
export const CHANGE_SEARCH_QUERY = "CHANGE_SEARCH_QUERY";

export const setAudios = audios => {
  return {
    type: SET_AUDIOS,
    audios: audios
  };
};

export const setLikedAudios = audios => {
  return {
    type: SET_LIKED_AUDIOS,
    audios: audios
  };
};

export const setCurrentAudio = audio => {
  return {
    type: SET_CURRENT_AUDIO,
    audio: audio
  };
};
