import http from "./httpService";

const apiEndpoint = "http://localhost:3000/comments";

export function getComments(audioId) {
  return http.get(apiEndpoint + `/${audioId}`);
}

export function deleteComment(id) {
  return http.delete(`${apiEndpoint}${id}`);
}

export function saveComment(comment) {
  console.log(comment);
  if (comment._id) {
    const body = { ...comment };
    console.log(body);
    delete body._id;
    return http.put(`http://localhost:3000/comments/${comment._id}`, body);
  }
  return http.post(`${apiEndpoint}`, comment);
}
