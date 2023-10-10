import axios from 'axios';
import configData from '../config';

const instance = (token = '') => {
  return axios.create({
    baseURL: configData.API_SERVER,
    timeout: 1000,
    headers: {
      Authorization: token,
      // 'Content-Type': 'application/json'
    }
  });
};

export default instance;
