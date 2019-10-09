import http from "./httpService";

const apiEndpoint = "http://localhost:3000/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(id) {
  return http.get(apiEndpoint + `/${id}`);
}

export function deleteUser(id) {
  return http.delete(`${apiEndpoint}${id}`);
}

export function saveUser(user) {
  console.log(user);
  if (user._id) {
    const body = { ...user };
    console.log(body);
    delete body._id;
    return http.put(`http://localhost:3000/users/${user._id}`, body);
  }
}
