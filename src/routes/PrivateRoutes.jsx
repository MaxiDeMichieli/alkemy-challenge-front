import { useEffect, Fragment, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { Redirect } from 'react-router-dom';

function PrivateRoutes(props) {
  const [auth] = useAuthentication();
  
  useEffect(() => {
    let component = props.component;
    let redirect = <Redirect to="/signin" />

    auth
    .then(res => {
      if (res) {
        setResult(component)
      } else {
        setResult(redirect)
      }
    })
    .catch(err => setResult(redirect))
  }, [props.component]) // eslint-disable-line react-hooks/exhaustive-deps

  const [result, setResult] = useState()

  return (
    <Fragment>
      {result === undefined ? <Fragment /> : result}
    </Fragment>
  );
}

export default PrivateRoutes;