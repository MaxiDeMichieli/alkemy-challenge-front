import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    margin: 0
  }
}));

function OperationFormEdit() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <Formik
      initialValues={{
        concept: '',
        amount: '',
        date: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.concept) {
          errors.concept = 'Debes ingresar un concepto';
        }

        if (!values.amount) {
          errors.amount = 'Debes ingresar un monto';
        } else {
          let split = values.amount.split('');
          let result = true;
          split.forEach(e => {
            if (!/^[0-9]$/.test(e)) {
              result = false;
            }
          })
          if (!result) {
            errors.amount = 'El monto debe contener solo números'
          }
        }

        values.date = selectedDate;
        if (selectedDate === "Invalid Date") {
          errors.date = 'Fecha inválida';
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
                name="concept"
                label="Concepto*"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                className={classes.textField}
                component={TextField}
                name="amount"
                label="Monto*"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Field
                  component={KeyboardDatePicker}
                  className={classes.textField}
                  name="date"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha*"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
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
                  guardar operación
              </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default OperationFormEdit;