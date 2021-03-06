import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Redirect, useParams } from 'react-router-dom';
import qs from 'querystring';
import _ from 'lodash';
import { useHttp } from '../hooks/useHttp';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    margin: 0
  }
}));

function OperationFormEdit() {
  const classes = useStyles();

  const { id } = useParams();

  const debounce = _.debounce((a, b, callback) => callback(a, b), 100);

  const [http] = useHttp();

  const [redirect, setRedirect] = useState(<Fragment />)

  const [toEdit, setToEdit] = useState()

  http.get(`/operations/list/${id}`)
    .then(({ data }) => {
      if (data.error == null) {
        setToEdit(data.operation)
      } else {
        setRedirect(<Redirect to="/dashboard" />)
      }
    })

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const sendData = (values, callback) => {
    http.patch(`/operations/edit/${id}`, qs.stringify(values))
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



  return (
    <Fragment>
      {redirect}
      { toEdit && <Formik
        initialValues={{
          concept: toEdit.concept,
          amount: toEdit.amount.toString(),
          date: format(new Date(toEdit.date), 'yyyy MM d'),
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

          values.date = format(selectedDate, 'MM dd yyyy');
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
                  label="Nuevo concepto*"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  className={classes.textField}
                  component={TextField}
                  name="amount"
                  label="Nuevo monto*"
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
      </Formik>}
    </Fragment>
  );
}

export default OperationFormEdit;