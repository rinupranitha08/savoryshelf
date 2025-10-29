import api from './api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function setSession({ token, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('auth-changed'));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('auth-changed'));
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function signup(payload) {
  const res = await api.post('/auth/signup', payload);
  setSession(res.data);
  return res.data;
}

export async function login(payload) {
  const res = await api.post('/auth/login', payload);
  setSession(res.data);
  return res.data;
}

export function logout() {
  clearSession();
}
