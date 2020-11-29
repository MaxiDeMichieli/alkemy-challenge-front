import { useState } from 'react';
import Header from '../components/Header/Header';
import { Grid, Container, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import homeImg from '../images/homeImage.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  div: {
    heigth: '500px',
  },
  img: {
    width: '100%'
  },
  toolbar: theme.mixins.toolbar
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen]  = useState(false);

  const actionOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <Header menu={false} />
      <div>
        <div className={classes.toolbar}></div>
        <Container>
        <Grid container spacing={3} className={classes.toolbar} >
          <Grid item xs={12} className={classes.div}>
            <Hidden xsDown>
              <Typography variant="h2" >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae eius delectus enim sed dignissimos tempore veniam dolor beatae officia quidem.
              </Typography>
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={8} lg={6} className={classes.div}>
            <img src={homeImg} alt="home-img" className={classes.img} />
          </Grid>
          <Grid item xs={6} className={classes.div}>
          </Grid>
        </Grid>
      </Container>
      </div>
    </div>
  );
}

export default Home;