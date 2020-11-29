import Header from '../components/Header/Header';
import { Grid, Container, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import homeImg from '../images/homeImage.svg';

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
      <Header menu={true} />
      <div>
        <div className={classes.toolbar}></div>
        <Container className={classes.content}>
          <Grid container spacing={3} className={classes.toolbar} justify="center" alignItems="center" >
            <Grid item xs={8} sm={6} className={classes.imgContainer}>
              <img src={homeImg} alt="home-img" className={classes.img} />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.div} justify="center" >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                color="textPrimary"
              >
                Controla tus ingresos y egresos de dinero!
              </Typography>
              <Box mt={3} className={classes.btnContainer} >
                <Button variant="contained" color="secondary" >Comienza ahora!</Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Home;