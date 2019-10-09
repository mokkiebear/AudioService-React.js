import axios from "axios";
import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "http://localhost:3000/audios/";

let audios = [];
export function getAudios() {
  return http.get(apiEndpoint);
}

export function getPopularAudios() {
  return http.get(`${apiEndpoint}?category=popular`);
}

export function getRatingAudios() {
  return http.get(`${apiEndpoint}?category=rating`);
}

export function getLikedAudios() {
  const userId = auth.getCurrentUser()._id;
  return http.get(`${apiEndpoint}?category=liked&userId=${userId}`);
}

export async function getAudio(id) {
  const audio = await axios.get(`${apiEndpoint}${id}`);
  return audio.data;
}

export function saveAudio(audio) {
  if (audio._id) {
    const body = { ...audio };
    delete body._id;
    return http.put(`${apiEndpoint}${audio._id}`, body);
  }

  const fd = new FormData();

  fd.append("file", audio.file);
  fd.append("title", audio.title);
  fd.append("singers", audio.singers);
  console.log(audio.singers);
  // audioInDb.genre = genresAPI.genres.find(g => g._id === audio.genreId);

  return http.post(`${apiEndpoint}`, fd);
}

export async function updateAudio(audio) {
  console.log(audio);
  const body = { ...audio };
  delete body._id;
  const { data: result } = await axios.put(`${apiEndpoint}${audio._id}`, body);
  return result;
}

export function deleteAudio(id) {
  return http.delete(`${apiEndpoint}${id}`);
}

export default {
  getAudios,
  getPopularAudios,
  getRatingAudios,
  getLikedAudios,
  getAudio,
  saveAudio,
  updateAudio,
  deleteAudio
};
