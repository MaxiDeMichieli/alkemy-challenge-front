import { useEffect, Fragment, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { Redirect } from 'react-router-dom';

function PrivateRoutes(props) {
  const [auth] = useAuthentication();

  useEffect(() => {
    let component = props.component;
    let redirect = <Redirect to="/dashboard" />

    auth
    .then(res => {
      if (res) {
        setResult(redirect)
      } else {
        setResult(component)
      }
    })
    .catch(err => setResult(component))
  }, [props.component]) // eslint-disable-line react-hooks/exhaustive-deps

  const [result, setResult] = useState()

  return (
    <Fragment>
      {result === undefined ? <Fragment /> : result}
    </Fragment>
  );
}

export default PrivateRoutes;