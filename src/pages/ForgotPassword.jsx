import React, { useState } from 'react';
import Header from '../components/Header';
import { Container, Card, Typography, Box, Grid, Button, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHttp } from '../hooks/useHttp';
import qs from 'querystring';
import _ from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  container: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 800
  },
  content: {
    width: '100%'
  },
  card: {
    width: '90%',
    maxWidth: 620,
    padding: 20
  },
  textField: {
    width: '100%'
  }
}));

function ResetPassword() {
  const classes = useStyles();

  const [http] = useHttp();

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const sendData = (values, callback) => {
    http.patch('/users/forgot-password', qs.stringify(values))
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{"Te hemos enviado un mail"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Sigue las instrucciones del mail para recuperar tu contraseña!
    </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        ok
      </Button>
    </DialogActions>
  </Dialog>

  return (
    <div className={classes.root}>
      {dialog}
      <Header />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Container className={classes.container}>
          <Box mb={4}>
            <Typography variant="h3" align="center" color="secondary">
              Escribe tu mail para recuperar la contraseña
            </Typography>
          </Box>
          <Card className={classes.card}>
            <Formik
              initialValues={{
                email: '',
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
                        label="Email*"
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
                          Enviar mail
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;