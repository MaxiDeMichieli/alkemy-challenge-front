import { useState, Fragment, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import qs from 'querystring';
import _ from 'lodash';

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
  }
}));

function ResetPassword() {
  const classes = useStyles();

  const { resetLink } = useParams();

  const [title, setTitle] = useState(<Fragment />)

  const [form, setForm] = useState(<Card className={classes.card}><ResetPasswordForm resetLink={resetLink} /></Card>)

  const [http] = useHttp();

  const debounce = _.debounce((callback) => callback(), 100);

  const sendData = () => {
    http.post('/users/reset-password/check-token', qs.stringify({ resetLink: resetLink }))
      .then(({ data }) => {
        if (data.error != null) {
          setTitle(<Typography variant="h3" align="center" color="secondary">
            El link para cambiar tu contraseña no es correcto o ya expiró
          </Typography>)
          setForm(undefined)
        } else {
          setTitle(<Typography variant="h3" align="center" color="secondary">
            Modifica tu contraseña
          </Typography>)
        }
      })
      .catch(err => {
        setTitle(<Typography variant="h3" align="center" color="secondary">
          El link para cambiar tu contraseña no es correcto o ya expiró
        </Typography>)
        setForm(undefined)
      })
  }

  useEffect(() => {
    debounce(sendData)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Container className={classes.container}>
          <Box mb={4}>
            {title}
          </Box>
          {form}
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;