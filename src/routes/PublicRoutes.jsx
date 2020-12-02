import { useEffect, Fragment, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { Redirect } from 'react-router-dom';

function PrivateRoutes(props) {

  useEffect(() => {
    let component = props.component;
    let redirect = <Redirect to="/dashboard" />

    useAuthentication()
    .then(res => {
      if (res) {
        setResult(redirect)
      } else {
        setResult(component)
      }
    })
    .catch(err => setResult(component))
  }, [props.component])

  const [result, setResult] = useState()

  return (
    <Fragment>
      {result === undefined ? <Fragment /> : result}
    </Fragment>
  );
}

export default PrivateRoutes;