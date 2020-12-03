import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHttp } from '../../hooks/useHttp';
import qs from 'querystring';
import _ from 'lodash' ;

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [http] = useHttp();

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const sendData = (values, callback) => {
    http.post('/users/signup', qs.stringify(values))
      .then(({ data }) => {
        callback(false)
        if (data.error != null) {
          window.location.reload()
        } else {
          handleClickOpen()
        }
      })
      .catch(err => {
        callback(false)
        window.location.reload()
      })
  }

  const dialog = <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{"Bienvenidx! Te hemos enviado un mail para verificar tu cuenta"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Sigue las instrucciones del mail para activar tu cuenta, te esperamos!
    </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        ok
      </Button>
    </DialogActions>
  </Dialog>

  return (
    <Fragment>
      {dialog}
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordRepeat: '',
          first_name: '',
          last_name: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Debes ingresar un email';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Ingresa un email válido';
          }

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

          if (!values.first_name) {
            errors.first_name = 'Debes ingresar un nombre';
          }

          if (!values.last_name) {
            errors.last_name = 'Debes ingresar un apellido';
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
                  name="first_name"
                  label="Nombre*"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  name="last_name"
                  label="Apellido*"
                  color="secondary"
                />
              </Grid>
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
                  name="password"
                  type="password"
                  label="Contraseña*"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  type="password"
                  label="Repite tu contraseña*"
                  name="passwordRepeat"
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
                    registrarme
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

export default Signup