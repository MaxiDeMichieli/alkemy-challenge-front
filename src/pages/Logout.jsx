import { Redirect } from 'react-router-dom';

function Logout() {
  localStorage.clear();
  sessionStorage.clear();

  return (
    <Redirect to="/" />
  )
}

export default Logout;