import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));


const Signin = () => {
  const classes = useStyles();

  return (
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

export default Signin