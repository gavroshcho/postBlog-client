import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, CURRENT_USER, FETCH_POSTS, FETCH_POST } from 'actions/types';

const ROOT = 'http://localhost:3001/api/v1'

const parseError = (error) => {
    const backendError = error.response.data.errors;
    const property = Object.getOwnPropertyNames(backendError);

    return `${property[0]} ${backendError[property[0]]}`;
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT}/users`, { user: formProps });

    callback();
  } catch(error) {
    dispatch({ type: AUTH_ERROR, payload: parseError(error) });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT}/authentication`, { authentication: formProps });

    dispatch({ type: AUTH_USER, payload: response.data.access_token });

    localStorage.setItem("access_token", response.data.access_token);
    callback();
  } catch(error) {
    dispatch({ type: AUTH_ERROR, payload: parseError(error) });
  }
};

export const signout = () => {
  localStorage.removeItem("access_token");

  return {
    type: AUTH_USER,
    payload: ''
  }
};

export const fetchPosts = () => async dispatch => {
  try {
    const instance = axios.create({
      baseURL: ROOT,
      timeout: 2000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("access_token")}`}
    });

    const response = await instance.get('/posts');
    dispatch({ type: FETCH_POSTS, payload: response });
  } catch(error) {
    console.log(`There was an error: ${error}`);
  }
};

export const fetchPost = (id) => async dispatch => {
  try {
    const instance = axios.create({
      baseURL: ROOT,
      timeout: 2000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("access_token")}`}
    });

    const response = await instance.get(`/posts/${id}`);
    
    dispatch({ type: FETCH_POST, payload: response });
  } catch(error) {
    console.log(`There was an error: ${error}`);
  }
};

export const createPost = (formProps, callback) => async dispatch => {
  try {
    const instance = axios.create({
      baseURL: ROOT,
      timeout: 2000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("access_token")}`}
    });

    const response = await instance.post('/posts', { post: formProps });
    dispatch({ type: '', payload: response.data });
    callback();
  } catch(error) {
    console.log(`There was an error: ${error}`);
  }
};