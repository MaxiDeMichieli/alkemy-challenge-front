import { useHttp } from './useHttp';

export const useAuthentication = () => {
  let localToken = localStorage.getItem('auth');
  let sessionToken = sessionStorage.getItem('auth');
  let [http] = useHttp(localToken);

  return [new Promise((resolve, reject) => {
    if (localToken && !sessionToken) {
      http.post('/users/check-token')
        .then(({ data }) => {
          if (data.error == null) {
            sessionStorage.setItem('auth', data.token)
            resolve(true)
          } else {
            localStorage.removeItem('auth');
            resolve(false)
          }
        })
        .catch(err => reject(false))
    } else if (!localToken) {
      resolve(false)
    } else {
      resolve(true)
    }
  })]
}