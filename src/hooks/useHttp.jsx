import axios from 'axios';

export const useHttp = (token) => {
  let localToken = localStorage.getItem('auth');
  let config;
  const url = 'https://alkemy-challenge-api.herokuapp.com/api'
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

  return [axios.create(config)]
}