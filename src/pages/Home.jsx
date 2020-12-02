import Header from '../components/Header';
import { Grid, Container, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import homeImg from '../images/homeImage.svg';
import { Link } from 'react-router-dom';

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

function Home() {
  const classes = useStyles();

  return (
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
                Controla tus ingresos y egresos de dinero!
              </Typography>
              <Box mt={3} className={classes.btnContainer} >
                <Link to="/alkemy-challenge-front/signup">
                  <Button variant="contained" color="secondary" >Comienza ahora!</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Home;