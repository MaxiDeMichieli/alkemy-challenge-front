import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Redirect } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import qs from 'querystring';
import _ from 'lodash';


const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    margin: 0
  }
}));

function ResetPasswordForm(props) {
  const classes = useStyles();

  const { resetLink } = props

  const [redirect, setRedirect] = useState(<Fragment />)

  const [http] = useHttp();

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const sendData = (values, callback) => {
    values.resetLink = resetLink
    http.patch('/users/reset-password', qs.stringify(values))
      .then(({ data }) => {
        callback(false)
        if (data.error != null) {
          window.location.reload()
        } else {
          setRedirect(<Redirect to="/alkemy-challenge-front/signin" />)
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
          password: '',
          passwordRepeat: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Debes ingresar una contraseña';
          } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(values.password)) {
            errors.password = 'La contraseña debe tener: al menos 6 caracteres, una mayúscula, una minúscula y un número'
          }
      
          if (!values.passwordRepeat) {
            errors.passwordRepeat = 'Debes repetir tu contraseña';
          } else if (values.passwordRepeat !== values.password) {
            errors.passwordRepeat = 'Las contraseñas no coinciden'
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
                  type="password"
                  name="password"
                  label="Nueva contraseña*"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  type="password"
                  name="passwordRepeat"
                  label="Repite la contraseña*"
                  color="secondary"
                />
              </Grid>
              {isSubmitting && <LinearProgress />}
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
                    Confirmar contraseña
                </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default ResetPasswordForm;