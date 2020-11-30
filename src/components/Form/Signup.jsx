import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));

const Signup = () => {
  const classes = useStyles();

  return (
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
          errors.email = 'Invalid email address';
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
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 5000);
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
                  iniciar sesión
              </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default Signup