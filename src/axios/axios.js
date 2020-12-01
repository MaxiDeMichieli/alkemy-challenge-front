import axios from 'axios';
let localToken = localStorage.getItem('auth');

const api = (token) => {
  let config;
  const url = 'http://localhost:3001/api'
  if (token || localToken) {
    config = {
      baseURL: url,
      headers: {
          Authorization: `Bearer ${token || localToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
  } else {
    config = {
      baseURL: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }

  return axios.create(config);
}

export default api