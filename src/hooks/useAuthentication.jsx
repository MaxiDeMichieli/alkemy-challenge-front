import { useHttp } from './useHttp';

export const useAuthentication = () => {
  let localToken = localStorage.getItem('auth');
  let sessionToken = sessionStorage.getItem('auth');
  let [http] = useHttp(localToken);
  return new Promise((resolve, reject) => {
    //localStorage.setItem('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImZpcnN0X25hbWUiOiJNYXhpbW8iLCJsYXN0X25hbWUiOiJEZSBNaWNoaWVsaSIsImVtYWlsIjoibWF4aWRlbWljaGllbGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkS2luVVVJUmt4UEpJMlRkL1ZEeWtoLi9mLnJiTERUaW5CcHFOT3IxUEFsSjRDaTdPUXhRQVciLCJzb2NpYWxfaWQiOm51bGwsImlhdCI6MTYwNjQzNDg2MSwiZXhwIjoxNjA3NjQ0NDYxfQ.8VEhCfnIrB_6y_5umfMmmmTbe0lFetAI1J5I-HNI6OA')
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
  })
}