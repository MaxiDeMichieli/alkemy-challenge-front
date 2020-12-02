import Header from '../components/Header';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OperationsList from '../components/OperationsList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: 30,
    maxWidth: 800
  },
  width: {
    width: '100%'
  },
  grid: {
    width: '100%',
    maxWidth: 1100
  }
}));

function Operations(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header menu />
      <div className={classes.width} >
        <div className={classes.toolbar}></div>
        <Container className={classes.content}>
          <Grid container spacing={3} justify="center" alignItems="center" >
            <Grid item xs={12} >
              <OperationsList title={props.title} url={props.url} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Operations;