import { Redirect } from 'react-router-dom';

function Logout() {
  localStorage.clear();
  sessionStorage.clear();

  return (
    <Redirect to="/alkemy-challenge-front/" />
  )
}

export default Logout;