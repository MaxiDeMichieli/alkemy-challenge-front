import { Fragment, useState, useEffect } from 'react';
import Header from '../components/Header';
import { Grid, Container, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import homeImg from '../images/homeImage.svg';
import { Link, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import qs from 'querystring';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  imgContainer: {
    minWidth: 310,
  },
  img: {
    width: '100%'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: 60
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

function ActivateAccount() {
  const classes = useStyles();
  const { token } = useParams();


  const [message, setMessage] = useState('')
  const [button, setButton] = useState();

  const [http] = useHttp();

  useEffect(() => {
    http.post('/users/email-activate', qs.stringify({token: token}))
      .then(({ data }) => {
        if (data.error != null) {
          setMessage('No pudimos activar tu cuenta, intenta registrate nuevamente')
          setButton(<Box mt={3} className={classes.btnContainer} >
            <Link to="/alkemy-challenge-front/signup">
              <Button variant="contained" color="secondary" >Registrate</Button>
            </Link>
          </Box>)
        } else {
          setMessage('Tu cuenta se verificó correctamente! Ya podes iniciar sesión')
          setButton(<Box mt={3} className={classes.btnContainer} >
            <Link to="/alkemy-challenge-front/signin">
              <Button variant="contained" color="secondary" >Inicia sesión!</Button>
            </Link>
          </Box>)
        }
      })
      .catch(err => {
        setMessage('No pudimos activar tu cuenta, intenta registrate nuevamente')
        setButton(<Box mt={3} className={classes.btnContainer} >
          <Link to="/alkemy-challenge-front/signup">
            <Button variant="contained" color="secondary" >Registrate</Button>
          </Link>
        </Box>)
      })
  }, [token, classes]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className={classes.root}>
        <Header menu={false} />
        <div>
          <div className={classes.toolbar}></div>
          <Container className={classes.content}>
            <Grid container spacing={3} className={classes.toolbar} alignItems="center" >
              <Grid item xs={8} sm={6} className={classes.imgContainer}>
                <img src={homeImg} alt="home-img" className={classes.img} />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.div} >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  color="textPrimary"
                >
                  {message}
                </Typography>
                {button}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}

export default ActivateAccount;