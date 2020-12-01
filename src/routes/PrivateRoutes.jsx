import { useEffect, Fragment, useState } from 'react';
import isAuthenticated from '../auth/authentication';
import { Redirect } from 'react-router-dom';

function PrivateRoutes(props) {

  useEffect(() => {
    let component = props.component;
    let redirect = <Redirect to="/signin" />

    isAuthenticated()
    .then(res => {
      if (res) {
        setResult(component)
      } else {
        setResult(redirect)
      }
    })
    .catch(err => setResult(redirect))
  }, [props.component])

  const [result, setResult] = useState()

  return (
    <Fragment>
      {result === undefined ? <Fragment /> : result}
    </Fragment>
  );
}

export default PrivateRoutes;