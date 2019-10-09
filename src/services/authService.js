import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "http://localhost:3000/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
