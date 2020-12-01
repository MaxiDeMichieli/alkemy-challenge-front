import axios from 'axios';

const api = (token) => {
  let config;
  const url = 'http://localhost:3001/api'
  if (token) {
    config = {
      baseURL: url,
      headers: {
          Authorization: `Bearer ${token}`
      },
    }
  } else {
    config = {
      baseURL: url
    }
  }

  return axios.create(config);
}

export default api