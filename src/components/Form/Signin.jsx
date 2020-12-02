import { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Redirect, Link } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';
import qs from 'querystring';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));


const Signin = () => {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(<Fragment />)

  const [http] = useHttp();

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const sendData = (values, callback) => {
    http.post('/users/login', qs.stringify(values))
      .then(({ data }) => {
        callback(false)
        if (data.error != null) {
          window.location.reload()
        } else {
          localStorage.setItem('auth', data.token)
          setRedirect(<Redirect to="/alkemy-challenge-front/dashboard" />)
        }
      })
      .catch(err => {
        callback(false)
        window.location.reload()
      })
  }

  return (
    <Fragment>
      {redirect}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Debes ingresar un email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Ingresa un email válido';
          }

          if (!values.password) {
            errors.password = 'Debes ingresar una contraseña';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          debounce(values, setSubmitting, sendData)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email*"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  type="password"
                  label="Contraseña*"
                  name="password"
                  color="secondary"
                />
              </Grid>
              {isSubmitting && <LinearProgress />}
              <Link to="/forgotpassword">
                <Typography variant="caption">
                  Olvidaste tu contraseña?
                </Typography>
              </Link>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    iniciar sesión
                </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default Signin