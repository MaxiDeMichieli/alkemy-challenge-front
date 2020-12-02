import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress, MenuItem } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import { useHttp } from '../hooks/useHttp';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    margin: 0
  }
}));

function OperationForm() {
  const currencies = [
    {
      value: 1,
      label: 'Ingreso',
    },
    {
      value: 2,
      label: 'Egreso',
    }
  ];
  const classes = useStyles();

  const [redirect, setRedirect] = useState(<Fragment />)

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [http] = useHttp();

  const sendData = (values, callback) => {
    http.post('/operations/create', qs.stringify(values))
      .then(({ data }) => {
        callback(false)
        if (data.error != null) {
          window.location.reload()
        } else {
          setRedirect(<Redirect to="/dashboard" />)
        }
      })
      .catch(err => {
        callback(false)
        window.location.reload()
      })
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [currency, setCurrency] = React.useState(1);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <Fragment>
      {redirect}
      <Formik
        initialValues={{
          concept: '',
          amount: '',
          date: '',
          type: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.concept) {
            errors.concept = 'Debes ingresar un concepto';
          } else if (values.concept.length > 100) {
            errors.concept = 'El concepto tiene un máximo de 100 caracteres'
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
            if (split.length > 11) {
              errors.amount = 'No soportamos un monton tan grande'
            }
          }

          values.type = currency;
          if (values.type === undefined) {
            errors.type = 'Debes seleccionar un tipo de operación';
          }

          values.date = format(selectedDate, 'yyyy MM d');
          if (values.date === "Invalid Date") {
            errors.date = 'Fecha inválida';
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
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  label="Tipo de operación*"
                  name="type"
                  color="secondary"
                  select
                  value={currency}
                  onChange={handleChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
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
    </Fragment>
  );
}

export default OperationForm;