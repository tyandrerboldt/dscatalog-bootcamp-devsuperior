import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';
import qs from 'qs';
import axios, { Method } from 'axios';
import history from './history';

type RequestParams = {
  method?: Method;
  url: string;
  data?: object | string;
  params?: object;
  headers?: object;
}

type LoginData = {
  username: string;
  password: string;
}

//PARA ERRO DE CORS
//package.json -> 'proxy': 'http://localhost:8080'
//const BASE_URL  = 'http://localhost:3000';

const BASE_URL  = 'http://localhost:8080';

axios.interceptors.response.use(function (response) {  
  return response;
}, function (error) {
  if(error.response.status === 401){
    history.push('/admin/auth/login')
  }

  return Promise.reject(error);
})

export const makeRequest = ({ method = 'GET', url, data, params, headers }:RequestParams) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers
  })
};

export const makeLogin = (loginData: LoginData) => {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({...loginData, grant_type: 'password'})

  return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers })
}

export const makePrivateRequest = ({ method = 'GET', url, data, params }:RequestParams) => {
  const sessionData = getSessionData();

  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}`
  }

  return makeRequest({ method, url, data, params, headers });
}